import React, { useEffect, useState } from "react";


function DiagnosisV2() {
    const [diagnosis, setDiagnosis] = useState([]);


    useEffect(() => {


        fetch("/diagnosis")
            .then(res=>res.json())
            .then((dia)=> {
            const newDiagnosis = dia.map((d) => {
                return d.Issue;
            })
         
            setDiagnosis(newDiagnosis);
           

    })
    
    }, [])

    useEffect(() => {

      // console.log(diagnosis)
    
    })

    const getDiagnosis= () => {
    
        console.log(diagnosis)
    }

    return (
        <div>
            <button onClick={getDiagnosis}>Get Diagnosis</button>

            <h1>Diagnosis</h1>

            <ul>
                    {diagnosis.map(s => (
                    <li key = {s.ID}>
                        {s.Name}
                    </li>
                ))} 
            </ul>
           

        </div>
    );

}

export default DiagnosisV2