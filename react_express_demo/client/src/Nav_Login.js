import React from "react";
import "./Nav_Login.css"
import { Outlet } from "react-router-dom";

function Nav_Login() {
    return (
        <header className = "nav_header">
            <div className = "nav_container">
                <div className= "home_link_wrapper">
                    <div className="icon_container">
                        <img className="nav_logo" src= {require('./images/white_logo.png')}/>
                    </div>

                    <div class="home_link">
                        <a className = "main_link" href = "/home">
                            Imperial Health
                        </a>
                    </div>
                </div>

                <div className="nav_item">
                    <a className = "item_links" href = "/diagnosis">
                        Diagnosis
                    </a>
                </div>

                <div class="nav_item">
                    <a className = "item_links" href = "/map">
                        Map
                    </a>
                </div>

                <div class="nav_item">
                    <a className = "item_links" href = "/profile">
                        Profile
                    </a>
                </div>
            

                <div class="nav_item_logout">
                    <a className = "item_links" href = "logout">
                        Logout
                    </a>
                </div> 
        
            </div> 

        <Outlet />

        </header> 

        
    )
}

export default Nav_Login;