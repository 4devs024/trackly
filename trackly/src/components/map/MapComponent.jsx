// src/components/map/MapComponent.jsx
import React, { useEffect, useRef } from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { useGoogleMaps } from '../../contexts/location/GoogleMapsContext';

import { useLocationSearchContext } from '../../contexts/location/LocationSearchContext';

const containerStyle = {
  width: '100%',
  height: '100%',
};

// const libraries = ['places'];

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

const MapComponent = ({props}) => {
  const googleMaps = useGoogleMaps();
  
  const { 
      startPosition,
      endPosition,
      onLoad,
      addWaypoint,
      removeWaypoint,
      setWaypoints,
      waypoints,
      directions,
      selectedRouteIndex,
      setSelectedRouteIndex
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

  useEffect(() => {
    if(directions){
      props(directions.routes[selectedRouteIndex]);
    }
  }, [selectedRouteIndex]);
  

  return (
    <div ref={mapRef} style={containerStyle}>
      {googleMaps && (
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={startPosition || { lat: 6.0329, lng: 80.2168 }} // Use startPosition if available, otherwise use default center
        zoom={8}
        onClick={(e) => addWaypoint({ lat: e.latLng.lat(), lng: e.latLng.lng() })} // Add waypoint on map click
        onLoad={onLoad}
        options={options}
      >
        {startPosition && <Marker position={startPosition} />}
        {endPosition && <Marker position={endPosition} />}
        {waypoints.map((waypoint, index) => (
          <Marker
            key={index}
            position={waypoint}
            draggable={true}
            onDragEnd={(e) => {
              const newWaypoints = [...waypoints];
              newWaypoints[index] = { lat: e.latLng.lat(), lng: e.latLng.lng() };
              setWaypoints(newWaypoints);
            }}
            onRightClick={() => removeWaypoint(index)} // Remove waypoint on right-click
          />
        ))}
        {directions && directions.routes.map((route, index) => (
          <Polyline
            key={index}
            path={route.overview_path}
            options={{
              strokeColor: selectedRouteIndex === index ? 'blue' : 'gray', // Highlight selected route
              strokeOpacity: 0.8,
              strokeWeight: 5,
              clickable: true,
            }}
            onClick={() => setSelectedRouteIndex(index)} // Handle route selection
          />
        ))}
      </GoogleMap>
      )}
    </div>
  );
};

export default MapComponent;
