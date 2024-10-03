import './driver.css';


import ScheduleInput from '../../../components/schedule/ScheduleInput';
import Popup from '../../../components/popup/Popup';
import Button from '../../../components/button/Button';
import MapComponent from '../../../components/map/MapComponent';
import DriverRouteSelect from '../../../components/map/driver-schedule-select-map/DriverRouteSelect';

import { useState } from 'react';

const Driver = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isMapVisible, setIsMapVisible] = useState(false);

    const [departure, setDeparture] = useState(null);
    const [arrival, setArrival] = useState(null);
  
    const handleOpenPopup = (e) => {
      e.preventDefault(); // Prevent form submission
      setIsPopupOpen(true);
    };
  
    const handleAddRouteClick = () => {
      setIsPopupOpen(true);
      setIsMapVisible(true);
    };
  
    const handleClosePopup = () => {
      setIsPopupOpen(false);
      setIsMapVisible(false);
    };

    const handleMapClick = (e) => {
        if (!departure) {
          setDeparture({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        } else if (!arrival) {
          setArrival({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        } else {
          setDeparture({ lat: e.latLng.lat(), lng: e.latLng.lng() });
          setArrival(null);
        }
      };
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [busId, setBusId] = useState('');
    const [route, setRoute] = useState('');
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [driverId, setDriverId] = useState(null);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic
    };
  
    return (
      <div className='driver-container'>
        <form className='driver-sign-up-form' onSubmit={handleSubmit}>
          <div className="input-control">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-control">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-control">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-control">
            <input
              type="text"
              placeholder="Bus ID"
              value={busId}
              onChange={(e) => setBusId(e.target.value)}
            />
          </div>
          <Button
            name={'+Add Route'}
            bg={'var(--fifth-color)'}
            bRad={'30px'}
            color={'var(--first-color)'}
            bPad={'0.5rem 4rem'}
            onClick={handleAddRouteClick}
          />
          <Button
            name={'+Add Schedule'}
            bg={'var(--fifth-color)'}
            bRad={'30px'}
            color={'var(--first-color)'}
            bPad={'0.5rem 4rem'}
            onClick={handleOpenPopup}
          />
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
            {isMapVisible ? <DriverRouteSelect onClick={handleMapClick} departure={departure} arrival={arrival} /> : <ScheduleInput />}
            </Popup>
            <br />
            <button type="submit">Register</button>
        </form>
      </div>
    );
  };
  
  export default Driver;