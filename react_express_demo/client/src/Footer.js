import React from "react";
import "./Footer.css"

function Footer () {
   return (
    <footer className='footer-container'>
        <div className="flex-container full-width text-a-center">
            <div className='flex-item'>
                <img className ="footer-logo" src={ require('./images/white_logo.png') } />
                    Imperial Health © 2022
            </div>
        </div>
    </footer>
   )
}

export default Footer;