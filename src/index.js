import React from 'react';
import ReactDOM from 'react-dom';
//import './global.css';
import App from './App';

/* Alteração para remover warning: "index.js:1 Warning: findDOMNode is deprecated in StrictMode." */
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// teste