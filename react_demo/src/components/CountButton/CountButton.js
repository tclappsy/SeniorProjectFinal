import React, { useState, useEffect } from 'react';
import "./CountButton.css";

function CountButton(props) {

    //props are values that get passed into the component
    //console.log(props.incrementBy);

    //useState lets React know that currentCount needs to be kept track of if we want to update its value
    //setCurrentCount essetnially is a mutator method that will change the state of currentCount
    const [counter, setCurrentCount] = useState(0);

    function handleClick() {
        setCurrentCount(counter + props.incrementBy);
    }

    function resetCounter() {
        setCurrentCount(0);
    }


    useEffect(() => {
        if(counter === 10) {
            alert('Count has exceeded 10!');
        }
    }, [counter]);

    //arrow function inside the {} within onClick method
    return <div>
        <button  onClick = {handleClick}>Increment by {props.incrementBy}</button>
        <button onClick = {resetCounter}>Reset</button>
        <br></br>
        <div className = "counter_view">{counter}</div>
      </div>
}

export default CountButton;