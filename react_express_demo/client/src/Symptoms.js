import React, { useEffect, useState } from "react";
import ResultList from "./ResultList";
import "./Symptoms.css"
import { Button } from 'react-bootstrap';



var symptomsCounter = 0;

    function Symptoms(props) {
        const [symptom, setSymptom] = useState([]); //list of ALL symptoms from API
        const [singleSymptom, setSingleSymptom] = useState() //chosen symptom from select box. becomes rewritten when another symptom is selected
        const [symptomList, setSymptomList] = useState([]) // the state of the selected symptoms from the drop down 
        const [symptomID, setSymptomID] = useState() //the ID of the symptom when added to the list. becomes rewritten when submitting another symptom
        const [symptomIdList, setSymptomIdList] = useState([]) // the list of all symptom IDs in the list on the screen
        const [searchButton, setSearchButton] = useState(false) //tracks if the user hits the search button for a diagnosis. then searches
        const [specialistButton, setSepicalistButton] = useState(false);
        const [mutatedList, setMutatedList] = useState([]) //this list will be used for the drop down and will be modified as the user selects symptoms
        const [displayList, setDisplayList] = useState(false);

    useEffect(() => {
        
        fetch("/symptoms")
        .then(res=>res.json())
        .then((symptom)=> {
            const newSymptom = symptom.map((s) => {
                return s;
            })
            
            setSymptom(newSymptom);
            setMutatedList(newSymptom)
            console.log('ALL SYMPTOMS', symptom); //logs current state after filling it with mapped array

        })

        

    }, [])

    //this is called when the second button is hit

    useEffect(() => {

        var y
        const tempList = mutatedList.map((s) => {
            if(s.Name === singleSymptom)
            {
                y = s.ID
                setSymptomID(y) //sets current state to the id of the chosen symptom. putting this in useEffect allows the state to be set before it is added to the array. This was originally inside the clickHandler but it was adding the state to the list before it was updated. This resulted in a NULL value in the 0 index
            }
        })
        

    })
        
    const handleRemove = (id) => {
        const newList = mutatedList.filter((test) => test.ID !== id)
        setMutatedList(newList)
    }

    const handleSingleRemove = (name) => {

        var tempID = 0;
        symptom.map((s) => {
            if(s.Name === name) {
                tempID = s.ID;
            }
        })

        console.log(tempID);
        
       const newList = symptomList.filter((test) => test !== name)
       const newIDList = symptomIdList.filter((test) => test !== tempID)

       setSymptomList(newList);
       setSymptomIdList(newIDList);

       symptomsCounter--;
       console.log('symptoms counter', symptomsCounter);

       const test = symptom.map((s) => {
           if(s.Name === name) {
               setMutatedList(oldList => oldList.concat(s))
               
           }
       })
    }



    const clickHandler = () => {
        
        if(singleSymptom === undefined) {
            console.log('please select a smyptom');
        } else {
            setSymptomList(oldList => oldList.concat(singleSymptom) ) //sets the state of the old list to update the added symptom
            setSymptomIdList(oldIdList => oldIdList.concat((symptomID)) ) //adds current state of the symptom ID to the list of selected symptom IDs
            handleRemove(symptomID)
            setDisplayList(true);

            symptomsCounter++;
        }
    }

    const checkStates = () => {
        console.log('RECETNLY SELECTED SYMPTOM: ', singleSymptom) //logs selected symptom
        console.log('SELECTED SYMPTOM LIST: ', symptomList) //log updated list
        console.log('SELECTED SYMPTOM ID LIST: ', symptomIdList) //logs list of chosen symptom IDs
    }

    const getResults = () => {
            //with searchbutton set to true itll call API call from other component
            //logic for this is 158/159
            setSearchButton(true)
    }

    const getSpecialist = () => {
         //with searchbutton set to true itll call API call from other component
        //logic for this is 158/159

        setSepicalistButton(true);
    }

    const clearEntry = () => {
        setSearchButton(false)
        setSepicalistButton(false)
        setMutatedList(symptom)
        setSymptomList([])
        setSymptomIdList([])
        setSingleSymptom()
        symptomsCounter=0;
        console.log('symptoms counter', symptomsCounter);
    }

    const clearResults = () => {
        setSearchButton(false)
        setSepicalistButton(false)
        setMutatedList(symptom)
        setSymptomList([])
        setSymptomIdList([])
        setSingleSymptom()
        symptomsCounter = 0;

        console.log('symptoms counter', symptomsCounter);
    }

    const getSymptoms = () => {
        console.log(symptomList);

    }

    const reloadPage = () => {
        window.location.reload(); 
    }


    return (
        <div className = "site-container">
            <div className='site-page'>
                <div className = "flex-item symptoms-feature">
                    <h3>Select from the drop down to get started</h3>
            

                    <div className = "symptoms-dropdown">
                        <select value={singleSymptom} onChange={e=>setSingleSymptom(e.target.value)}>
                            <option>Select symptoms</option> 
                                {mutatedList.map(s => (
                                    <option key = {s.ID}>
                                        {s.Name}
                                    </option>
                                ))}
                        </select>
                            {symptomsCounter !== 5 && <Button  onClick = {clickHandler} className = "add-symptoms-btn" variant="primary">Add</Button>}
                                        
                    </div>

                
                    <div className = "selected-symptoms">
                    {symptomList.map(s => (
                        <li key = {s}>
                            {s} <button className ="delete-symptoms-btn" onClick = {() => handleSingleRemove(s)}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                            </button>
                        </li>
                    ))}

                    <hr />
                    {symptomsCounter >= 1 && <Button  onClick = {getResults} className = "diagnose-btn button-brand" variant="primary"> Diagnose</Button>}
                    {symptomsCounter >= 1 && <Button  onClick={reloadPage} className = "button-brand reset-btn" variant="danger">Reset</Button>}
                    {searchButton === true && <ResultList idList={symptomIdList} symptoms = {symptomList} />}
                    
                    </div>
               
                </div>
            </div>
        </div>
    )


}

export default Symptoms;
