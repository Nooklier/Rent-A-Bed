import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/store.js';

// Create a variable to access your store and expose it on the window
const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
