import React, {useState} from "react";
import Axios, { axios } from 'axios'
import "./Register.css"
import { Button } from 'react-bootstrap';


function Register () {

    //need to grab info from username and password and validate it
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');

    const [registerStatus, setRegisterStatus] = useState('');

    const REGISTER_HANDLER = 'User Registered!';

    Axios.defaults.withCredentials = true;

    //function that sends username,passwrod data to backend
    const register = () => {
        Axios.post('http://localhost:5000/register',{
            email:email,
            username: username,
            password:password,
            age:age
        }).then((response) => {

            if(response.data.message === REGISTER_HANDLER) {
                //grabs message sent from back end to display in front end, populated in setRegisterStatus
                setRegisterStatus(response.data.message);
                console.log('registered!');
                window.location.href = "http://localhost:3000/login";
                
            } else {
                console.log('not registered');
                setRegisterStatus(response.data.message);
                
            }

            console.log('RESPONSE:', response);
        });
    }

    return (

        <div className = "site-contianer">
            <div className = "site-page">
        
            <div className = "flex-container flex-d-col flex-center-v">

                <div className = "flex-item">
                    <h3> Sign Up </h3>
                </div>
                    
                    <div className='flex-item'>
                        <div>
                             <label>Email</label>
                             <input type = "text" placeholder = "Enter email" onChange = {(e) =>{setEmail(e.target.value)}}></input>
                        </div>
                            
                        <br></br>

                        <div>
                            <label>Username</label>
                             <input type = "text" placeholder = "Enter username" onChange = {(e) =>{setUsername(e.target.value)}}></input>
                         </div>
                         
                         <br />

                         <div>
                            <label>Password</label>
                             <input type = "password" placeholder = "Enter password" onChange = {(e) =>{setPassword(e.target.value)}}></input>
                         </div>

                        <br></br>

                         <div>
                             <label>Age</label>
                             <input type = "number" placeholder = "Enter Age" onChange = {(e) =>{setAge(e.target.value)}}></input>
                         </div>


                    </div>

                    <div className='flex-item text-a-center'>
                        <Button onClick = {register} variant="success">Register</Button>{' '}
                        <br />
                        <i><strong><h3 className = "register-status">{registerStatus}</h3></strong></i>
                    </div>
                </div>
            </div>
        </div>


    )

}

export default Register;