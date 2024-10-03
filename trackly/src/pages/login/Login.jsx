// import './login.css'
// import logo from '../../assets/images/logo_black.png'

// import { useState } from 'react'

// import Passenger from './passenger/Passenger'
// import Driver from './driver/Driver'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPersonWalkingLuggage, faBus } from '@fortawesome/free-solid-svg-icons'

// const loginItem = [
//     {
//         id: 1,
//         description: "Passenger",
//         icon: <FontAwesomeIcon icon={faPersonWalkingLuggage} />,
//     },
//     {
//         id: 2,
//         description: "Driver",
//         icon: <FontAwesomeIcon icon={faBus} />,
//     }
// ]


// export default function Login(){

//     const [active, setActive] = useState(1);

//     const DisplayData = () => {
//         switch(active){
//             case 1: return <Passenger />
//             case 2: return <Driver />
//             default: return <Passenger />
//         }
//     }
    



//     return(
//         <div className="login-container">
//             <div className="login-container-inner">
//                 <div className="logo-container">
//                     <img src={logo} alt="trackly logo black" />
//                 </div>
//                 <div className="login-content">
//                     <span style={{fontSize: "24px", fontWeight: 'bold', textAlign: 'center', margin: '8px 0 8px 0'}}>Login</span>
//                     <div className="button-container">
//                         <div className="login-items">
//                             {loginItem.map((item) => {
//                                 return(<li
//                                     key={item.id}
//                                     onClick={() => setActive(item.id)}
//                                     className={active === item.id ? 'active' : ''}
//                                     >
//                                         <i>{item.icon}</i>
//                                         <span>{item.description}</span>
//                                     </li>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                     <div className="horizontal-line"></div>
//                     <div className="form-container">
//                         {DisplayData()}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


import './login.css'
import logo from '../../assets/images/logo_black.png'

import { useState } from 'react'
import Button from '../../components/button/Button'

import { Link } from "react-router-dom";



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'

// import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from '../../firebase.js';





export default function Login(){

    const SocialMedia = [
        {
            id: 1,
            description: 'Log in using Google',
            icon: <FontAwesomeIcon icon={faGoogle} />,
            // action: handleGoogleLogin
        },
        {
            id: 2,
            description: 'Log in using Facebook',
            icon: <FontAwesomeIcon icon={faFacebook} />,
            // action: handleGoogleLogin
        }
    ]
    

    // const handleGoogleLogin = async () => {
    //     try {
    //       await signInWithPopup(auth, googleProvider);
    //       // Redirect or handle login success
    //     } catch (error) {
    //       console.error("Error logging in with Google", error);
    //     }
    //   };

    // const handleSocialLogin = async (action) => {
    //     try {
    //       await action();
    //       // Handle successful login, e.g., redirect to home page
    //     } catch (error) {
    //       console.error("Error during social login", error);
    //     }
    //   };

    return(
        <div className="login-container">
            <div className="login-container-inner">
                <div className="logo-container">
                    <img src={logo} alt="trackly logo black" />
                </div>
                <div className="login-content">
                    <span style={{fontSize: "24px", fontWeight: 'bold', textAlign: 'center', margin: '8px 0 8px 0'}}>Login</span>
                    <div className="horizontal-line"></div>
                    <div className="form-container">
                        <form className="login-form">
                            <div className="input-control">
                                <input
                                    type="text"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="input-control">
                                <input
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                            <span>Forgot Password?</span>
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
                                    name={'Login'}
                                    bg={'var(--fifth-color)'}
                                    bRad={'30px'}
                                    icon={<FontAwesomeIcon icon={faRightToBracket} />}
                                    color={'var(--first-color)'}
                                    bPad={'0.5rem 4rem'}
                                />
                            </div>
                            <Link to="/signup" style={{textDecoration:'none'}}>
                                <span>Don't have an account ?</span>
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