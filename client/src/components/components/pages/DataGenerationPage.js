// import React, { useState } from 'react';
// import axios from 'axios';
// import './DataGenerationPage.css';


// function DataGenerationPage() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [downloadLink, setDownloadLink] = useState('');
//   const [featureNames, setFeatureNames] = useState([]);
//   const [selectedFeatures, setSelectedFeatures] = useState([]);
//   const [numSamples, setNumSamples] = useState('');

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = () => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('file', file);
//     axios.post('/upload1', formData)
//       .then((response) => {
//         // Handle successful upload
//         console.log(response.data);
//         setFeatureNames(response.data.feature_names);
//       })
//       .catch((error) => {
//         // Handle upload error
//         console.error('Error uploading file:', error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const handleGenerate = () => {
//     setLoading(true);
//     const data = {
//       categorical_features: selectedFeatures,
//       num_samples: numSamples
//     };
//     axios.post('/generate1', data)
//       .then((response) => {
//         // Handle successful generation
//         console.log(response.data);
//         setDownloadLink(response.data.csv_data);
//       })
//       .catch((error) => {
//         // Handle generation error
//         console.error('Error generating data:', error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const handleDownload = () => {
//     const blob = new Blob([downloadLink], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'sampled_dataset.csv');
//     document.body.appendChild(link);
//     link.click();
//     link.parentNode.removeChild(link);
//   };

//   const handleFeatureChange = (event) => {
//     const { value, checked } = event.target;
//     if (checked) {
//       setSelectedFeatures([...selectedFeatures, value]);
//     } else {
//       setSelectedFeatures(selectedFeatures.filter((feature) => feature !== value));
//     }
//   };

//   return (
//     <div>
//       <h1>Upload Dataset and Generate Sample Data</h1>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={!file || loading}>
//         Upload
//       </button>
//       <div>
//         <h2>Select Categorical Features:</h2>
//         {featureNames.map((feature) => (
//           <div key={feature}>
//             <input
//               type="checkbox"
//               id={feature}
//               value={feature}
//               onChange={handleFeatureChange}
//             />
//             <label htmlFor={feature}>{feature}</label>
//           </div>
//         ))}
//       </div>
//       <div>
//         <label htmlFor="numSamples">Number of Samples:</label>
//         <input
//           type="number"
//           id="numSamples"
//           value={numSamples}
//           onChange={(event) => setNumSamples(event.target.value)}
//         />
//       </div>
//       <button onClick={handleGenerate} disabled={!selectedFeatures.length || !numSamples || loading}>
//         Generate
//       </button>
//       {loading && <p>Loading...</p>}
//       {downloadLink && (
//         <div>
//           <p>Download your sampled dataset:</p>
//           <button onClick={handleDownload}>Download CSV</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DataGenerationPage;



import React, { useState } from 'react';
import axios from 'axios';
import './DataGenerationPage.css'; // Import CSS file

function DataGenerationPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');
  const [featureNames, setFeatureNames] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [numSamples, setNumSamples] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    axios.post('/upload1', formData)
      .then((response) => {
        // Handle successful upload
        console.log(response.data);
        setFeatureNames(response.data.feature_names);
      })
      .catch((error) => {
        // Handle upload error
        console.error('Error uploading file:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGenerate = () => {
    setLoading(true);
    const data = {
      categorical_features: selectedFeatures,
      num_samples: numSamples
    };
    axios.post('/generate1', data)
      .then((response) => {
        // Handle successful generation
        console.log(response.data);
        setDownloadLink(response.data.csv_data);
      })
      .catch((error) => {
        // Handle generation error
        console.error('Error generating data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDownload = () => {
    const blob = new Blob([downloadLink], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sampled_dataset.csv');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const handleFeatureChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFeatures([...selectedFeatures, value]);
    } else {
      setSelectedFeatures(selectedFeatures.filter((feature) => feature !== value));
    }
  };

  return (
    <div className="container"> {/* Add a container class */}
      <h1>Upload Dataset and Generate Sample Data</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || loading}>
        Upload
      </button>
      <div>
        <h2>Select Categorical Features:</h2>
        {featureNames.map((feature) => (
          <div key={feature} className="checkbox-item"> {/* Add a class for checkbox item */}
            <input
              type="checkbox"
              id={feature}
              value={feature}
              onChange={handleFeatureChange}
            />
            <label htmlFor={feature}>{feature}</label>
          </div>
        ))}
      </div>
      <div className="input-group"> {/* Add a class for input group */}
        <label htmlFor="numSamples">Number of Samples:</label>
        <input
          type="number"
          id="numSamples"
          value={numSamples}
          onChange={(event) => setNumSamples(event.target.value)}
        />
      </div>
      <button onClick={handleGenerate} disabled={!selectedFeatures.length || !numSamples || loading}>
        Generate
      </button>
      {loading && <p>Loading...</p>}
      {downloadLink && (
        <div>
          <p>Download your sampled dataset:</p>
          <button onClick={handleDownload}>Download CSV</button>
        </div>
      )}
    </div>
  );
}

export default DataGenerationPage;

