import styled from "styled-components";
import { useAddBusContext } from "../../contexts/driver/AddBusContext";
import ProgressBar from "../../components/styles/Progress";
import { LocationSearchProvider } from "../../contexts/location/LocationSearchContext";

const totalSteps = 3;

const AddBus = () => {
    const {
        step,
        loadStep
    } = useAddBusContext();

    return (
        <LocationSearchProvider>
            <AddBusStyled>
                <div className="inner-layout">
                    <div className="progress-bar">
                        <ProgressBar step={step} totalSteps={totalSteps} />
                    </div>
                    <div className="form">
                        {loadStep(step)}
                    </div>
                </div>
            </AddBusStyled>
        </LocationSearchProvider>
    );
}

const AddBusStyled = styled.div`
    height: 100vh;
    width: 100vw;  
    display: flex;
    justify-content: center;
    align-items: center;
    
    .inner-layout{
        height: 80vh;
        width: 80vw;
        padding: 10px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        border-radius: 20px;
        transition: 0.2s;

        display: flex;
        flex-direction: column;

        .progress-bar{
            flex: 0.1;
        }

        .form{
            flex: 0.9;
            overflow: hidden;
        }
    }

    .inner-layout:hover{
    }
`;

export default AddBus;
