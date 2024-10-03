import { Autocomplete } from "@react-google-maps/api";
import styled from "styled-components"
import { useEffect } from "react";

import { useLocationSearchContext } from "../../contexts/location/LocationSearchContext";
import { usePanelControlContext } from "../../contexts/global/PanelControlContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";




const EndPosInput = ({height, bgColor, color, padding, margin, bRadius, width}) => {

    const {
        autocompleteEnd,
        setEndPosition,
        setEndPositionName,
        onLoadEndAutocomplete,
        onPlaceChanged,
        endPositionName,
        endPosition
    } = useLocationSearchContext();

    const {
        setResultBarVisibility,
        setIsResultOpen,
    } = usePanelControlContext();

    const handleEndInput = e => {
        setEndPositionName(e.target.value);
    }
    
    useEffect(() => {
        if(endPosition === null || endPositionName ===''){
            setResultBarVisibility(false);
            setIsResultOpen(true);
        }else{
            setResultBarVisibility(true);
        }
    },[endPosition, endPositionName])
    
    
    return(
        <EndPosInputStyled 
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
            <div className="input-field" style={{flex:'0.9'}}>
                <Autocomplete
                    onLoad={onLoadEndAutocomplete}
                    onPlaceChanged={() => onPlaceChanged(autocompleteEnd, setEndPosition, setEndPositionName)} 
                >
                    <input 
                        type="search" 
                        placeholder='Search here'
                        value={endPositionName}
                        onChange={handleEndInput}
                        
                    />
                </Autocomplete>
            </div>
        </EndPosInputStyled>
    )

}

const EndPosInputStyled = styled.div`
    display: flex;
    align-items: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    box-sizing: border-box;

    input {
        outline: none;
        border: none;
        width: 100%;
    }
`;

export default EndPosInput;