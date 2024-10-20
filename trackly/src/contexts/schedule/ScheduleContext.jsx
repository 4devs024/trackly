import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getBusesData } from "../../api/BusCRUD";
import { calculateNearestPoint } from "../../important-functions/ScheduleSelection";

import nearestPointOnLine from '@turf/nearest-point-on-line';
import { lineString, point } from '@turf/turf'; // Assuming you have this for creating line strings
import polyline from '@mapbox/polyline';


const ScheduleContext = createContext();

export const useScheduleContext = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {
    const [schedule, setSchedule] = useState(null);
    const [startPosition, setStartPosition] = useState(null);
    const [endPosition, setEndPosition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [estimatedArrivalTime, setEstimatedArrivalTime] = useState(null);
    const [busData, setBusData] = useState(null);
    const [selectedBus, setSelectedBus] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [routeDepartureLocationName, setRouteDepartureLocationName] = useState("");
    const [routeArrivalLocationName, setRouteArrivalLocationName]  = useState("");


    const directionsService = useRef(null);

    const setReferences = (start, end, dirService) => {
        setStartPosition(start);
        setEndPosition(end);
        directionsService.current = dirService.current;
    };

    const isBusGoingForward = (busDeparturePlace, busArrivalPlace) => {
        return (busDeparturePlace == routeDepartureLocationName && busArrivalPlace == routeArrivalLocationName);
    }

    const isPassengerGoingForward = (bus, startPosition, endPosition) => {
        // Decode the bus route polyline
        const decodedPolyline = polyline.decode(bus.route.polyline);
        const busRouteLine = lineString(decodedPolyline.map(([lat, lng]) => [lng, lat])); // Turf.js expects [lng, lat]
    
        // Find the nearest points on the bus route line
        const startPoint = point([startPosition.lng, startPosition.lat]);
        const endPoint = point([endPosition.lng, endPosition.lat]);
    
        const nearestStart = nearestPointOnLine(busRouteLine, startPoint);
        const nearestEnd = nearestPointOnLine(busRouteLine, endPoint);
    
        // Get the index of the nearest points
        const startIndex = nearestStart.properties.index;
        const endIndex = nearestEnd.properties.index;
    
        // Check if the passenger's start position is before and the end position is after
        return startIndex < endIndex;
    };
    
    
    // Function to find the relevant trip based on selected bus and current time
    const findRelevantTrip = () => {
        if (!selectedBus || !selectedBus.schedules) return null;
    
        const currentTime = new Date();
        currentTime.setHours(7); // Example time for testing
        currentTime.setMinutes(25);
    
        const currentDay = currentTime.toLocaleString('en-US', { weekday: 'long' });
    
        // Find the schedule for the current day
        const todaySchedule = selectedBus.schedules.find(schedule => schedule.day === currentDay);
    
        if (!todaySchedule || todaySchedule.entries.length === 0) {
            console.error('No schedule entries available for today');
            return null;
        }
    
        // Find the next trip based on current time and direction
        const nextTrip = todaySchedule.entries.find(entry => {
            const departureTime = new Date(currentTime.toDateString() + ' ' + entry.departureTime);
            const arrivalTime = new Date(currentTime.toDateString() + ' ' + entry.arrivalTime);

            const departurePlace = entry.departurePlace
            const arrivalPlace = entry.arrivalPlace;
            
            const busGoesFoward = isBusGoingForward(departurePlace, arrivalPlace);
            const passengerGoesFoward = isPassengerGoingForward(selectedBus, startPosition, endPosition);


            if(passengerGoesFoward){
                if(busGoesFoward){
                    return departureTime > currentTime;
                }
            } else {
                if(!busGoesFoward){
                    return departureTime > currentTime;
                }
            }
        });
    
        if (!nextTrip) {
            console.error('No upcoming trips found for selected bus in the correct direction');
            return null;
        }
    
        setSelectedTrip(nextTrip); // Store the selected trip
        return nextTrip;
    };
    
    useEffect(() => {
        const fetchBusData = async () => {
            setLoading(true);
            try {
                const response = await getBusesData();
                setBusData(response.data);
            } catch (error) {
                console.error('Error fetching bus data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBusData();
    }, []);

    useEffect(() => {
        if (startPosition && endPosition && busData) {
            const nearestBus = calculateNearestPoint(startPosition, endPosition, busData);
            busData.forEach(bus => {
                if (bus.vehicleNumber === nearestBus) {
                    setSelectedBus(bus);
                    setRouteDepartureLocationName(bus.schedules[0].entries[0].departurePlace)
                    setRouteArrivalLocationName(bus.schedules[0].entries[0].arrivalPlace)
                }
            });
        }
    }, [startPosition, endPosition, busData]);

    useEffect(() => {
        if (selectedBus) {
            const relevantTrip = findRelevantTrip(); // Find the relevant trip
            if (relevantTrip) {
                setSchedule(relevantTrip);
            }
        }
    }, [selectedBus]);

    return (
        <ScheduleContext.Provider value={{ setReferences, schedule, loading, estimatedArrivalTime, busData, selectedBus, selectedTrip }}>
            {children}
        </ScheduleContext.Provider>
    );
};
