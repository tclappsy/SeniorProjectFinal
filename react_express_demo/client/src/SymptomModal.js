import React, {useEffect, useRef, useState} from "react";
import "./SymptomModal.css"
import "./ResultList"
import Map from "./Map";
import {Link} from 'react-router-dom'
import App from "./App"
import ResultList from "./ResultList";
import axios, { Axios } from 'axios' //npm i axios
import MapModal from "./MapModal"
import { Button } from 'react-bootstrap';



function SymptomModal (props) {

    const [showComponent, setComponent] = useState(false);
    const [mapProp, setMapProp] = useState('');

    
    function onButtonClick() { //function to show map when button is clicked
        setComponent(true);
    }

    //function for displaying map when bool 'showComponent' = true
    function displayMap(){
        if(mapProp !== ''){ //checks if prop state is undefined/blank
            console.log("PROP FOR MAP: ", mapProp)
            return(<MapModal prop ={mapProp}/>)
        }
        else(
            console.log("Map prop is undefined/blank")
        )
    }

    function onClickFunctions(name) {
        onButtonClick()
        switch(name) {
            case "General practice":
                setMapProp("Physician")
                break;
            case "Internal medicine":
                setMapProp('Physician')
                break;
            case "Allergology":
                setMapProp('Allergy')
                break;
            default:
                setMapProp(name)
        }
        
        console.log("Show component bool: ", showComponent)
        console.log("Prop being passed into Map Component: ", mapProp)
    }

    function createNewWindow()
    {

        window.open("https://www.google.com/maps/search/"+mapProp)

    }

    function printData() {
        console.log("DATA1: ", props.data1);
        console.log("DATA2: ", props.data2);
        
      for(let i =0; i < props.specialistData; i++) {
          console.log(props.specialistData[i].Name);
      }

      console.log("SPEC: ", props.specialistData);
    }
    

    return (
        <div className='symptom-modal-container flex-center'>
            <div className='symptom-modal'>
                <div className='symptom-modal-header'>
                    <div className='flex-container'>
                        <div className='flex-item illness-header'>
                            <b>{props.data2[0].Name}</b>
                        </div>
                        <div className='flex-item flex-r text-a-right'>
                            <span className='c-pointer' onClick = {props.onClose}>X</span>
                        </div>
                    </div>
                </div>

                <div className='symptom-modal-body'>

                <div className = "flex-item">
                        <b>Medical Condition:</b> {props.data2[0].MedicalCondition}
                    </div>
                    
                    <hr />

                    <div className = "flex-item">
                        <b>Description:</b> {props.data2[0].Description}
                    </div>

                    <hr />

                    <div className = "flex-item">
                        <b>Possible Symptoms:</b> {props.data2[0].PossibleSymptoms}
                    </div>

                    <hr />

                    <div className = "flex-item">
                        <b>Treatment Description:</b> {props.data2[0].TreatmentDescription}
                    </div>

                    <hr />

                    <div className = "flex-item">
                        <b>Specialists: </b>
                        { 
                            props.specialistData.length ? props.specialistData.map(s => <div key = {s.ID}>{s.Name} <Button onClick={() => {onClickFunctions(s.Name)}} className="button-brand" variant="primary">Find Near You</Button> </div>) : <p>Waiting to search...</p>
                        }
                    </div>

                    

                    <div className="flex-item">
                       
                        {showComponent ? displayMap() : null}
                        {showComponent ? <p>No Results found? Click <Button onClick={createNewWindow} variant="primary">here!</Button></p>: null}
                    </div>
                    
                   
                </div>

                <div className='symptom-modal-footer'>
                    <div>
                        <Button onClick = {props.onClose} className = "button-brand" variant="danger">Cancel</Button>
                        <Button onClick = {props.saveHistory}className='button-brand' variant="primary">Save</Button>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default SymptomModal;