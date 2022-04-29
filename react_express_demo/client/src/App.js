import React, { Component,  useEffect, useState} from "react"; 
import axios from 'axios'
import Symptoms from './Symptoms';
import Register from './Register';
import Home from './Home';
import HomeLogin from "./HomeLogin";
import Error_Route_LoggedOut from './Error_Route_LoggedOut.js';
import Error_Route_LoggedIn from "./Error_Route_LoggedIn.js";
import Map from './Map';
import Login from './Login';
import Logout from "./Logout";
import Profile from "./Profile";
import "./index.css";
import MapGL from 'react-map-gl'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { Nav } from "react-bootstrap";
import Nav_Login from "./Nav_Login"
import Footer from "./Footer"
import Nav_Logout from "./Nav_Logout"
import SymptomModal from "./SymptomModal";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const isLoggedIn = document.cookie !== '';


  function getRoutes() {
    if(isLoggedIn) {
      return( 
        <div>
              <Routes>
                  <Route path = "/home" element = {<Home />}/>
                  <Route path = "/" element = {<Home />}/>
                  <Route path = "/diagnosis" element = {<Symptoms />}/>
                  <Route path = "/map" element = {<Map prop = {""}/> } />
                  <Route path = "/logout" element = {<Logout />} />
                  <Route path = "/profile" element = {<Profile />} />
                  <Route path = "*" element = {<Error_Route_LoggedIn />} />
              </Routes>
        </div>
      )
    } else {
      return (
        <div>
            <Routes>
                <Route path = "/register" element = {<Register />}/>
                <Route path = "/" element = {<HomeLogin />} />
                <Route path = "/login" element = {<Login />} />
                <Route path = "*" element = {<Error_Route_LoggedOut />} />
            </Routes>
        </div>
      )
    }
  }
  
  

  return (
    <div className = "main">
        <Router>
        {isLoggedIn ? (
        <Nav_Login  />
      ) : (
        <Nav_Logout />
      )}
        {getRoutes()}          
        <Footer />
      </Router>
    </div>



  );
}


export default App;


