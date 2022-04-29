import React, { useEffect, useState } from "react";
import ResultList from "./ResultList";


function SymptomsV4() {
    const [symptom, setSymptom] = useState([]); //list of ALL symptoms from API
    const [singleSymptom, setSingleSymptom] = useState() //chosen symptom from select box. becomes rewritten when another symptom is selected
    const [symptomList, setSymptomList] = useState([]) // the state of the selected symptoms from the drop down 
    const [symptomID, setSymptomID] = useState() //the ID of the symptom when added to the list. becomes rewritten when submitting another symptom
    const [symptomIdList, setSymptomIdList] = useState([]) // the list of all symptom IDs in the list on the screen

useEffect(() => {


    fetch("/symptoms")
    .then(res=>res.json())
    .then((symptom)=> {
        const newSymptom = symptom.map((s) => {
            return s;
        })
        
        setSymptom(newSymptom);
        console.log(symptom); //logs current state after filling it with mapped array

    })

    

}, [])

//this is called when the second button is hit

useEffect(() => {

    var y
    const tempList = symptom.map((s) => {
        if(s.Name === singleSymptom)
        {
            y = s.ID
            setSymptomID(y) //sets current state to the id of the chosen symptom. putting this in useEffect allows the state to be set before it is added to the array. This was originally inside the clickHandler but it was adding the state to the list before it was updated. This resulted in a NULL value in the 0 index
        }
    })

    
    
    

})
    



const clickHandler = () => {
    
    setSymptomList(oldList => oldList.concat(singleSymptom) ) //sets the state of the old list to update the added symptom
    setSymptomIdList(oldIdList => oldIdList.concat((symptomID)) ) //adds current state of the symptom ID to the list of selected symptom IDs

}

const checkStates = () => {
    console.log(singleSymptom) //logs selected symptom
    console.log(symptomList) //log updated list
    console.log(symptomIdList) //logs list of chosen symptom IDs
}

const getResults = () => {

        console.log(symptomIdList)
        return(
                 <div>
                     {symptomIdList.length > 0 && <ResultList idList={symptomIdList} />}
                 </div>
            
        )
        
}



    {symptomIdList.length > 0 && <ResultList idList={symptomIdList} />}

    return (
        <div>

        <h1>Symptoms </h1>


        {/* this select is the drop down box */}
        <select value={singleSymptom} onChange={e=>setSingleSymptom(e.target.value)}>
            
            {/* sets first options to be a dash, with an unidentified value */}
            <option>-</option> 

            {symptom.map(s => (
                <option key = {s.ID}>
                    {s.Name}
                </option>
            ))}
        </select>

        <button onClick={clickHandler} > butt </button>

{/* list of selected symptoms */}
        <ul>
             {symptomList.map(s => (
                <li key = {s}>
                    {s}
                </li>
            ))} 
        </ul>

        <button onClick={checkStates}>Check States</button>

                <br /><br/>
        {/* <button onClick={getResults}>Get Results</button> */}

        {symptomIdList.length > 1 && <ResultList idList={symptomIdList} />}

        {/* <ResultList idList={symptomIdList} /> */}

        </div>
    )


}

export default SymptomsV4;
