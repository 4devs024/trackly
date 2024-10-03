// src/contexts/location/GoogleMapsLoader.js
import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import { GoogleMapsProvider } from './GoogleMapsContext';

const GoogleMapsLoader = ({ children }) => {
  const googleMapsApiKey = 'AIzaSyAOEatSLRac4OG2bfIySYe6l8aV61Fm_rc';

  return (
    <LoadScript 
        googleMapsApiKey={googleMapsApiKey}
        libraries={['places']}
    >
      <GoogleMapsProvider>
        {children}
      </GoogleMapsProvider>
    </LoadScript>
  );
};

export default GoogleMapsLoader;
