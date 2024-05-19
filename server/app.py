from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
from data_generation import generate_sample



from prophet import Prophet
import matplotlib
matplotlib.use('Agg')  # Set the backend to Agg
import matplotlib.pyplot as plt
import time
from io import BytesIO
import base64


import requests
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.optimizers import Adam
import numpy as np


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Global variable to store the dataset
uploaded_dataset = None

@app.route('/upload1', methods=['POST'])
def upload_dataset():
    global uploaded_dataset
    file = request.files['file']
    uploaded_dataset = pd.read_csv(file)

    # Return feature names to the client
    feature_names = uploaded_dataset.columns.tolist()
    return jsonify({'feature_names': feature_names})

@app.route('/generate1', methods=['POST'])
def generate_dataset():
    data = request.json
    categorical_features = data['categorical_features']
    num_samples = int(data['num_samples'])

    # Generate sampled dataset
    sampled_data = generate_sample(uploaded_dataset, categorical_features, num_samples)

    # Convert sampled data to CSV format in memory
    csv_data = sampled_data.to_csv(index=False)

    # Return the CSV data to the client
    return jsonify({'csv_data': csv_data})


# -----------------------------------------------------------------------------------------


@app.route('/upload2', methods=['POST'])
def upload_file():
    # Get the uploaded file
    file = request.files['file']
    
    # Save the file temporarily
    file_path = "/tmp/uploaded_file.csv"
    file.save(file_path)
    
    # Load the dataset
    df = pd.read_csv(file_path)
    
    # Convert Order Date to datetime format
    df['Order Date'] = pd.to_datetime(df['Order Date'])

    # Group by Product, Country, and Date and sum Units Sold
    df = df.groupby(['Item Type', 'Country', 'Order Date'])['Units Sold'].sum().reset_index()

    # Rename columns as per Prophet's requirements
    df = df.rename(columns={'Order Date': 'ds', 'Units Sold': 'y'})

    # Get unique product and country options
    product_options = df['Item Type'].unique().tolist()
    country_options = df['Country'].unique().tolist()
    
    return jsonify({
        'product_options': product_options,
        'country_options': country_options
    })


@app.route('/forecast2', methods=['POST'])
def forecast():
    data = request.json
    
    product = data['product']
    country = data['country']
    days_to_forecast = data['days_to_forecast']
    
    # Load the dataset
    df = pd.read_csv("/tmp/uploaded_file.csv")
    
    # Subset the dataframe for the selected product and country
    subset_df = df[(df['Item Type'] == product) & (df['Country'] == country)]
    
    # Ensure columns "ds" and "y" are present
    subset_df = subset_df.rename(columns={'Order Date': 'ds', 'Units Sold': 'y'})

    # Initialize Prophet model
    model = Prophet()

    try:
        # Fit the model
        model.fit(subset_df)

        # Make future dataframe for forecasting
        future = model.make_future_dataframe(periods=int(days_to_forecast))

        # Forecast the future
        forecast = model.predict(future)

        # Prepare data for Chart.js
        forecast_data = {
            'labels': forecast['ds'].dt.strftime('%Y-%m-%d').tolist(),
            'datasets': [
                {
                    'label': 'Forecast',
                    'data': forecast['yhat'].tolist(),
                    'backgroundColor': 'rgba(75, 192, 192, 0.2)',
                    'borderColor': 'rgba(75, 192, 192, 1)',
                    'borderWidth': 1
                },
                {
                    'label': 'Actual',
                    'data': subset_df['y'].tolist(),
                    'backgroundColor': 'rgba(255, 99, 132, 0.2)',
                    'borderColor': 'rgba(255, 99, 132, 1)',
                    'borderWidth': 1
                }
            ]
        }

        # Plot components
        fig2 = model.plot_components(forecast)
        img_buf = BytesIO()
        fig2.savefig(img_buf, format='png')
        img_buf.seek(0)
        img_bytes = base64.b64encode(img_buf.getvalue()).decode('utf-8')

        return jsonify({
            'forecast_data': forecast_data,
            'components_plot': img_bytes
        })
    except Exception as e:
        return jsonify({'error': str(e)})

    



    # ------------------------------------------------------------------


#     # Function to fetch financial data for a given company symbol
# def fetch_financial_data(company_symbol):
#     api_key = 'rZObIQmyDKDzuSXPpZR8YDiiMtedlcw0'  # Replace 'your_api_key_here' with your API key from Financial Modeling Prep
#     base_url = f'https://financialmodelingprep.com/api/v3/financials/income-statement/{company_symbol}?apikey={api_key}'

#     # Fetching data
#     response = requests.get(base_url)
#     data = response.json()

#     if 'financials' in data:
#         return data['financials']
#     else:
#         print("No data available for this company.")
#         return None

# # Function to create a table of selected financial features
# def create_table(data, selected_features):
#     if data:
#         df = pd.DataFrame(data)
#         # Convert dates to datetime objects
#         df['date'] = pd.to_datetime(df['date'])

#         # Filter dataframe to include only selected features
#         df_selected = df[['date'] + selected_features]
        
#         # Handle missing values
#         df_selected.replace('', np.nan, inplace=True)
#         df_selected.dropna(inplace=True)
        
#         return df_selected
#     else:
#         return None

# # Main function
# def main(company_symbol, selected_features, num_years):
#     # Convert num_years to integer
#     num_years = int(num_years)

#     financial_data = fetch_financial_data(company_symbol)

#     if financial_data:
#         # Create table of selected features
#         table = create_table(financial_data, selected_features)

#         if table is not None:
#             # Reverse the order of the data
#             table = table[::-1]
            
#             # Prepare data for prediction
#             scaler = MinMaxScaler()
#             scaled_data = scaler.fit_transform(table[selected_features])
            
#             # Split data into input and output sequences
#             def create_sequences(data, seq_length):
#                 X, y = [], []
#                 for i in range(len(data) - seq_length):
#                     X.append(data[i:i+seq_length])
#                     y.append(data[i+seq_length])
#                 return np.array(X), np.array(y)

#             seq_length = 24  # Sequence length (adjust as needed)
#             X, y = create_sequences(scaled_data, seq_length)
            
#             # Split data into train and test sets
#             train_size = int(len(X) * 0.8)
#             X_train, X_test = X[:train_size], X[train_size:]
#             y_train, y_test = y[:train_size], y[train_size:]
            
#             # Build LSTM model
#             model = Sequential([
#                 LSTM(units=50, activation='relu', return_sequences=True, input_shape=(seq_length, len(selected_features))),
#                 LSTM(units=50, activation='relu', return_sequences=False),
#                 Dense(len(selected_features))
#             ])
            
#             # Compile model
#             optimizer = Adam(learning_rate=0.01)
#             model.compile(optimizer=optimizer, loss='mean_squared_error')
            
#             # Train model
#             model.fit(X_train, y_train, epochs=200, batch_size=32, verbose=1)
            
#             # Make predictions for the specified number of years
#             num_years = int(num_years)
#             future_predictions = []

#             current_sequence = X[-1].reshape((1, seq_length, len(selected_features)))
#             for i in range(num_years):
#                 prediction = model.predict(current_sequence)[0]
#                 future_predictions.append(prediction)
#                 # Update current sequence with the predicted values for the next year
#                 current_sequence = np.append(current_sequence[:,1:,:], [[prediction]], axis=1)

#             # Inverse transform predictions to get actual values
#             future_predictions = scaler.inverse_transform(future_predictions)

#             # Get the last date in the dataset
#             last_date = table['date'].iloc[-1]

#             # Generate date range for the next years starting from the last date in the dataset
#             future_dates = pd.date_range(start=last_date, periods=num_years+1, freq='Y')[1:]
            
#             # Convert predictions to DataFrame
#             future_df = pd.DataFrame(future_predictions, columns=selected_features, index=future_dates)

#             # Convert DataFrame to list of dictionaries including dates
#             future_df.index = future_df.index.strftime('%Y-%m-%d')
#             future_data = future_df.reset_index().rename(columns={'index': 'date'}).to_dict(orient='records')

#             return future_data
#         else:
#             print("No data available.")
#             return {"error": "No data available."}
#     else:
#         print("No data available.")
#         return {"error": "No data available."}



# @app.route('/financial-data/<company_symbol>', methods=['GET'])
# def get_financial_data(company_symbol):
#     return jsonify({"financial_data": fetch_financial_data(company_symbol)})

# @app.route('/forecast3', methods=['POST'])
# def forecast3():
#     data = request.json
#     company_symbol = data['company_symbol']
#     selected_features = data['selected_features']
#     num_years = data['num_years']

#     forecast_data = main(company_symbol, selected_features, num_years)

#     return jsonify(forecast_data)




# Function to fetch financial data for a given company symbol
def fetch_financial_data(company_symbol):
    api_key = 'rZObIQmyDKDzuSXPpZR8YDiiMtedlcw0'  # Replace 'your_api_key_here' with your API key from Financial Modeling Prep
    base_url = f'https://financialmodelingprep.com/api/v3/financials/income-statement/{company_symbol}?apikey={api_key}'

    # Fetching data
    response = requests.get(base_url)
    data = response.json()

    if 'financials' in data:
        return data['financials']
    else:
        print("No data available for this company.")
        return None

# Function to create a table of selected financial features
def create_table(data, selected_features):
    if data:
        df = pd.DataFrame(data)
        # Convert dates to datetime objects
        df['date'] = pd.to_datetime(df['date'])

        # Filter dataframe to include only selected features
        df_selected = df[['date'] + selected_features].copy()
        
        # Handle missing values
        df_selected.replace('', np.nan, inplace=True)
        df_selected.dropna(inplace=True)
        
        return df_selected
    else:
        print("No data available.")
        return None

# Main function
def main(company_symbol, selected_features, num_years):
    # Convert num_years to integer
    num_years = int(num_years)

    # Define sequence length
    seq_length = 1  # Sequence length (adjust as needed)

    financial_data = fetch_financial_data(company_symbol)

    if financial_data:
        # Create table of selected features
        table = create_table(financial_data, selected_features)

        if table is not None:
            # Reverse the order of the data
            table = table[::-1]
            
            # Check if there is enough data for creating sequences
            if len(table) >= seq_length:
                # Prepare data for prediction
                scaler = MinMaxScaler()
                scaled_data = scaler.fit_transform(table[selected_features])
                
                # Split data into input and output sequences
                def create_sequences(data, seq_length):
                    X, y = [], []
                    for i in range(len(data) - seq_length):
                        X.append(data[i:i+seq_length])
                        y.append(data[i+seq_length])
                    return np.array(X), np.array(y)

                X, y = create_sequences(scaled_data, seq_length)
                
                print("Shape of X:", X.shape)
                print("Shape of y:", y.shape)
                print("X:", X)
                print("y:", y)
                
                # Reshape input data to have three dimensions
                X = X.reshape((-1, seq_length, len(selected_features)))

                # Build LSTM model
                model = Sequential([
                    LSTM(64, activation='relu', input_shape=(seq_length, len(selected_features)), return_sequences=True),
                    LSTM(32, activation='relu', return_sequences=True),
                    LSTM(16, activation='relu'),
                    Dense(len(selected_features))
                ])
                
                # Compile model
                model.compile(optimizer='adam', loss='mean_squared_error')
                
                # Train model
                model.fit(X, y, epochs=150, batch_size=1, verbose=1)
                
                # Make predictions for the specified number of years
                future_predictions = []

                current_sequence = X[-1]
                for i in range(num_years):
                    prediction = model.predict(current_sequence.reshape((1, seq_length, len(selected_features))))[0]
                    future_predictions.append(prediction)
                    # Update current sequence with the predicted values for the next year
                    current_sequence = np.append(current_sequence[1:], prediction).reshape((1, seq_length, len(selected_features)))

                # Inverse transform predictions to get actual values
                future_predictions = scaler.inverse_transform(future_predictions)

                # Get the last date in the dataset
                last_date = table['date'].iloc[-1]

                # Generate date range for the next years starting from the last date in the dataset
                future_dates = pd.date_range(start=last_date, periods=num_years+1, freq='Y')[1:]
                
                # Convert predictions to DataFrame
                future_df = pd.DataFrame(future_predictions, columns=selected_features, index=future_dates)

                # Convert DataFrame to list of dictionaries including dates
                future_df.index = future_df.index.strftime('%Y-%m-%d')
                future_data = future_df.reset_index().rename(columns={'index': 'date'}).to_dict(orient='records')

                return future_data
            else:
                print("Insufficient data available to create sequences.")
                return {"error": "Insufficient data available to create sequences."}
        else:
            print("No data available.")
            return {"error": "No data available."}
    else:
        print("No data available.")
        return {"error": "No data available."}




    
# Route for fetching financial data for a specific company symbol
@app.route('/financial-data/<company_symbol>', methods=['GET'])
def get_financial_data(company_symbol):
    financial_data = fetch_financial_data(company_symbol)
    if financial_data:
        return jsonify({"financial_data": financial_data})
    else:
        return jsonify({"error": "No data available for this company."})


# Route for forecasting
@app.route('/forecast3', methods=['POST'])
def forecast3():
    data = request.json
    company_symbol = data['company_symbol']
    selected_features = data['selected_features']  # Features selected by the user
    num_years = data['num_years']

    forecast_data = main(company_symbol, selected_features, num_years)

    return jsonify(forecast_data)



if __name__ == '__main__':
    app.run(debug=True)
