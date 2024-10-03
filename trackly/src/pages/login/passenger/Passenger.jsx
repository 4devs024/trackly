import './passenger.css'

import { Link } from "react-router-dom";

import Button from '../../../components/button/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'

// import { useGoogleLogin } from '@react-oauth/google';

const SocialMedia = [
    {
        id: 1,
        description: 'Log in using Google',
        icon: <FontAwesomeIcon icon={faGoogle} />
    },
    {
        id: 2,
        description: 'Log in using Facebook',
        icon: <FontAwesomeIcon icon={faFacebook} />
    }
]

export default function Passenger(){
    return(
        <div className="passenger-container">
            <form className="passenger-login-form">
                <div className="input-control">
                    <input
                        type="text"
                        placeholder="Username"
                    />
                </div>
                <div className="input-control">
                    <input
                        type="text"
                        placeholder="Password"
                    />
                </div>
                <span>Forgot Password?</span>
                <div className="submit-button">
                    <Link to="/home">
                        <Button
                            name={'Login'}
                            bg={'var(--fifth-color)'}
                            bRad={'30px'}
                            icon={<FontAwesomeIcon icon={faRightToBracket} />}
                            color={'var(--first-color)'}
                            bPad={'0.5rem 4rem'}
                        />
                    </Link>
                </div>
            </form>
            <div className="horizontal-line"></div>
            <div className="bottom-container">
                {SocialMedia.map((item) =>{
                    return(
                        <div className='social-media'>
                            <i>{item.icon}</i>
                            <span>{item.description}</span>
                        </div>
                    )
                })}
            </div>
            <div className="footer">
                <span style={{fontSize: '12px'}}>&#169;All rights reserved</span>
            </div>
        </div>
    );
}