import React, {useEffect, useState} from "react";
import axios from 'axios'
import "./Logout.css"
import { Button } from 'react-bootstrap';




function Logout() {

    const [logoutStatus, setLogoutStatus] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    axios.defaults.withCredentials = true;

    const logout = () => {

        
        axios.get('http://localhost:5000/logout').then((response) => {

        console.log(response);
             //removes username from localstorage 
             localStorage.removeItem('Imperial Health Username');
 
             console.log('logout button clicked');
             console.log('LOGOUT RESPONSE', response);
 
             if(response.data.loggedIn === true) {
                 console.log('user is logged in');
                 console.log('LOGGED IN: ', response.data.loggedIn);
                 
             } else {
                 console.log('user is NOT logged in');
                 console.log('LOGGED IN: ', response.data.loggedIn);
                 setLogoutStatus(response.data.message);
 
                 window.location.href = "http://localhost:3000/login";
             }
        })
     }


     useEffect(() => {
        axios.get("http://localhost:5000/login").then((response) =>  {
            if(response.data.loggedIn === true) {
                setLoginStatus("User logged in: " + '[' + response.data.user[0].username + ']');
                console.log('USER RESPONSE ' ,response);
            }
        })
    }, [])

    return(
        
        <div className = "site-body">
            <div className = "container">
                <div className = "logout-message">
                    <h3>Are you sure you want to log out? </h3>
                    <Button onClick={logout} className = "button-brand" variant="primary">Logout</Button>{' '}
                    <p>{logoutStatus}</p>
                </div>
            </div>
        </div>

    )
}

export default Logout;