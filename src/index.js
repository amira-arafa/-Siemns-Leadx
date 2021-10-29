import React from 'react';
import ReactDOM from 'react-dom';
import { registerServiceWorker } from './serviceWorker';
import App from './containers/App';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
registerServiceWorker();