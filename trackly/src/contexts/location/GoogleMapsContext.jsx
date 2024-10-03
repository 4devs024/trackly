// src/contexts/location/GoogleMapsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const GoogleMapsContext = createContext();

const apiKey = 'AIzaSyAOEatSLRac4OG2bfIySYe6l8aV61Fm_rc'

export const useGoogleMaps = () => useContext(GoogleMapsContext);

export const GoogleMapsProvider = ({ children }) => {
  const [googleMaps, setGoogleMaps] = useState(null);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        setGoogleMaps(window.google.maps);  
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setGoogleMaps(window.google.maps);
      };
      document.body.appendChild(script);
    };

    loadGoogleMapsApi();
  }, []);

  return (
    <GoogleMapsContext.Provider value={googleMaps}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
