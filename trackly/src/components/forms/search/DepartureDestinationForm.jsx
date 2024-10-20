//src/components/forms/DepartureDestinationForm.jsx

import styled from "styled-components"

import EndPosInput from "../../input-field/EndPosInput";
import StartPosInput from "../../input-field/StartPosInput";
import Button from "../../button/Button";

import { useLocationSearchContext } from "../../../contexts/location/LocationSearchContext";
import { useScheduleContext } from "../../../contexts/schedule/ScheduleContext";


export default function DepartureDestinationForm() {

    const { startPosition, endPosition, directionsService } = useLocationSearchContext();
    const { setReferences } = useScheduleContext();


    const handleSubmit = e => {
        e.preventDefault();
    }


    return (
        <DepartureDestinationFormStyled onSubmit={handleSubmit}>
            <StartPosInput 
                bgColor='white'
                color='black'
                height='48px'
                bRadius='20px'
                padding='0 10px'
                width='100%'
            />
            <EndPosInput 
                bgColor='white'
                color='black'
                height='48px'
                bRadius='20px'
                padding='0 10px'
                width='100%'
            />
            <Button 
                name='Show schedules'
                bgColor='var(--blue-light)'
                hoverBgColor='var(--blue-dark)'
                bRad='20px'
                color='white'
                height='40px'
                onClick={() => setReferences(startPosition, endPosition, directionsService)}
            />
        </DepartureDestinationFormStyled>
    )
}

const DepartureDestinationFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 1em;

`;



