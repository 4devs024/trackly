import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import GoogleMapsLoader from './contexts/location/GoogleMapsLoader';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <GoogleMapsLoader>
      <App />
    </GoogleMapsLoader>
  </StrictMode>
);