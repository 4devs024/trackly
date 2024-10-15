import styled from "styled-components"
import { useState } from "react";

import { useAddBusContext } from "../../../../contexts/driver/AddBusContext";

import Button from '../../../button/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleChevronLeft, faRoute, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import Popup from "../../../popup/Popup";
import ScheduleInput from "../../../schedule/ScheduleInput";
import SelectBusRouteForm from "./sub-form/select-route-form/SelectBusRouteForm";




const AddBusFormThree = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isMapVisible, setIsMapVisible] = useState(false);

    const [departure, setDeparture] = useState(null);
    const [arrival, setArrival] = useState(null);
  
    const handleOpenPopup = (e) => {
      setIsPopupOpen(true);
    };
  
    const handleAddRouteClick = (e) => {
        setIsPopupOpen(true);
        setIsMapVisible(true);
    };
  
    const handleClosePopup = (e) => {
        setIsPopupOpen(false);
        setIsMapVisible(false);
    };


    const {
        prevStep,
        handleSubmit,
        endPlaces
    } = useAddBusContext();

    const handleMapClick = (e) => {
        e.preventDefault();
        if (!departure) {
          setDeparture({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        } else if (!arrival) {
          setArrival({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        } else {
          setDeparture({ lat: e.latLng.lat(), lng: e.latLng.lng() });
          setArrival(null);
        }
      };
  
  


    return(
        <AddBusFormThreeStyled>
            <div className="upper-layer">
                <h2>Route details</h2>
                <hr />
                <br />
            </div>

            <div className="bottom-layer">
                <div className="inner-layer">
                    <div className="form-group">
                        <Button
                            name="Select your route"
                            bgColor="var(--blue-light)"
                            color="var(--first-color)"
                            bRad="20px"
                            bPad="0.2em"
                            icon={<FontAwesomeIcon icon={faRoute} />}
                            onClick={handleAddRouteClick}
                            width="100%"
                            hoverBgColor="var(--yello-light)"
                        />
                    </div>
                    <div className="form-group">
                        <Button
                            name="Input your bus schedule"
                            bgColor="var(--fifth-color)"
                            color="var(--first-color)"
                            bRad="20px"
                            bPad="0.2em"
                            icon={<FontAwesomeIcon icon={faCalendarDays} />}
                            onClick={handleOpenPopup}
                            width="100%"
                            hoverBgColor="var(--yello-dark)"
                        />
                    </div>
                    <div className="button-container">
                        <Button 
                            name="Back"
                            bgColor="var(--first-color)"
                            color="var(--fifth-color)"
                            bRad="20px"
                            onClick={prevStep}
                            icon={<FontAwesomeIcon icon={faCircleChevronLeft} />}
                            hoverBgColor="var(--fifth-color)"
                            hoverColor="var(--first-color)"
                            bPad="0.5em"
                        />
                        <Button 
                            name="Submit"
                            bgColor="var(--success-light)"
                            color="var(--fifth-color)"
                            bRad="20px"
                            onClick={handleSubmit}
                            hoverBgColor="var(--success-dark)"
                            hoverColor="var(--first-color)"
                            icon={<FontAwesomeIcon icon={faCircleCheck} />}
                            bPad="0.5em"
                        />
                    </div>
                    <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                        {isMapVisible ? <SelectBusRouteForm onClick={handleMapClick} departure={departure} arrival={arrival} /> : <ScheduleInput />}
                    </Popup>

                </div>
            </div>       
        </AddBusFormThreeStyled>
    )
}

const AddBusFormThreeStyled = styled.div`

    display: flex;
    flex-direction: column;
    height: 100%;

    .upper-layer{
        flex: 0.1;
    }

    .bottom-layer{
        flex: 0.9;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;    

        overflow-y: scroll;

        &::-webkit-scrollbar {
            width: 8px; /* Set the width of the scrollbar */
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1; /* Background of the scrollbar track */
            border-radius: 10px; /* Rounded corners for the track */
        }

        &::-webkit-scrollbar-thumb {
            background: #888; /* Color of the scrollbar thumb */
            border-radius: 10px; /* Rounded corners for the thumb */
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #555; /* Color of the scrollbar thumb on hover */
        }


        

        .inner-layer{
            width: 75%;


            .form-group {
                margin-bottom: 20px;
                text-align: left;
                font-weight: bold;
                }

                .form-group label {
                display: block;
                margin-bottom: 5px;
                color: black; /* Changed to white */
                }

                .form-group select,
                .form-group input[type="text"],
                .form-group input[type="number"],
                .form-group input[type="tel"],
                .form-group input[type="file"] {
                width: 100%;
                padding: 10px;
                border: 1px solid #000;
                border-radius: 5px;
                box-sizing: border-box;
                color: #524343;
                font-size: 86%;
            }

            .button-container{
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
        }
    }

`;

export default AddBusFormThree;