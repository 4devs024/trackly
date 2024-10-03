import styled from "styled-components";

import { useState } from "react";

import ResultContent from "./ResultContent";
import BusScheduleLayer from "./BusScheduleLayer";

import { usePanelControlContext } from "../../contexts/global/PanelControlContext";

const ResultBar = () => {

    const {
        isResultOpen,
        toggleResultSidebar,
        isScheduleAsked,
    } = usePanelControlContext();

    return(
    
    <ResultBarStyled>
        <div className={`sidebar ${isResultOpen ? 'open' : ''}`}>
            <div className="toggle-arrow" onClick={toggleResultSidebar}>
                {isResultOpen ? '<' : '>'}
            </div>
            <div className="sidebar-content">
                {isScheduleAsked ? <BusScheduleLayer/> : <ResultContent />}
            </div>
        </div>

    </ResultBarStyled>
    );
}


const ResultBarStyled = styled.div`

    .sidebar {
        height: 100%;
        width: 36vw;
        left: -36vw;
        position: fixed;
        top: 0;
        transition: 0.2s ease-in;
        background-color: var(--first-color);
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        
    }


    .sidebar.open {
        left: 0;
    }

    .sidebar-content {
    }

    .toggle-arrow {
        position: absolute;
        top: 50%;
        right: -20px; /* Width of the arrow */
        transform: translateY(-50%);
        background-color: var(--first-color);
        color: var(--fifth-color);
        width: 20px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 0 5px 5px 0;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    }

`;


export default ResultBar;



