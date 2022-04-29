import React from "react";
import "./Home.css"
import Login from "./Login.js";
 
function Home() {

return (
    <div className  = "site-container">
        <div className = "site-page">
            <div className='flex-container flex-d-col'>
                <div className = "flex-item home-welcome">
                    <h3>Welcome to <i>Imperial Health!</i>
                    <img className = "logo" src={ require('./images/logo_penguin.png') } /></h3>
                </div>

                <div className = "flex-item home-get-started">
                    <h3>Get Started</h3>
                        <p> 
                            Now that you have created an account, you can access the two main features Imperial Health offers.
                            Located at the top of the screen, you can navigate to either the Diagnosis or Map feature. 
                            You also have the ability to view your profile which contains any prior diagnosis history. 
                            This will contain all relevent information, allowing for quick access and reference if needed.  
                        </p>
                </div>

                <div className = "flex-item home-diagnosis">
                    <h3><a href = "/diagnosis">Diagnosis</a></h3>
                        <p> 
                            The Diagnosis feature allows for a quick self diagnosis based on selected symptoms. The max amount of symptoms that can be selected is 5. 
                            After selecting symptoms, click the "Get Diagnosis" button for a self diagnosis. 
                            You will see possible illnesses related to your selected symptoms as well as a "Get Specailist" button. 
                            This button displays all possible specialists related to your diagnosis as well as specialists near you. 
                            There will also be a deatiled medical description, general description, possible symptoms and treatment description within this button. 
                            You also have the ability to search for a pharmacy near you. An interactive map will be displayed for your viewing.
                        </p>
                </div>

                <div className = "flex-item home-map">
                    <h3><a href = "/map">Map</a></h3>
                        <p>
                            The Map feature gives you, the user, complete freedom to search for a specified location wtih regards to a specialist even if it has not been reccomended based on a diagnosis. 
                            The interactive map provided starts on your current location, if provided, and will search for places of interest within your range. 
                            After a place of interest has been provided in the search bar, you will be given directions to that location.   
                        </p>
                </div>

                <div className = "flex-item home-profile">
                    <h3><a href = "/profile">Profile</a></h3>
                        <p>
                            The Profile features allows for a compelte viewing of past diagnosis history, ranging from symptoms, illnesses and reccomended specialists
                        </p>
                </div>
            </div>
        </div>
    </div>
)

}

export default Home;