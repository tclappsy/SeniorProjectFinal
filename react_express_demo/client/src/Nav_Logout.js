import React from "react";
import "./Nav_Login.css"
import { Outlet } from "react-router-dom";

function Nav_Logout() {
    return (
        
        <div>
           
         <header className = "nav_header">
             

        <div className = "nav_container">
            <div className= "home_link_wrapper">

                <div className="icon_container">
                    <img className="nav_logo" src= {require('./images/white_logo.png')} />
                </div>

                <div class="home_link">
                    <a className = "main_link" href = "/">
                        Imperial Health
                    </a>
                </div>

            </div>

    
            <div className="nav_item">
                <a className = "item_links" href = "/login">
                    Login
                </a>
            </div>

            <div class="nav_item">
                <a className = "item_links" href = "/register">
                    Register
                </a>
            </div>
                
        </div> 
        </header> 

        <Outlet />
        
        </div>
    )
}

export default Nav_Logout;