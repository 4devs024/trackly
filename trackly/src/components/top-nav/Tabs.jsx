import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faMugHot, faShirt, faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons';

const Tabs = () => {

    return(
    <TabsStyled>
      <div className="tabs">
        <FontAwesomeIcon icon={faBurger} style={{ margin:'0 8px' }}/>
        <span>Foods</span>
      </div>
      <div className="tabs">
        <FontAwesomeIcon icon={faMugHot} style={{ margin:'0 8px' }}/>
        <span>Drinks</span>
      </div>
      <div className="tabs">
        <FontAwesomeIcon icon={faShirt} style={{ margin:'0 8px' }}/>
        <span>Clothes</span>
      </div>
      <div className="tabs">
        <FontAwesomeIcon icon={faPrescriptionBottleMedical} style={{ margin:'0 8px' }} />
        <span>Pharmacies</span>
      </div>
    </TabsStyled>
    )
}

const TabsStyled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 568px;
    padding: 16px;
    box-sizing: border-box;
    z-index: 2000;
    position: absolute;
    left: calc(36vw + 16px);

    .tabs{
        display:flex;
        justify-content: center;
        align-items: center;
        background-color: var(--first-color);
        padding: 0 16px;
        border-radius: 20px;
        height: 32px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        transition: 0.2s;

        &:hover{
          cursor: pointer;
          background-color: white;
          transform: translateY(-2px); 
        }

        &:active {
            transform: translateY(0); /* Remove lift effect on click */
        }
    }

    


`;

export default Tabs;