import React, { useState } from 'react';
import styled from 'styled-components';
import { useScheduleContext } from "../../contexts/schedule/ScheduleContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCircleDot,
    faAngleDown,
    faBus 
} from "@fortawesome/free-solid-svg-icons";
import { usePanelControlContext } from '../../contexts/global/PanelControlContext';

const ScheduleComponent = () => {
    const { schedule } = useScheduleContext();
    const [expandedSchedule, setExpandedSchedule] = useState(false);

    const toggleSchedule = () => {
        setExpandedSchedule(prev => !prev);
    }

    const {
        setIsRealTimeMapAsked
    } = usePanelControlContext();

    const renderScheduleDetails = () => {
        if (!schedule) return null;

        // Get today's date
        const today = new Date();
        const [departureHours, departureMinutes] = schedule.departureTime.split(':');
        const [arrivalHours, arrivalMinutes] = schedule.arrivalTime.split(':');

        // Create valid Date objects
        const departureTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), departureHours, departureMinutes);
        const arrivalTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), arrivalHours, arrivalMinutes);

        // Format time for display
        const formattedDepartureTime = departureTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Colombo',
            hour12: true
        });

        const formattedArrivalTime = arrivalTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Colombo',
            hour12: true
        });

        const departurePlace = schedule.departurePlace;

        return (
            <div className={`schedule ${expandedSchedule ? 'expanded' : ''}`}>
                <div className="icons" onClick={toggleSchedule}>
                    <div className="transit-icons">
                        <FontAwesomeIcon icon={faBus} style={{ paddingRight: '10px' }} />
                    </div>
                    <div className="toggle-icon">
                        <FontAwesomeIcon icon={faAngleDown} className={`down-arrow ${expandedSchedule ? 'expanded' : ''}`} />
                    </div>
                </div>
                <div className="schedule-details">
                    <div className="row">
                        <FontAwesomeIcon icon={faCircleDot} style={{ paddingBottom: '10px' }} />
                        <p>{formattedDepartureTime} from {departurePlace}</p>
                    </div>
                    {expandedSchedule && (
                        <div className="expanded-content">
                            <p>Arrival Time: {formattedArrivalTime}</p>
                            <SelectButton onClick={() => setIsRealTimeMapAsked(true)}>Select Schedule</SelectButton>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <ScheduleComponentStyled>
            <div>
                {schedule ? (renderScheduleDetails()) : (<p>No schedule available</p>)}
            </div>
        </ScheduleComponentStyled>
    );
}

const ScheduleComponentStyled = styled.div`
    height: auto;
    box-sizing: border-box;

    .schedule {
        margin: 10px;
        padding: 10px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        transition: 0.2s;
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow: hidden;
        height: auto;

        &:hover {
            cursor: pointer;
            transform: translateY(-2px);
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.4);
        }

        .icons {
            display: flex;
            flex-direction: row;
            width: 100%;

            .transit-icons {
                flex: 1;
                display: flex;
                flex-direction: row;
            }

            .toggle-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                transition: 0.2s;
                border-radius: 20px;

                &:hover {
                    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    transform: translateY(-2px);
                }

                .down-arrow {
                    transition: 0.2s;

                    &.expanded {
                        transform: rotate(180deg);
                    }
                }
            }
        }

        .schedule-details {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .row {
                display: flex;
                align-items: center;
                padding: 5px 0;
            }

            .expanded-content {
                margin-top: 10px;
                p {
                    margin: 5px 0;
                }
            }
        }
    }
`;

const SelectButton = styled.button`
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`;

export default ScheduleComponent;
