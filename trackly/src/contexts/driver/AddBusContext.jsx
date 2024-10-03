import { createContext, useContext, useState     } from "react";

import AddBusFormOne from "../../components/forms/add-bus-form/AddBusFormOne";
import AddBusFormTwo from "../../components/forms/add-bus-form/AddBusFormTwo";
import AddBusFormThree from "../../components/forms/add-bus-form/AddBusFormThree";


const AddBusContext = createContext();

export const useAddBusContext = () => useContext(AddBusContext);

export const AddBusProvider = ({children}) => {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: ''
    });

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = () => {
        // Handle form submission
        console.log(formData);
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
            loadStep
        }}>
            {children}
        </AddBusContext.Provider>
    );
};