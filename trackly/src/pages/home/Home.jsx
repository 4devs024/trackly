import styled from 'styled-components';


import TopNav from '../../components/top-nav/TopNav';
import ResultBar from '../../components/search-result/ResultBar';
import MapComponent from '../../components/map/MapComponent';
import ProfileImg from '../../components/top-nav/ProfileImg';
import Tabs from '../../components/top-nav/Tabs';
import SideNav from '../../components/side-nav/SideNav';

import { LocationSearchProvider } from '../../contexts/location/LocationSearchContext';
import { ScheduleProvider } from '../../contexts/schedule/ScheduleContext';

import { usePanelControlContext } from '../../contexts/global/PanelControlContext';



export default function Home() {

    const {
        showResultBar,
        isScheduleAsked
    } = usePanelControlContext();

    return (
        <LocationSearchProvider>
            <HomeStyled>
                <SideNav />
                <div className="main-content">
                    {!isScheduleAsked && <div className="nav-bar"><TopNav /></div>}
                    <div className="map-container"><MapComponent /></div>
                    {
                        showResultBar && 
                        <div className="result-container">
                            <ScheduleProvider>
                                <ResultBar />
                            </ScheduleProvider>
                        </div>
                    }
                </div>
                <ProfileImg />
                {!isScheduleAsked && <Tabs />}
            </HomeStyled>
        </LocationSearchProvider>
    );
}

const HomeStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 0;


    .main-content {
        height: 100vh;
        width: 100vw;
        transition: margin-left 0.5s;
    }

    .main-content .nav-bar{
        position: fixed;
        z-index:1000;
    }

    .main-content .map-container{
        height: 100vh;
        width: 100vw;
        z-index: 0;
    }
        
    .main-content .result-container{
        z-index: 4000;
    }


`;
