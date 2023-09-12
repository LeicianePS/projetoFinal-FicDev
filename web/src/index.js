import 'bootstrap/dist/css/bootstrap.min.css';
import ApexCharts from 'react-apexcharts';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//ReactDOM.createRoot(document.getElementById('root')).render(<App />);;


const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
