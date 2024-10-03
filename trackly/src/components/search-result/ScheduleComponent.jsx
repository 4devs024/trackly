import React, { useState } from 'react';
import styled from 'styled-components';

import { useScheduleContext } from "../../contexts/schedule/ScheduleContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faLocationDot, 
    faPersonWalking, 
    faCircleDot, 
    faEllipsisVertical,
    faAngleRight,
    faAngleDown,
    faBus 
} from "@fortawesome/free-solid-svg-icons";

const ScheduleComponent = () => {
    const { schedules } = useScheduleContext();
    const [expandedSchedule, setExpandedSchedule] = useState(null);

    const expandSchedule = (index) => {
        setExpandedSchedule(expandedSchedule === index ? null : index);
    }

    const renderSchedules = (schedules) => {
        return schedules.map((route, routeIndex) => (
            route.legs.map((leg, legIndex) => {
                const icons = [];
                const departurePlace = leg.steps[1].transit.departure_stop.name;
                const departureTime = new Date(leg.steps[1].transit.departure_time.value).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Asia/Colombo',
                    hour12: true
                });
                const arrivalTime = new Date(leg.arrival_time.value).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Asia/Colombo',
                    hour12: true
                });

                leg.steps.forEach((step) => {
                    if (step.travel_mode === 'WALKING') {
                        icons.push(faPersonWalking);
                    } else if (step.travel_mode === 'TRANSIT' && step.transit.line.vehicle.type === 'BUS') {
                        icons.push(faBus);
                    }
                });

                const isExpanded = expandedSchedule === `${routeIndex}`;

                return (
                    <div key={`${routeIndex}`} className={`schedule ${isExpanded ? 'expanded' : ''}`}>
                        <div className="icons">
                            <div className="transit-icons">
                                {icons.map((icon, iconIndex) => {
                                    return(
                                        <div key={iconIndex}>
                                            <FontAwesomeIcon icon={icon} style={{paddingRight: '10px'}} />
                                            {iconIndex !== icons.length-1 ? <FontAwesomeIcon icon={faAngleRight} style={{paddingRight: '10px'}}/> : <></>}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="toggle-icon" onClick={() => expandSchedule(`${routeIndex}`)}>
                                <FontAwesomeIcon icon={faAngleDown} className={`down-arrow ${isExpanded ? 'expanded' : ''}`}/>
                            </div>
                        </div>
                        <div className="schedule-details">
                            {/* <div className="left">
                                <FontAwesomeIcon icon={faCircleDot} style={{paddingBottom: '10px'}}/>
                                <FontAwesomeIcon icon={faEllipsisVertical}/>
                                <FontAwesomeIcon icon={faEllipsisVertical} style={{paddingBottom: '10px'}}/>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <div className="right">
                                <p>{departureTime} from {departurePlace}</p>
                                <p>{arrivalTime}</p>
                            </div> */}
                            <div className="row">
                                <FontAwesomeIcon icon={faCircleDot} style={{paddingBottom: '10px'}}/>
                                <p>{departureTime} from {departurePlace}</p>
                            </div>
                        </div>
                    </div>
                );
            })
        ));
    };

    return (
        <ScheduleComponentStyled>
            <div>
                {schedules && schedules.length > 0 ? (renderSchedules(schedules)) : (<p>No schedule available</p>)}
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
        height: 120px;

        &.expanded {
            height: 200px; /* Adjust this to the desired expanded height */
        }

        &:hover{
            cursor: pointer;
            transform: translateY(-2px); 
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.4);
        }

        .icons {
            display: flex;
            flex-direction: row;
            width: 100%;

            .transit-icons {
                flex: 0.9;
                display: flex;
                flex-direction: row;

                
            }

            .toggle-icon {
                flex: 0.1;
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

                .down-arrow{
                    transition: 0.2s;

                    &.expanded{
                        transform: rotate(180deg);
                    }
                
                }

            }
        }

        .schedule-details {
            display: flex;
            flex-direction: row;
            height: 100%;

            // .left{
            //     display: flex;
            //     flex-direction: column;
            // }
            // .right {
            //     width: 100%;
            //     display: flex;
            //     flex-direction: column;
            //     padding-left: 10px;
            //     justify-content: space-between;
            // }

            .row {
                display: flex;
                flex-direction: row;
                border: 1px solid red;
            }
        }
    }
`;

export default ScheduleComponent;
