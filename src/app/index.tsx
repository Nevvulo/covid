import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5555/api' : 'https://covid.nevulo.xyz/api';

axios.defaults.baseURL = BASE_URL;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
