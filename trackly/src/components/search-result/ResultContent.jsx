import styled from "styled-components";

import { useLocationSearchContext } from "../../contexts/location/LocationSearchContext";
import { usePanelControlContext } from "../../contexts/global/PanelControlContext";

import Button from "../button/Button";

const ResultContent = () => {
    const { 
        placePhoto, 
        endPositionName 
    } = useLocationSearchContext();

    const {
        setScheduleVisibility
    } = usePanelControlContext();



    return (
        <ResultContentStyled>
            <div className="top-container">
                {placePhoto ? (
                    <img src={placePhoto} alt="Place" />
                ) : (
                    <p>No photo available</p>
                )}
            </div>
            <div className="middle-container">
                <span>{endPositionName}</span>
            </div>
            <div className="bottom-container">
                <Button
                    name='Show Bus Schedule'
                    bgColor='var(--blue-light)'
                    hoverBgColor='var(--blue-dark)'
                    height='50px'
                    bRad='20px'
                    color='white'
                    bPad='0.5rem 4rem'
                    onClick={() => setScheduleVisibility(true)}
                />
            </div>
        </ResultContentStyled>
    );
}

const ResultContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 36vw;

    .top-container {
        flex: 0.4;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover; /* This ensures the image covers the entire container */
            object-position: center; /* This centers the image within the container */
        }
    }

    .middle-container {
        flex: 0.1;
        height: 100%;
        padding: 10px 50px;
    }

    .bottom-container {
        flex: 0.5;
        height: 100%;  
        display: flex;
        justify-content: center;
    }
`;

export default ResultContent;
