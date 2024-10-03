import './signup.css'
import logo from '../../assets/images/logo_black.png'

import { useState } from 'react'
import Button from '../../components/button/Button'

import { Link } from "react-router-dom";



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'


const SocialMedia = [
    {
        id: 1,
        description: 'Signup using Google',
        icon: <FontAwesomeIcon icon={faGoogle} />
    },
    {
        id: 2,
        description: 'Signup using Facebook',
        icon: <FontAwesomeIcon icon={faFacebook} />
    }
]



export default function Login(){

    return(
        <div className="login-container">
            <div className="login-container-inner">
                <div className="logo-container">
                    <img src={logo} alt="trackly logo black" />
                </div>
                <div className="login-content">
                    <span style={{fontSize: "24px", fontWeight: 'bold', textAlign: 'center', margin: '8px 0 8px 0'}}>Sign Up</span>
                    <div className="horizontal-line"></div>
                    <div className="form-container">
                        <form className="login-form">
                            <div className="input-control">
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                />
                            </div>
                            <div className="input-control">
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                />
                            </div>
                            <div className="input-control">
                                <input
                                    type="password"
                                    placeholder="Re-enter password"
                                />
                            </div>
                            <div className="submit-button">
                                {/* <Link to="/home">
                                    <Button
                                        name={'Login'}
                                        bg={'var(--fifth-color)'}
                                        bRad={'30px'}
                                        icon={<FontAwesomeIcon icon={faRightToBracket} />}
                                        color={'var(--first-color)'}
                                        bPad={'0.5rem 4rem'}
                                    />
                                </Link> */}
                                <Button
                                    name={'Sign up'}
                                    bg={'var(--fifth-color)'}
                                    bRad={'30px'}
                                    icon={<FontAwesomeIcon icon={faRightToBracket} />}
                                    color={'var(--first-color)'}
                                    bPad={'0.5rem 4rem'}
                                />
                            </div>
                            <Link to="/login" style={{textDecoration:'none'}}>
                                <span>Already have an account ?</span>
                            </Link>
                        </form>
                    </div>
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
            </div>
        </div>
    )
}