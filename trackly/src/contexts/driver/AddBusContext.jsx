import { createContext, useContext, useState , useEffect   } from "react";

import AddBusFormOne from "../../components/forms/add-bus-form/form-one/AddBusFormOne";
import AddBusFormTwo from "../../components/forms/add-bus-form/form-two/AddBusFormTwo";
import AddBusFormThree from "../../components/forms/add-bus-form/form-three/AddBusFormThree";
import { addBusToServer } from "../../api/BusCRUD";


const AddBusContext = createContext();

export const useAddBusContext = () => useContext(AddBusContext);

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const AddBusProvider = ({children}) => {

    const initialSchedules = daysOfWeek.map(day => ({
        day,
        entries: [{ departureTime: '', arrivalTime: '', departurePlace: '', arrivalPlace: '' }]
    }));

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [schedules, setSchedules] = useState(initialSchedules);
    const [step, setStep] = useState(1);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [endPlaces, setEndPlaces] = useState({
        endPlaceOne: '',
        endPlaceTwo: '',
    });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        vehicleNumber: '',
        route: null,
        schedule: null
    });

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log(selectedRoute)

        const routeDetails = extractRouteDetails(selectedRoute);

        const busData = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            vehicleNumber: vehicleNumber,
            route: routeDetails, // Add extracted route details here
            schedules: schedules.map(schedule => ({
              day: schedule.day,
              entries: schedule.entries.map(entry => ({
                departurePlace: entry.departurePlace,
                departureTime: entry.departureTime,
                arrivalPlace: entry.arrivalPlace,
                arrivalTime: entry.arrivalTime
              }))
            }))
          };

          console.log(busData);

          addBusToServer(busData);



        
    };

    const extractRouteDetails = (selectedRoute) => {
        if (!selectedRoute) {
            console.error('selectedRoute is undefined');
            return {}; // Handle the error as needed
        }
    
        // Polyline
        const polyline = selectedRoute.overview_polyline
            ? selectedRoute.overview_polyline
            : ''; // Set to empty string or handle accordingly
    
        // Bounds (northeast and southwest coordinates)
        const bounds = selectedRoute.bounds
            ? {
                northeast: {
                    lat: selectedRoute.bounds.northeast?.lat || null,
                    lng: selectedRoute.bounds.northeast?.lng || null
                },
                southwest: {
                    lat: selectedRoute.bounds.southwest?.lat || null,
                    lng: selectedRoute.bounds.southwest?.lng || null
                }
            }
            : {};
    
        // Legs (start_location, end_location, distance, duration)
        const legs = selectedRoute.legs
            ? selectedRoute.legs.map((leg) => ({
                start_location: {
                    lat: leg.start_location?.lat() || null,
                    lng: leg.start_location?.lng() || null
                },
                end_location: {
                    lat: leg.end_location?.lat() || null,
                    lng: leg.end_location?.lng() || null
                },
                distance: leg.distance?.text || '',
                duration: leg.duration?.text || ''
            }))
            : [];
    
        // Waypoint Order (sequence of waypoints in the route)
        const waypointOrder = selectedRoute.waypoint_order || [];
    
        return {
            polyline,
            bounds,
            legs,
            waypointOrder
        };
    };
    
    
      

    const onChange = () => {

    }

    const loadStep = (step) => {
        switch (step) {
            case 1:
            return <AddBusFormOne />;
            case 2:
            return <AddBusFormTwo />;
            case 3:
            return <AddBusFormThree />;
            default:
            return <AddBusFormOne />;
        }
    }


    return(
        <AddBusContext.Provider value={{
            step,
            formData,
            setFormData,
            nextStep,
            prevStep,
            handleSubmit, 
            onChange,
            loadStep,
            selectedRoute,
            setSelectedRoute,
            setSchedules,
            schedules,
            setFirstName,
            setLastName,
            setPhoneNumber,
            setVehicleNumber,
            firstName,
            lastName,
            phoneNumber,
            vehicleNumber,
            endPlaces,
            setEndPlaces
        }}>
            {children}
        </AddBusContext.Provider>
    );
};