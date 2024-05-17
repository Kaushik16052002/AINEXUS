// import React, { useState } from 'react';
// import axios from 'axios';
// import Plot from 'react-plotly.js';

// function DemandForecasting() {
//   const [file, setFile] = useState(null);
//   const [productOptions, setProductOptions] = useState([]);
//   const [countryOptions, setCountryOptions] = useState([]);
//   const [product, setProduct] = useState('');
//   const [country, setCountry] = useState('');
//   const [daysToForecast, setDaysToForecast] = useState('');
//   const [processing, setProcessing] = useState(false);
//   const [forecastPlot, setForecastPlot] = useState(null);
//   const [componentsPlot, setComponentsPlot] = useState(null);
//   const [error, setError] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     setProcessing(true);
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/upload2', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setProductOptions(response.data.product_options);
//       setCountryOptions(response.data.country_options);
//     } catch (error) {
//       setError('Error uploading file');
//       console.error('Error uploading file: ', error);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleForecast = async () => {
//     setProcessing(true);
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/forecast2', {
//         product,
//         country,
//         days_to_forecast: daysToForecast
//       });

//       const forecastData = response.data.forecast_data;
//       const componentsPlot = response.data.components_plot;

//       const forecastPlot = {
//         data: [
//           {
//             x: forecastData.labels,
//             y: forecastData.datasets[0].data,
//             type: 'scatter',
//             mode: 'lines',
//             name: forecastData.datasets[0].label,
//             fill: 'tonexty',
//             fillcolor: forecastData.datasets[0].backgroundColor,
//             line: {
//               color: forecastData.datasets[0].borderColor,
//             },
//           },
//           {
//             x: forecastData.labels,
//             y: forecastData.datasets[1].data,
//             type: 'scatter',
//             mode: 'lines',
//             name: forecastData.datasets[1].label,
//             fill: 'tonexty',
//             fillcolor: forecastData.datasets[1].backgroundColor,
//             line: {
//               color: forecastData.datasets[1].borderColor,
//             },
//           },
//         ],
//         layout: {
//           title: 'Forecast Plot',
//           xaxis: { title: 'Date' },
//           yaxis: { title: 'Value' },
//         },
//       };

//       setForecastPlot(forecastPlot);
//       setComponentsPlot(componentsPlot);
//     } catch (error) {
//       setError('Error fetching forecast');
//       console.error('Error fetching forecast: ', error);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Demand Forecasting App</h1>
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>

//       <div>
//         <label>Product:</label>
//         <select value={product} onChange={(e) => setProduct(e.target.value)}>
//           <option value="">Select Product</option>
//           {productOptions.map((option, index) => (
//             <option key={index} value={option}>{option}</option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label>Country:</label>
//         <select value={country} onChange={(e) => setCountry(e.target.value)}>
//           <option value="">Select Country</option>
//           {countryOptions.map((option, index) => (
//             <option key={index} value={option}>{option}</option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label>Days to Forecast:</label>
//         <input type="number" value={daysToForecast} onChange={(e) => setDaysToForecast(e.target.value)} />
//       </div>

//       <button onClick={handleForecast}>Submit Forecast</button>

//       {processing && <p>Processing...</p>}

//       {forecastPlot && <Plot data={forecastPlot.data} layout={forecastPlot.layout} />}
      
//       {componentsPlot && (
//         <div>
//           <img src={`data:image/png;base64,${componentsPlot}`} alt="Forecast Components" />
//         </div>
//       )}
      
//       {error && <p>{error}</p>}
//     </div>
//     </div>
//   );
// }

// export default DemandForecasting;












import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './DemandForecasting.css'; // Import CSS file

function DemandForecasting() {
  const [file, setFile] = useState(null);
  const [productOptions, setProductOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [product, setProduct] = useState('');
  const [country, setCountry] = useState('');
  const [daysToForecast, setDaysToForecast] = useState('');
  const [processing, setProcessing] = useState(false);
  const [forecastPlot, setForecastPlot] = useState(null);
  const [componentsPlot, setComponentsPlot] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setProcessing(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload2', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProductOptions(response.data.product_options);
      setCountryOptions(response.data.country_options);
    } catch (error) {
      setError('Error uploading file');
      console.error('Error uploading file: ', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleForecast = async () => {
    setProcessing(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/forecast2', {
        product,
        country,
        days_to_forecast: daysToForecast
      });

      const forecastData = response.data.forecast_data;
      const componentsPlot = response.data.components_plot;

      const forecastPlot = {
        data: [
          {
            x: forecastData.labels,
            y: forecastData.datasets[0].data,
            type: 'scatter',
            mode: 'lines',
            name: forecastData.datasets[0].label,
            fill: 'tonexty',
            fillcolor: forecastData.datasets[0].backgroundColor,
            line: {
              color: forecastData.datasets[0].borderColor,
            },
          },
          {
            x: forecastData.labels,
            y: forecastData.datasets[1].data,
            type: 'scatter',
            mode: 'lines',
            name: forecastData.datasets[1].label,
            fill: 'tonexty',
            fillcolor: forecastData.datasets[1].backgroundColor,
            line: {
              color: forecastData.datasets[1].borderColor,
            },
          },
        ],
        layout: {
          title: 'Forecast Plot',
          xaxis: { title: 'Date' },
          yaxis: { title: 'Value' },
        },
      };

      setForecastPlot(forecastPlot);
      setComponentsPlot(componentsPlot);
    } catch (error) {
      setError('Error fetching forecast');
      console.error('Error fetching forecast: ', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="forecasting-container"> {/* Add a container class */}
      <h1>Demand Forecasting</h1>
      <div className="upload-section"> {/* Add a section class */}
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div className="form-section"> {/* Add a section class */}
        <div className="form-group"> {/* Add a group class */}
          <label>Product:</label>
          <select value={product} onChange={(e) => setProduct(e.target.value)}>
            <option value="">Select Product</option>
            {productOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group"> {/* Add a group class */}
          <label>Country:</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">Select Country</option>
            {countryOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group"> {/* Add a group class */}
          <label>Days to Forecast:</label>
          <input type="number" value={daysToForecast} onChange={(e) => setDaysToForecast(e.target.value)} />
        </div>

        <button onClick={handleForecast}>Submit Forecast</button>

        {processing && <p>Processing...</p>}
      </div>

      {forecastPlot && (
        <div className="plot-container"> {/* Add a container class */}
          <h2>Forecast Plot</h2>
          <Plot data={forecastPlot.data} layout={forecastPlot.layout} />
        </div>
      )}

      {componentsPlot && (
        <div className="plot-container"> {/* Add a container class */}
          <h2>Forecast Components</h2>
          <img src={`data:image/png;base64,${componentsPlot}`} alt="Forecast Components" />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default DemandForecasting;

