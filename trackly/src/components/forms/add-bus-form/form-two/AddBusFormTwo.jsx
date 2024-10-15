import styled from "styled-components"

import { useAddBusContext } from "../../../../contexts/driver/AddBusContext";

import Button from '../../../button/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";



const AddBusFormTwo = () => {
    
    const {
        formData,
        handleChange,
        prevStep,
        nextStep,
        vehicleNumber,
        setVehicleNumber
    } = useAddBusContext();

    return(
        <AddBusFormTwoStyled>
            <div className="upper-layer">
                <h2>Vehicle details</h2>
                <hr />
                <br />
            </div>
            <div className="bottom-layer">
                <div className="inner-layer">
                    <div className="form-group">
                        <label>
                            Enter your vehicle number:
                            <input
                                type="text"
                                name="vehicleNumber"
                                placeholder="Vehicle Number"
                                value={vehicleNumber}
                                onChange={e => setVehicleNumber(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Insert the vehicle registration documentation:
                            <input 
                                type="file"
                                placeholder="Front image of the vehicle" 
                                name="frontImageOfTheVehicle"
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Insert a front image of your vehicle:
                            <input 
                                type="file"
                                placeholder="Front image of the vehicle" 
                                name="frontImageOfTheVehicle"
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Insert a side image of the vehicle:
                            <input 
                                type="file"
                                placeholder="Side image of the vehicle" 
                                name="sideImageOfTheVehicle"
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Insert a backside image of the vehicle:
                            <input 
                                type="file"
                                placeholder="Backside image of the vehicle" 
                                name="backsideImageOfTheVehicle"
                            />
                        </label>
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
                            name="Next"
                            bgColor="var(--fifth-color)"
                            color="var(--first-color)"
                            bRad="20px"
                            onClick={nextStep}
                            hoverBgColor="var(--first-color)"
                            hoverColor="var(--fifth-color)"
                            icon={<FontAwesomeIcon icon={faCircleChevronRight} />}
                            bPad="0.5em"
                        />
                    </div>
                </div>
            </div>
        </AddBusFormTwoStyled>
    )
}

const AddBusFormTwoStyled = styled.div`

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

export default AddBusFormTwo;