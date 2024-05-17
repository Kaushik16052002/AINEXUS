// import React, { useState } from 'react';
// import axios from 'axios';
// import { useTable } from 'react-table';
// import { saveAs } from 'file-saver';
// import Papa from 'papaparse';

// function FinancialForecasting() {
//   const [companySymbol, setCompanySymbol] = useState('');
//   const [selectedFeatures, setSelectedFeatures] = useState([]);
//   const [financialData, setFinancialData] = useState([]);
//   const [forecastData, setForecastData] = useState([]);
//   const [numYears, setNumYears] = useState('');
//   const [loadingForecast, setLoadingForecast] = useState(false);

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Date',
//         accessor: 'date',
//       },
//       ...selectedFeatures.map((feature) => ({
//         Header: feature,
//         accessor: feature,
//       })),
//     ],
//     [selectedFeatures]
//   );

//   const data = React.useMemo(() => financialData, [financialData]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`/financial-data/${companySymbol}`);
//       setFinancialData(response.data.financial_data);
//     } catch (error) {
//       console.error('Error fetching financial data:', error);
//     }
//   };

//   const handleForecast = async () => {
//     setLoadingForecast(true);
//     try {
//       const response = await axios.post(`/forecast3`, {
//         company_symbol: companySymbol,
//         selected_features: selectedFeatures,
//         num_years: numYears,
//       });
//       setForecastData(response.data);
//     } catch (error) {
//       console.error('Error fetching forecast data:', error);
//     }
//     setLoadingForecast(false);
//   };

//   const downloadData = (data, filename) => {
//     const csvData = Papa.unparse(data);
//     const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
//     saveAs(blob, filename);
//   };

//   return (
//     <div>
//       <h1>Financial Forecasting App</h1>
//       <div>
//         <label htmlFor="companySymbol">Select Company Symbol:</label>
//         <select id="companySymbol" value={companySymbol} onChange={(e) => setCompanySymbol(e.target.value)}>
//           <option value="">Select...</option>
//           <option value="AAPL">AAPL</option>
//           <option value="MSFT">MSFT</option>
//           <option value="GOOGL">GOOGL</option>
//           <option value="AMZN">AMZN</option>
//           <option value="TSLA">TSLA</option>
//         </select>
//         <button onClick={fetchData}>Fetch Financial Features</button>
//       </div>
//       <div>
//         <h2>Select Financial Features:</h2>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
//           {financialData.length > 0 &&
//             Object.keys(financialData[0]).map((key) => (
//               <div key={key}>
//                 <input
//                   type="checkbox"
//                   id={key}
//                   value={key}
//                   checked={selectedFeatures.includes(key)}
//                   onChange={(e) => {
//                     const isChecked = e.target.checked;
//                     setSelectedFeatures((prevSelected) =>
//                       isChecked ? [...prevSelected, key] : prevSelected.filter((item) => item !== key)
//                     );
//                   }}
//                 />
//                 <label htmlFor={key}>{key}</label>
//               </div>
//             ))}
//         </div>
//         {selectedFeatures.length > 0 && (
//           <div>
//             <button onClick={fetchData}>Fetch Financial Data</button>
//           </div>
//         )}
//       </div>
//       <div>
//         <h2>Financial Data</h2>
//         {financialData.length > 0 && (
//           <>
//             <button onClick={() => downloadData(financialData, 'financial_data.csv')}>Download Financial Data</button>
//             <Table columns={columns} data={data} />
//           </>
//         )}
//       </div>
//       <div>
//         <h2>Forecast Data</h2>
//         <div>
//           <label htmlFor="numYears">Number of Years to Forecast:</label>
//           <input
//             type="number"
//             id="numYears"
//             value={numYears}
//             onChange={(e) => setNumYears(e.target.value)}
//           />
//           <button onClick={handleForecast} disabled={loadingForecast}>
//             {loadingForecast ? 'Processing...' : 'Forecast'}
//           </button>
//         </div>
//         {forecastData.length > 0 && (
//           <>
//             <button onClick={() => downloadData(forecastData, 'forecast_data.csv')}>Download Forecast Data</button>
//             <Table columns={columns} data={forecastData} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// function Table({ columns, data }) {
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
//     columns,
//     data,
//   });

//   return (
//     <table {...getTableProps()} style={{ border: '1px solid black', borderCollapse: 'collapse', fontSize: '0.8em' }}>
//       <thead>
//         {headerGroups.map(headerGroup => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map(column => (
//               <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '8px' }}>{column.render('Header')}</th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map(row => {
//           prepareRow(row);
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map(cell => {
//                 return <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '8px' }}>{cell.render('Cell')}</td>
//               })}
//             </tr>
//           )
//         })}
//       </tbody>
//     </table>
//   );
// }

// export default FinancialForecasting;









import React, { useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import './FinancialForecasting.css'; // Import CSS file

function FinancialForecasting() {
  const [companySymbol, setCompanySymbol] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [financialData, setFinancialData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [numYears, setNumYears] = useState('');
  const [loadingForecast, setLoadingForecast] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      ...selectedFeatures.map((feature) => ({
        Header: feature,
        accessor: feature,
      })),
    ],
    [selectedFeatures]
  );

  const data = React.useMemo(() => financialData, [financialData]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/financial-data/${companySymbol}`);
      setFinancialData(response.data.financial_data);
    } catch (error) {
      console.error('Error fetching financial data:', error);
    }
  };

  const handleForecast = async () => {
    setLoadingForecast(true);
    try {
      const response = await axios.post(`/forecast3`, {
        company_symbol: companySymbol,
        selected_features: selectedFeatures,
        num_years: numYears,
      });
      setForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
    setLoadingForecast(false);
  };

  const downloadData = (data, filename) => {
    const csvData = Papa.unparse(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, filename);
  };

  return (
    <div className="forecasting-container"> {/* Use entire screen */}
      <h1>Financial Forecasting</h1>
      <div className="form-section">
        <label htmlFor="companySymbol">Select Company Symbol:</label>
        <select id="companySymbol" value={companySymbol} onChange={(e) => setCompanySymbol(e.target.value)}>
          <option value="">Select...</option>
          <option value="AAPL">AAPL</option>
          <option value="MSFT">MSFT</option>
<option value="GOOGL">GOOGL</option>
<option value="AMZN">AMZN</option>
<option value="TSLA">TSLA</option>
<option value="BRK.A">BRK.A</option>
<option value="META">META</option>
<option value="NVDA">NVDA</option>
<option value="JPM">JPM</option>
<option value="BAC">BAC</option>
<option value="WFC">WFC</option>
<option value="V">V</option>
<option value="UNH">UNH</option>
<option value="JNJ">JNJ</option>
<option value="MCD">MCD</option>
<option value="VZ">VZ</option>
<option value="PG">PG</option>
<option value="COST">COST</option>
<option value="KO">KO</option>
<option value="HD">HD</option>
<option value="MA">MA</option>
<option value="VRTX">VRTX</option>
<option value="WMT">WMT</option>
<option value="CRM">CRM</option>
<option value="INTC">INTC</option>
<option value="PEP">PEP</option>
<option value="TMO">TMO</option>
<option value="MRK">MRK</option>
<option value="ABBV">ABBV</option>
<option value="MS">MS</option>
<option value="ADBE">ADBE</option>
<option value="LMT">LMT</option>
<option value="UNP">UNP</option>
<option value="CAT">CAT</option>
<option value="TXN">TXN</option>
<option value="CVX">CVX</option>
<option value="XOM">XOM</option>
<option value="DHR">DHR</option>
<option value="RTX">RTX</option>
<option value="IBM">IBM</option>
<option value="DOW">DOW</option>
<option value="NEE">NEE</option>
<option value="BA">BA</option>
<option value="PFE">PFE</option>
<option value="HON">HON</option>
<option value="CSCO">CSCO</option>
<option value="LIN">LIN</option>
<option value="COSTCO">COSTCO</option>
<option value="MMM">MMM</option>
<option value="MDLZ">MDLZ</option>
<option value="TJX">TJX</option>
<option value="TGT">TGT</option>
<option value="NKE">NKE</option>
<option value="UPS">UPS</option>
<option value="TEL">TEL</option>
<option value="AVGO">AVGO</option>
<option value="LLY">LLY</option>
<option value="CMG">CMG</option>
<option value="CI">CI</option>
<option value="ORCL">ORCL</option>
<option value="CHTR">CHTR</option>
<option value="LOW">LOW</option>
<option value="ABT">ABT</option>
<option value="DXCM">DXCM</option>
<option value="ADP">ADP</option>
<option value="FISV">FISV</option>
<option value="NSC">NSC</option>
<option value="WM">WM</option>
<option value="BK">BK</option>
<option value="AEP">AEP</option>
<option value="EQT">EQT</option>
<option value="LHX">LHX</option>
<option value="ESRT">ESRT</option>
<option value="WELL">WELL</option>
<option value="BKNG">BKNG</option>
<option value="TPR">TPR</option>
<option value="EXPD">EXPD</option>
<option value="IQV">IQV</option>
<option value="TDY">TDY</option>
<option value="DHR">DHR</option>
<option value="WBA">WBA</option>
<option value="LUMN">LUMN</option>
<option value="DIS">DIS</option>
<option value="EFX">EFX</option>
<option value="KHC">KHC</option>
<option value="KLAC">KLAC</option>
<option value="TROW">TROW</option>
<option value="MTCH">MTCH</option>
<option value="SYK">SYK</option>
<option value="STZ">STZ</option>
<option value="ABMD">ABMD</option>
<option value="WDAY">WDAY</option>
<option value="INTC">INTC</option>
<option value="WBA">WBA</option>
<option value="TRV">TRV</option>
<option value="DHR">DHR</option>
<option value="TJX">TJX</option>
<option value="XEL">XEL</option>
<option value="BBY">BBY</option>
<option value="TFC">TFC</option>
<option value="KLAC">KLAC</option>
<option value="MS">MS</option>
<option value="SBUX">SBUX</option>
<option value="SYY">SYY</option>
<option value="DHR">DHR</option>
<option value="TJX">TJX</option>
<option value="XEL">XEL</option>
<option value="BBY">BBY</option>
<option value="TFC">TFC</option>
<option value="KLAC">KLAC</option>
<option value="MS">MS</option>
<option value="SBUX">SBUX</option>
<option value="SYY">SYY</option>


        </select>
        <button onClick={fetchData}>Fetch Financial Features</button>
      </div>
      <div className="features-section"> {/* Align and style features section */}
        <h2>Financial Features</h2>
        <div className="financial-features-grid"> {/* Create grid for financial features */}
          {financialData.length > 0 &&
            Object.keys(financialData[0]).map((key) => (
              <div key={key} className="feature-item"> {/* Style feature item */}
                <input
                  type="checkbox"
                  id={key}
                  value={key}
                  checked={selectedFeatures.includes(key)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setSelectedFeatures((prevSelected) =>
                      isChecked ? [...prevSelected, key] : prevSelected.filter((item) => item !== key)
                    );
                  }}
                />
                <label htmlFor={key}>{key}</label>
              </div>
            ))}
        </div>
        {selectedFeatures.length > 0 && (
          <div>
            <button onClick={fetchData}>Fetch Financial Data</button>
          </div>
        )}
      </div>
      <div className="table-section"> {/* Align and style table section */}
        <h2>Financial Data</h2>
        {financialData.length > 0 && (
          <>
            <button onClick={() => downloadData(financialData, 'financial_data.csv')}>Download Financial Data</button>
            <Table columns={columns} data={data} />
          </>
        )}
      </div>
      <div className="forecast-section"> {/* Align and style forecast section */}
        <h2>Forecast Data</h2>
        <div className="forecast-inputs"> {/* Align and style forecast inputs */}
          <label htmlFor="numYears">Number of Years to Forecast:</label>
          <input
            type="number"
            id="numYears"
            value={numYears}
            onChange={(e) => setNumYears(e.target.value)}
          />
          <button onClick={handleForecast} disabled={loadingForecast}>
            {loadingForecast ? 'Processing...' : 'Forecast'}
          </button>
        </div>
        {forecastData.length > 0 && (
          <>
            <button onClick={() => downloadData(forecastData, 'forecast_data.csv')}>Download Forecast Data</button>
            <Table columns={columns} data={forecastData} />
          </>
        )}
      </div>
    </div>
  );
}

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="custom-table"> {/* Add custom table class */}
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default FinancialForecasting;



