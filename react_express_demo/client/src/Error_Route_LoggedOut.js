import React from "react";
import "./Error_Route_LoggedOut.css";
import { Button } from 'react-bootstrap';


function Error_Route_LoggedOut () {

    function routeToLogin() {
        window.location.href = "http://localhost:3000/login";
    }

    
    return (
        <div className = "site-body">
            <div className = "container">
                <div className = "wrapper">
                <h4><img className = "err_image" src={ require('./images/error_penguin.png') } /></h4>
                 <h3 className = "header"> You are not logged in!</h3>

                    <div className = "route_to_login">
                        <i><h4 className = "login_redirect2">Click here to login</h4></i>
                        <Button onClick={routeToLogin} className = "redirect_login" variant="success">Redirect</Button>{' '}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Error_Route_LoggedOut;