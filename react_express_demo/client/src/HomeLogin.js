import React from "react";
import "./Home.css"
import Login from "./Login.js";
import "./HomeLogin.css";
import { Button } from 'react-bootstrap';

 


function HomeLogin (props) {

    // const test = () => {
    //     console.log(props.data);
    // }

    function routeToLogin() {
        window.location.href = "http://localhost:3000/login";
    }

    function routeToRegister() {
        window.location.href = "http://localhost:3000/register";
    }

return (
        <div className = "site-container">
            <div className='flex-container no-gap'>
                <div className='flex-item flex-col-1_2 login-page-left-col'>
                    <div className='flex-container flex-center-v flex-center-h p-around-m flex-d-col full-height'>
                        <div>
                            <div className='login-logo-img-container'>
                                <img className ="logo-img" src={ require('./images/logo_penguin.png') } />
                            </div>
                        </div>
                        <div className="home-description">
                            <div className='m-bottom-m border-bottom-s'>
                                <h1 className = "site-header">
                                    Your Very Own Self-Diagnosis Tool
                                </h1>
                            </div>
                            <div className = "home-summary">
                                Imperial Health can assist you with any health related issues you may be experiencing.
                                Get a list of all possible issues based on your symptoms, including accuracy ratings. Save your results for later use and find local specialists that cater to your needs.
                                Discover appropiate home remedies, over-the-counter medications, specialists, and more. Click below to get started!
                            </div>

                            <div className="home-button-container">
                                <Button onClick={routeToLogin} className="button-brand home-btn" variant="primary">Sign In</Button>
                                <Button onClick={routeToRegister} className="button-brand home-btn" variant="primary">Sign Up</Button>
                            </div>
                        </div>
                    </div>
                </div>

              
            </div> 
        </div>
)

}

export default HomeLogin;