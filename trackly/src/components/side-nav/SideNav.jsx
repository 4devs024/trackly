import styled from "styled-components"

import logo from '../../assets/images/logo_black.png'

import { usePanelControlContext } from "../../contexts/global/PanelControlContext"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStore, faBus} from "@fortawesome/free-solid-svg-icons";





const SideNav = () => {

    const {
        isSideNavOpen,
        toggleSideNav
    } = usePanelControlContext();

    return(
        <SideNavStyled className={`${isSideNavOpen ? 'open': ''}`}>
            <div className="left-panel">
                <div className="top">
                    <div className="logo">
                        <img src={logo} alt="Trackly logo" />
                    </div>
                    <span className="closebtn" onClick={toggleSideNav}>&times;</span>
                </div>
                <div className="content">
                    <div className="inner-content">
                        <div className="icon">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className="tag">
                            <span><a href="/profile" target="_blank">Profile</a></span>
                        </div>
                    </div>
                    <div className="inner-content">
                        <div className="icon">
                            <FontAwesomeIcon icon={faBus} />
                        </div>
                        <div className="tag">
                            <span><a href="/add-bus" target="_blank">Add your bus</a></span>
                        </div>
                    </div>
                    <div className="inner-content">
                        <div className="icon">
                            <FontAwesomeIcon icon={faStore} />
                        </div>
                        <div className="tag">
                            <span><a href="/" target="_blank">Market your business</a></span>
                        </div>
                    </div>                    
                </div>
                <div className="bottom-content">
                    <div className="inner-content">
                        <span>About us</span>
                    </div>
                    <div className="inner-content">
                        <span>Contact us</span>
                    </div>
                </div>
            </div>
            <div className="right-panel" onClick={toggleSideNav}>
            </div>
        </SideNavStyled>
    )

}

const SideNavStyled = styled.div`
    height: 100%;
    width: 100vw;
    left: -100vw;
    position: fixed;
    z-index: 10000;
    top: 0;
    overflow-x: hidden;
    transition: 0.2s ease-in;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);

    display: flex;
    flex-direction: row;


    &.open {
        left: 0;
    }

    .left-panel {
        width: 32vw;
        background-color: var(--first-color);
        display: flex;
        flex-direction: column;

        .top{
            flex: 0.1;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .logo img{
                height: 80px;
            }

            span{
                text-decoration: none;
                font-size: 36px;
                color: var(--sixth-color);
                transition: 0.3s;
                position: relative;
                right: 16px;
                top: 8px;
            
            }

            span:hover {
                color: var(--fifth-color);
                cursor: pointer;
            }
        }

        .content {
            flex: 0.7;
            display:flex;
            flex-direction: column;
            align-items:center;
            .inner-content {
                margin-top: 1em;
                width: 60%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                transition: 0.2s;

                .icon{
                    flex: 0.2;
                }

                .tag{
                    flex: 0.8;

                    }

                &:hover{
                    color: var(--sixth-color);
                    transform: translateY(-2px);
                    cursor: pointer;
                }

                &:active{
                    color: var(--fifth-color);
                    transform: translateY(0);
                }

                a {
                    color: var(--fifth-color);

                    &:hover{
                    color: var(--sixth-color) !important;
                    transform: translateY(-2px);
                    cursor: pointer;
                    transition: 0.2s;
                    }

                    &:active{
                        color: var(--fifth-color) !important;
                        transform: translateY(0);
                    }

                    &:visited{
                        color: var(--fifth-color);
                    }
                }

                


                    

            }

        }

        .bottom-content{
            flex: 0.2;
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 0.5em;

            .inner-content{
                display: flex;
                align-items: center;
                transition: 0.2s;

                &:hover{
                    color: var(--sixth-color);
                    transform: translateY(-2px);
                    cursor: pointer;
                }

                &:active{
                    color: var(--fifth-color);
                    transform: translateY(0);
                }

            }

        }
    }

    .right-panel {
        width: calc(100vw - 32vw);
        background-color: rgba(0,0,0, 0.2);
    }




`;

export default SideNav;