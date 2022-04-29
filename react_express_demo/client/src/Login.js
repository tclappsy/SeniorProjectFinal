import React, {useEffect, useState} from "react";
import axios from 'axios'
import "./Login.css";

import Home from "./Home.js";
import { Button } from 'react-bootstrap';


function Login(props) {


    const [username_login, setUsername_login] = useState('');
    const [password_login, setPassword_login] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [userSession, setUserSession] = useState(false);


    axios.defaults.withCredentials = true;
    
    const login = () => {
        axios.post('http://localhost:5000/login',{
            username: username_login,
            password:password_login
        }).then((response) => {

            //adds username to local storage (EXPIERMENTING WITH THIS) (key, object to be inserted)
            localStorage.setItem('Imperial Health Username', username_login);

                if(response.data.message) {
                    setLoginStatus(response.data.message);

                } else {
                    setLoginStatus('Welcome, ' + response.data[0].username)
                    
                    console.log("USER SESSION: ", userSession);
                    window.location.href = "http://localhost:3000/";
                }

            
            //FIRST LINE IN CONSOLE
            console.log(response);
            console.log("MESSAGE: " , response.data);

        });
    }
  
    useEffect(() => {
        axios.get("http://localhost:5000/login").then((response) =>  {
            if(response.data.loggedIn === true) {
                setLoginStatus("User logged in: " + '[' + response.data.user[0].username + ']');
                console.log('USER RESPONSE ' ,response);

            }
        })
    }, [])
   
    return (

        <div className = "site-contianer">
            <div className = "site-page">
        
            <div className = "flex-container flex-d-col flex-center-v">

                <div className = "flex-item">
                    <h3 className = "login-header">Sign In</h3>
                </div>
                    
                    <div className='flex-item'>
                        
                            <div>
                                <label className = "input-header">Username</label>
                                <input type = "text"  placeholder = "Enter username" onChange = {(e) =>{setUsername_login(e.target.value)}} />
                            </div>
                            
                            <br></br>

                            <div>
                                <label className = "input-header">Password</label>
                                <input type = "password" placeholder = "Enter password" onChange = {(e) =>{setPassword_login(e.target.value)}} />
                            </div>
                    </div>

                    <div className='flex-item text-a-center'>
                        <Button  onClick = {login} className = "login-button" variant="success">Sign In</Button>{' '}
                        <p className = "register-redirect">Dont have an account? Click <a href = "/register">Here</a> to get started!</p>

                        <div className = "status-wrapper">
                            <i><strong><h3 className = "login-status">{loginStatus}</h3></strong></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;