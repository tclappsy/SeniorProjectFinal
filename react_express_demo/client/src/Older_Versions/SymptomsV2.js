import React, { useEffect, useState } from "react";

function SymptomsV2() {
    const [symptom, setSymptom] = useState([]);
    const [singleSymptom, setSingleSymptom] = useState()

useEffect(() => {


    fetch("/symptoms")
    .then(res=>res.json())
    .then((symptom)=> {
        const newSymptom = symptom.map((s) => {
            return s.Name;
        })
        
        setSymptom(newSymptom);
        

    })

    console.log(symptom);

}, [])

const clickHandler = (event) => {
    console.log(singleSymptom)
}


    return (
        <div>
        <h1>Symptoms </h1>

        {/* <ul>
        {symptom.map((s) => {
            return <li key ={s}>{s}</li>
        })}
        </ul> */}

        <select value={singleSymptom} onChange={e=>setSingleSymptom(e.target.value)}>
            {symptom.map(s => (
                <option key = {s}>
                    {s}
                </option>
            ))}
        </select>

        <button onClick={clickHandler}> butt </button>

        </div>
    )

}

export default SymptomsV2;
