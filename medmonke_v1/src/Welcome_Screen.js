import React from "react";

function Welcome_Screen () {
    return (
        <div className = "container">
            <div className = "wrapper">
                <h2> Welcome to MedMonke </h2>
                <h5 className = "below_message">Click the following to get started</h5>
                <br></br>
                
                <div className = "links">
                    <p><a href = "./Register.js">Register</a></p>
                    <p><a href = "#">Login</a></p>
                </div>
            </div>
        </div>
    )
}

export default Welcome_Screen;