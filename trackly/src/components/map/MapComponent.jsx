// src/components/map/MapComponent.jsx
import React, { useEffect, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useGoogleMaps } from '../../contexts/location/GoogleMapsContext';

import { useLocationSearchContext } from '../../contexts/location/LocationSearchContext';

const containerStyle = {
  width: '100%',
  height: '100%'
};


const mapStyles = [
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ visibility: "on" }]
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "on" }]
  }
];

const center = {
  lat: 6.0329,
  lng: 80.2168
};

const MapComponent = () => {
  const googleMaps = useGoogleMaps();
  
  const { 
    endPosition, 
    onLoad, 
    map, 
    setMap, 
    startPosition 
  } = useLocationSearchContext();

  const mapRef = useRef(null);

  const options = {
    styles: mapStyles,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    disableDefaultUI: true,
    zoomControl: true
  }
  

  return (
    <div ref={mapRef} style={containerStyle}>
      {googleMaps && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={options}
          center={center}
          zoom={8}
          onLoad={(map) => onLoad(map)} // Load map instance to context
        >
          {endPosition && <Marker position={endPosition} />}
          {startPosition && <Marker position={startPosition} />}
        </GoogleMap>
      )}
    </div>
  );
};

export default MapComponent;
