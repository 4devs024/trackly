import { Autocomplete } from "@react-google-maps/api";
import styled from "styled-components"
import { useEffect } from "react";

import { useLocationSearchContext } from "../../contexts/location/LocationSearchContext";
import { usePanelControlContext } from "../../contexts/global/PanelControlContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";




const StartPosInput = ({height, bgColor, color, padding, margin, bRadius, width}) => {

    const {
        autocompleteStart,
        setStartPosition,
        setStartPositionName,
        onLoadStartAutocomplete,
        onPlaceChanged,
        setUserLocation
    } = useLocationSearchContext();

    const handleEndInput = e => {
        setStartPositionName(e.target.value);
    }    
    
    return(
        <StartPosInputStyled 
            style={{
                backgroundColor: bgColor,
                borderRadius: bRadius,
                padding: padding,
                margin: margin,
                height: height,
                color: color,
                width: width
            }}
        >
            <div className="icon" style={{flex:'0.1'}}>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ margin:'0 10px' }}/>
            </div>
            <div className="input-field" style={{flex:'0.8'}}>
                <Autocomplete
                    onLoad={onLoadStartAutocomplete}
                    onPlaceChanged={() => onPlaceChanged(autocompleteStart, setStartPosition, setStartPositionName)} 
                >
                    <input 
                        type="search" 
                        placeholder='Search here'
                        onChange={handleEndInput}
                        
                    />
                </Autocomplete>
            </div>
            <div className="button" style={{flex:'0.1'}}>
                <button onClick={setUserLocation}>Locate Me</button>
            </div>
        </StartPosInputStyled>
    )

}

const StartPosInputStyled = styled.div`
    display: flex;
    align-items: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    box-sizing: border-box;

    .input-field{

    }
    .icon{

    }
    .button{
    
    }

    input {
        outline: none;
        border: none;
        width: 100%;
    }

    button {
        background-color: var(--fifth-color);
        color: white;
        border: none;
        border-radius: 20px;
        padding: 10px 15px;
        font-size: 14px;
        height: 40px; /* Match the height of the input fields */
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        white-space: nowrap; /* Prevent text from wrapping */
        transition: background-color 0.2s, transform 0.1s;

        &:hover {
            background-color: var(--fifth-color-dark); /* Use a darker shade for hover */
            transform: translateY(-2px); /* Slight lift effect on hover */
            color: black;
        }

        &:active {
            background-color: var(--fifth-color-darker); /* Even darker shade for active state */
            transform: translateY(0); /* Remove lift effect on click */
        }
    }
`;

export default StartPosInput;