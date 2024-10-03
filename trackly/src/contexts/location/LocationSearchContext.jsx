import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";

const LocationSearchContext = createContext();

export const useLocationSearchContext = () => useContext(LocationSearchContext);

export const LocationSearchProvider = ({ children }) => {
  const [map, setMap] = useState(null);
  const [autocompleteStart, setAutocompleteStart] = useState(null);
  const [autocompleteEnd, setAutocompleteEnd] = useState(null);
  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [directions, setDirections] = useState(null);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);
  const [placePhoto, setPlacePhoto] = useState(null); // New state for place photo
  const [startPositionName, setStartPositionName ] = useState('');
  const [endPositionName, setEndPositionName] = useState('');

  const [autocompleteValue, setAutocompleteValue ] = useState(null);

  const directionsService = useRef(null);

  // These states are used to provide gps functionality
  const [gpsLocation, setGPSLocation] = useState({ lat: null, lng: null });
  const [gpsError, setGPSError] = useState(null);



  
  // This useEffect is used to clear the search bars and loaded photos
  useEffect(() => {
    if (endPositionName === '') {
      setPlacePhoto(null);
      setEndPosition(null);
    }
  }, [endPositionName]);

  useEffect(() => {
    if (!directionsService.current && window.google) {
        directionsService.current = new window.google.maps.DirectionsService();
    }
  }, [directionsService]);

  

  // This function is used to get the user's gps location
  const setUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const location = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
              };
              setGPSLocation(location);
              setStartPosition(location);
              if (map) {
                const googleLatLng = new window.google.maps.LatLng(location.lat, location.lng);
                map.panTo(googleLatLng);
              }
          },
          (err) => {
              console.error('Error code: ' + err.code + ' - ' + err.message);
              setGPSError(err.message);
          }
      );
    } else {
        setGPSError("Geolocation is not supported by this browser.");
    }
  }


  // This function is used to load the map reference
  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onLoadStartAutocomplete = (autocomplete) => {
    setAutocompleteStart(autocomplete);
  };

  const onLoadEndAutocomplete = (autocomplete) => {
    setAutocompleteEnd(autocomplete);
  };

  const onPlaceChanged = (autocomplete, setPosition, setPositionName) => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location && place.formatted_address) {
        const location = place.geometry.location;
        setPosition({ lat: location.lat(), lng: location.lng() });

        // This is used to set the autocompleted value on the input field.
        const name = place.formatted_address || place.name || '';
        setPositionName(name);
        if (map) {
          map.panTo(location);
        }
        // Fetch place details including photo
        const placeService = new window.google.maps.places.PlacesService(map);
        placeService.getDetails({ placeId: place.place_id }, (placeResult, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            if (placeResult.photos && placeResult.photos.length > 0) {
              const photoUrl = placeResult.photos[0].getUrl({ maxWidth: 400, maxHeight: 300 });
              setPlacePhoto(photoUrl);
            } else {
              setPlacePhoto(null);
              console.log('No photos available for this place.');
            }
          }
        });
      } else {
        console.log('Place is not defined or something is wrong');
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
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    }
  };



  return (
    <LocationSearchContext.Provider value={{
      map,
      setMap,
      startPosition,
      setStartPosition,
      endPosition,
      setEndPosition,
      autocompleteEnd,
      setAutocompleteEnd,
      autocompleteStart,
      setAutocompleteStart,
      onLoadEndAutocomplete,
      onLoadStartAutocomplete,
      onPlaceChanged,
      onLoad,
      placePhoto, // Provide placePhoto in the context
      startPositionName,
      setStartPositionName, 
      endPositionName,
      setEndPositionName,
      setGPSError,
      setUserLocation,
      gpsLocation,
      directionsService
      
    }}>
      {children}
    </LocationSearchContext.Provider>
  );
};
