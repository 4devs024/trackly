import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, Autocomplete, Marker, Polyline } from '@react-google-maps/api';
import styled from 'styled-components';
import MapComponent from '../../../../../map/MapComponent';

import { useLocationSearchContext } from '../../../../../../contexts/location/LocationSearchContext';

import { useAddBusContext } from '../../../../../../contexts/driver/AddBusContext';
import { useEffect } from 'react';



const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  height: 100%;
  width: 100%;
`;

const LeftContainer = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.div` 
  flex: 0.6;
`;

const InputStartLocation = styled.input`
  border: 1px solid transparent;
  width: 240px;
  height: 32px;
  padding: 0 12px;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  font-size: 14px;
  outline: none;
  text-overflow: ellipses;
`;

const InputEndLocation = styled.input`
  border: 1px solid transparent;
  width: 240px;
  height: 32px;
  padding: 0 12px;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  font-size: 14px;
  outline: none;
  text-overflow: ellipses;
`;

const ButtonCalculateRoute = styled.button`
  padding: 10px;
  background: blue;
  color: white;
  border-radius: 5px;
`;

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '20px'
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

const DriverRouteSelect = () => {

  const {
    setStartPosition,
    setEndPosition,
    autocompleteEnd,
    autocompleteStart,
    onLoadEndAutocomplete,
    onLoadStartAutocomplete,
    onPlaceChanged,
    directions,
    selectedRouteIndex,
    setSelectedRouteIndex,
    calculateRoute,
    setStartPositionName,
    setEndPositionName,
    startPositionName,
    endPositionName
  } = useLocationSearchContext();

  const {
    setSelectedRoute,
    endPlaces,
    setEndPlaces
  } = useAddBusContext();

  useEffect(() => {
    if (startPositionName) {
      setEndPlaces((prev) => ({ ...prev, endPlaceOne: startPositionName }));
    }
  }, [startPositionName]); // Whenever startPositionName changes, update endPlaces
  
  useEffect(() => {
    if (endPositionName) {
      setEndPlaces((prev) => ({ ...prev, endPlaceTwo: endPositionName }));
    }
  }, [endPositionName]); // Whenever endPositionName changes, update endPlaces
  


  return (
    <Container>
      <LeftContainer>
        <Autocomplete
          onLoad={onLoadStartAutocomplete}
          onPlaceChanged={() => onPlaceChanged(autocompleteStart, setStartPosition, setStartPositionName)}
        >
          <InputStartLocation
            type="text"
            placeholder="Start location"
            value={endPlaces.endPlaceOne}
            onChange={e => setEndPlaces({ ...endPlaces, endPlaceOne: e.target.value })}
          />
        </Autocomplete>
        <Autocomplete
          onLoad={onLoadEndAutocomplete}
          onPlaceChanged={() => onPlaceChanged(autocompleteEnd, setEndPosition, setEndPositionName)}
        >
          <InputEndLocation
            type="text"
            placeholder="End location"
            value={endPlaces.endPlaceTwo}
            onChange={e => setEndPlaces({ ...endPlaces, endPlaceTwo: e.target.value })}
          />
        </Autocomplete>
        <ButtonCalculateRoute onClick={calculateRoute}>
          Calculate Route
        </ButtonCalculateRoute>
      </LeftContainer>
      <RightContainer>
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
        <MapComponent props={setSelectedRoute}/>
      </RightContainer>
    </Container>
  );
};

export default DriverRouteSelect;
