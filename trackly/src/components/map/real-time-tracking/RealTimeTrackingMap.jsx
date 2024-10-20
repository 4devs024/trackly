import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import bus_pointer from '../../../assets/images/bus_pointer.png'; // Your bus icon

const containerStyle = {
  width: '100%',
  height: '100%',
};

const mapStyles = [
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }],
  },
];

const RealTimeTrackingMap = () => {
  const mapRef = useRef(null);
  const [busPosition, setBusPosition] = useState(null); // Store a single bus position

  const options = {
    styles: mapStyles,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    disableDefaultUI: true,
    zoomControl: true,
  };

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket('ws://localhost:9090/busTracking/buses/Bus101');

    ws.onopen = () => {
      console.log('WebSocket connection established');
      // Send initial request to track buses
      ws.send(
        JSON.stringify({
          action: 'track-buses-and-passengers',
        })
      );
    };

    ws.onmessage = (event) => {
      const busData = JSON.parse(event.data);

      // Update bus position with the latest data from backend
      if (busData) {
        setBusPosition(busData); // Update to the current bus position
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);


  return (
    <div ref={mapRef} style={containerStyle}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={12}
        options={options}
      >
        {/* Render bus marker */}
        {busPosition && (
          <Marker
            position={{ lat: parseFloat(busPosition.latitude), lng: parseFloat(busPosition.longitude) }} // Use latitude and longitude from bus data
            label={`Bus ${busPosition.vehicleNumber}`}
            icon={{
              url: bus_pointer,
              scaledSize: new window.google.maps.Size(40, 40), 
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default RealTimeTrackingMap;
