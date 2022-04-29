import React, {useEffect, useState} from "react";
import axios from 'axios';
import "./Profile.css";
import { Button } from 'react-bootstrap';



function Profile () {

    axios.defaults.withCredentials = true;
    const [username, setUsername] = useState('');
    const [user_id, setUserID] = useState('');


    const [userHistory, setUserHistory] = useState([]);
    const [selectedHistory, setSelectedHistory] = useState();


    //history
    const [medicalDescription, setMedicalDescription] = useState(null);
    const [savedDate, setSavedDate] = useState('');
    const [selectedIssue, setSelectedIssue] = useState('');
    const [specialist, setSpecialist] = useState(null);
    const [symptoms, setSymptoms] = useState('');
    const [historyExist, setHistoryExist] = useState(false);
    const [illnessDesc, setIllnessDesc] = useState('');
    const [illnessTreatment, setIllnessTreatment] = useState('');
   


    useEffect(() => {
        axios.get("http://localhost:5000/profile").then((response) =>  {
            if(response.data.loggedIn === true) {

              
                console.log('USER RESPONSE ' ,response.data.user[0].username);
                setUsername(response.data.user[0].username);
                setUserID(response.data.user[0].id);

                            
                console.log("RESPONSE: ", response.data);

                setUserHistory(response.data.user_history);
                setSavedDate('DATE' , response.data.saved_date);


            } else {
                setUsername("USER NOT LOGGED IN");
            }
        })
    }, [])

    function setHistory() {
        const error_string = "Select History";

        if(selectedHistory === error_string) {
            setMedicalDescription(null);
            setSelectedIssue(null);
            setSpecialist(null);
            setSymptoms(null);
        }


        //try this with selectedIssue rather than history
        //if not then add an incremented ID with each entry 
        
        userHistory.map((history) => {
            if(history.saved_date === selectedHistory) {
                console.log(history);
                setHistoryExist(true);
                setMedicalDescription(history.medical_condition);
                setSelectedIssue(history.selected_issue);
                setSpecialist(history.specialist);
                setSymptoms(history.symptoms);
                setSavedDate(history.saved_date);
                setIllnessDesc(history.illness_description);
                setIllnessTreatment(history.illness_treatment);
            }
        })

    
       console.log(selectedHistory);
    }


    function displayHistory() {
        if(historyExist === true) {
            return (
                <div className = "history-container">

                    <div className = "selected-issue">
                        {medicalDescription !== null ? <h5 className = "col-title">Selected Issue: <p>{selectedIssue}</p></h5> : ''}
                     </div>

                     <hr />

                     <div className = "specialist">
                        {medicalDescription !== null ? <h5 className = "col-title">Specialist: <p>{specialist}</p></h5> : ''}
                     </div>

                     <hr />

                     <div className = "symptoms">
                         {medicalDescription !== null ? <h5 className = "col-title">Symptoms: <p>{symptoms}</p></h5> : ''}
                     </div>

                     <hr />
                     
                    <div className = "medical-description">
                        {medicalDescription !== null ? <h5 className = "col-title">Medical Description: <p>{medicalDescription}</p></h5> : ''}
                    </div>
                     
                     <hr />
                    
                     <div className = "illness-description">
                         {medicalDescription !== null ? <h5 className = "col-title">Illness Description: <p>{illnessDesc}</p></h5> : ''}
                     </div>

                    <hr />
                     <div className = "illness-treatment">
                         {medicalDescription !== null ? <h5 className = "col-title">Illness Treatment: <p>{illnessTreatment}</p></h5> : ''}
                     </div>
                </div>
            )
        }
       
    }

    function displayDate() {

        
        var test = [savedDate.substring(0,10)];
        console.log('trimmed date', test);
        console.log('saved date state --> ',savedDate);
        
    }

    function testMethod() {
        console.log('clicked');
    }


    return (
        <div className = "site-container">
            <div className='site-page'>

            <div className = "flex-container no-gap flex-d-col">
                            <div className='flex-item'>

                                <div className = "welcome-message">
                                    <h4>Welcome, <i className = "username-color">{username}</i></h4>
                                </div>
          
                                <h5>Select an entry</h5>
                                <select onChange = {e => setSelectedHistory(e.target.value)}>
                                    <option>Select History</option>
                                    {userHistory.map(history => (
                                        
                                        <option key = {history.saved_date} value={history.saved_date}>
                                            {history.saved_date.substring(0,10)}
                                        </option>
                                    ))}
                                </select>


                            <div className = "display-history">

                            {userHistory !==  null ? <Button  onClick = {setHistory} className = "button-brand" variant="primary">Display History</Button> : ''}

                            
                            {displayHistory()}
                        </div>  
                    </div>
                </div>
            </div>
        </div>

        
    );
}

export default Profile;