import React from "react";
import { Button } from 'react-bootstrap';


function Error_Route_LoggedIn () {

    function routeToLogin() {
        window.location.href = "http://localhost:3000/home";
    }

    
    return (
        <div className = "site-body">
            <div className = "container">
                <div className = "wrapper">
                <h4><img className = "err_image" src={ require('./images/error_penguin.png') } /></h4>
                    <h3 className = "header">Error: this route does not exist!</h3>

                    <div className = "route_to_login">
                        <i><h4 className = "login_header">Click here to redirect</h4></i>
                        <Button onClick={routeToLogin} className = "redirect_login" variant="success">Redirect</Button>{' '}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Error_Route_LoggedIn;