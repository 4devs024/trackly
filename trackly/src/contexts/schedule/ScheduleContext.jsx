import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

const ScheduleContext = createContext();

export const useScheduleContext = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {
    const [schedules, setSchedules] = useState([]);
    const [startPosition, setStartPosition] = useState(null);
    const [endPosition, setEndPosition] = useState(null);
    const directionsService = useRef(null);

    const setRefferences = (start, end, dirService) => {
        setStartPosition(start);
        setEndPosition(end);
        directionsService.current = dirService.current;
    };

    const filterOnlyBusRoutes = (result) => {
        const filteredRoutes = result.routes.filter(route =>
            route.legs.every(leg =>
                leg.steps.every(step =>
                    step.travel_mode !== 'TRANSIT' || (step.travel_mode === 'TRANSIT' && step.transit.line.vehicle.type === 'BUS')
                )
            )
        );
        return { ...result, routes: filteredRoutes };
    };

    const getTransitSchedulesWithinTwoHours = useCallback(async () => {
        if (!startPosition || !endPosition || !directionsService.current) {
            console.error("Start or end position not defined, or directions service not initialized");
            return;
        }

        const schedules = [];
        const now = new Date();
        const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
        const interval = 15 * 60 * 1000; // 15 minutes in milliseconds

        const getSchedules = async (time) => {
            return new Promise((resolve, reject) => {
                const request = {
                    origin: startPosition,
                    destination: endPosition,
                    travelMode: window.google.maps.TravelMode.TRANSIT,
                    transitOptions: {
                        routingPreference: 'FEWER_TRANSFERS',
                        departureTime: new Date(time)
                    }
                };

                directionsService.current.route(request, (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        const filteredResult = filterOnlyBusRoutes(result);
                        console.log(filteredResult)
                        resolve(filteredResult);
                    } else {
                        reject(`Error fetching directions: ${status}`);
                    }
                });
            });
        };

        const promises = [];
        for (let time = now.getTime(); time <= twoHoursLater.getTime(); time += interval) {
            promises.push(getSchedules(time));
        }

        Promise.all(promises).then(results => {
            results.forEach(result => {
                schedules.push(...result.routes);
            });
            setSchedules(schedules);
        }).catch(error => {
            console.error(error);
        });
    }, [startPosition, endPosition]);

    useEffect(() => {
        if (startPosition && endPosition) {
            getTransitSchedulesWithinTwoHours();
        }
    }, [startPosition, endPosition, getTransitSchedulesWithinTwoHours]);

    return (
        <ScheduleContext.Provider value={{ setRefferences, schedules }}>
            {children}
        </ScheduleContext.Provider>
    );
};


//////////////////////////////////////

// import { createContext, useContext, useState } from "react";


// const ScheduleContext = createContext();

// export const useScheduleContext = () => useContext(ScheduleContext);


// export const ScheduleProvider = ({children}) => {

//   // This useState is used manage the schedules
//   const [transitDirections, setTransitDirections] = useState(null);







//   const getTransitDirections = async (origin, destination, directionsService) => {
//     if (!directionsService.current) {
//       directionsService.current = new window.google.maps.DirectionsService();
//     }

//     const request = {
//       origin,
//       destination,
//       travelMode: window.google.maps.TravelMode.TRANSIT,
//       transitOptions: {
//         routingPreference: 'FEWER_TRANSFERS',
//         departureTime: new Date(), 
//       },
//     };

//     directionsService.current.route(request, (result, status) => {
//       if (status === window.google.maps.DirectionsStatus.OK) {
//         const filteredResult = filterOnlyBusRoutes(result);
//         setTransitDirections(filteredResult);
//         console.log(result);
//       } else {
//         console.error('Error fetching directions:', status);
//       }
//     });
//   };

//   const filterOnlyBusRoutes = (result) => {
//     result.routes.forEach(route => {
//       route.legs.forEach(leg => {
//         leg.steps = leg.steps.filter(step => step.travel_mode !== 'TRANSIT' || (step.travel_mode === 'TRANSIT' && step.transit.line.vehicle.type === 'BUS'));
//       });
//     });
//     return result;
//   };



//   return(
//     <ScheduleContext.Provider 
//       value={{
//         getTransitDirections,
//         transitDirections
//       }}>
//       {children}
//     </ScheduleContext.Provider>
//   );


// }