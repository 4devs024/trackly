import styled from "styled-components";

import DepartureDestinationForm from "../forms/search/DepartureDestinationForm";
import ScheduleComponent from "./ScheduleComponent";

import { usePanelControlContext } from "../../contexts/global/PanelControlContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const BusScheduleLayer = () => {

    const {
        setScheduleVisibility,
        toggleSideNav
    } = usePanelControlContext();

    return(
        <BusScheduleLayerStyled>
            <div className="top">
                <div className="three-lines" 
                    style={{
                        backgroundColor:'white', 
                        borderRadius:'50%', 
                        width:'48px', 
                        height:'48px', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                    }}
                >
                    <FontAwesomeIcon icon={faBars} onClick={toggleSideNav} style={{ fontSize:'24px' }}/>
                </div>
                <span 
                    className="closebtn" 
                    onClick={() => setScheduleVisibility(false)}
                    
                >&times;</span>
            </div>
            <div className="form">
                <DepartureDestinationForm />
            </div>
            <br />
            <div className="schedule-layer">
                <ScheduleComponent />
            </div>

        </BusScheduleLayerStyled>
    
    );
}

const BusScheduleLayerStyled = styled.div`
    height: 100vh;
    weight: 40vw;
    background-color: white;
    display: flex;
    flex-direction: column;

    .top {
        flex: 0.1;
    }

    .top .closebtn{
        text-decoration: none;
        font-size: 36px;
        color: #818181;
        transition: 0.2s;
        position: absolute;
        right: 16px;
        top: 8px;
        
    }

    .top .closebtn:hover {
        color: var(--fifth-color);
        cursor: pointer;
    }

    .top .three-lines {
        text-decoration: none;
        transition: 0.2s;
        position: absolute;
        left: 8px;
        top: 8px;
    }

    .top .three-lines:hover{
        cursor:pointer;
        transform: translateY(-2px); 
    }

    .form{
        flex: 0.2;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .schedule-layer{
        flex: 0.7;
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
    }


`;


export default BusScheduleLayer;