import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, Autocomplete, Marker, Polyline } from '@react-google-maps/api';
import './driverRouteSelect.css';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '20px'
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

const DriverRouteSelect = () => {
  const [map, setMap] = useState(null);
  const [autocompleteStart, setAutocompleteStart] = useState(null);
  const [autocompleteEnd, setAutocompleteEnd] = useState(null);
  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [directions, setDirections] = useState(null);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);

  const directionsService = useRef(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onLoadStartAutocomplete = (autocomplete) => {
    setAutocompleteStart(autocomplete);
  };

  const onLoadEndAutocomplete = (autocomplete) => {
    setAutocompleteEnd(autocomplete);
  };

  const onPlaceChanged = (autocomplete, setPosition) => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        setPosition({ lat: location.lat(), lng: location.lng() });
        map.panTo(location);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const addWaypoint = (location) => {
    setWaypoints((prevWaypoints) => [...prevWaypoints, location]);
  };

  const removeWaypoint = (index) => {
    setWaypoints((prevWaypoints) => prevWaypoints.filter((_, i) => i !== index));
  };

  const calculateRoute = () => {
    if (startPosition && endPosition) {
      if (!directionsService.current) {
        directionsService.current = new window.google.maps.DirectionsService();
      }

      const waypointsObj = waypoints.map((point) => ({
        location: new window.google.maps.LatLng(point.lat, point.lng),
        stopover: true,
      }));

      directionsService.current.route(
        {
          origin: startPosition,
          destination: endPosition,
          waypoints: waypointsObj,
          travelMode: window.google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
          avoidFerries: true,
          avoidTolls: true,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            setSelectedRouteIndex(null); // Reset selected route index
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  return (
      <div className='driver-route-select-container'>
        <div className="left-container">
          <Autocomplete
            onLoad={onLoadStartAutocomplete}
            onPlaceChanged={() => onPlaceChanged(autocompleteStart, setStartPosition)}
          >
            <input 
              className='input-start-location'
              type="text"
              placeholder="Start location"
            />
          </Autocomplete>
          <Autocomplete
            onLoad={onLoadEndAutocomplete}
            onPlaceChanged={() => onPlaceChanged(autocompleteEnd, setEndPosition)}
          >
            <input 
              className='input-end-location'
              type="text"
              placeholder="End location"
            />
          </Autocomplete>
          <button
            className='button-calculate-route'
            onClick={calculateRoute}
          >
            Calculate Route
          </button>
        </div>
        <div className="right-container">
          {directions && (
            <div style={{ margin: '10px' }}>
              {directions.routes.map((route, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRouteIndex(index)} // Handle route selection
                  style={{
                    margin: '5px',
                    padding: '5px 10px',
                    background: selectedRouteIndex === index ? 'blue' : 'gray', // Highlight selected route
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Route {index + 1}
                </button>
              ))}
            </div>
          )}

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={startPosition || { lat: 6.0329, lng: 80.2168 }} // Use startPosition if available, otherwise use default center
            zoom={8}
            onClick={(e) => addWaypoint({ lat: e.latLng.lat(), lng: e.latLng.lng() })} // Add waypoint on map click
            onLoad={onLoad}
            options={{ styles: mapStyles }}
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
        </div>
      </div>
  );
};

export default DriverRouteSelect;
