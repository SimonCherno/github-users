import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

// domian: dev-k7lyd7jj.us.auth0.com
// client id: HKLzvcV91u0Irf8uoX6HYYQBQo7RivNQ

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-k7lyd7jj.us.auth0.com"
      clientId="HKLzvcV91u0Irf8uoX6HYYQBQo7RivNQ"
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <AppProvider>
        <App />
      </AppProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
