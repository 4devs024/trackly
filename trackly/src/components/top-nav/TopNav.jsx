//src/components/nav-bar/Navbar.jsx

import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


import { usePanelControlContext } from '../../contexts/global/PanelControlContext';

import EndPosInput from '../input-field/EndPosInput';
import Tabs from './Tabs';

const TopNav = () => {


  const{
    toggleSideNav,
    isTopNavVisible
  } = usePanelControlContext();


  return (
    <NavbarStyled>
      <div className="icon">
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
      </div>
      <div className="input-area">
        <EndPosInput 
          bgColor='white'
          color='black'
          height='48px'
          bRadius='20px'
          padding='0 10px'
          width='100%'
        />
      </div>
    </NavbarStyled>
    
    );
}

const NavbarStyled = styled.div`
    width: 36vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 8px;

    .icon{
      flex: 0.2;
    }

    .input-area{
      flex: 0.8;
    }
    .three-lines:hover{
        cursor:pointer;
        transform: translateY(-2px); 
        transition: 0.2s;
    }
`;

export default TopNav;
