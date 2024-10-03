import styled from "styled-components"

import { useAddBusContext } from "../../../contexts/driver/AddBusContext";

import Button from '../../button/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";


const AddBusFormOne = () => {

    const {
        formData,
        handleChange,
        nextStep
    } = useAddBusContext();

    return(
        <AddBusFormOneStyled>
            <div className="upper-layer">
                <h2>Personal / Company details</h2>
                <hr />
                <br />
            </div>
            <div className="bottom-layer">
                <div className="inner-layer">
                    <div className="form-group">
                        <label>
                            Enter your first name:
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Enter your second name:
                            <input
                                type="text"
                                name="secondName"
                                placeholder="Second name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Enter your phone number:
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="button-container">
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
        </AddBusFormOneStyled>
    )
}

const AddBusFormOneStyled = styled.form`

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
                display: flex;
                justify-content: flex-end;
                flex-direction: row;
            }
        }
    }


`;

export default AddBusFormOne;