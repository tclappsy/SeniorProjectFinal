import React, {Component} from "react";


export default class Symptoms extends Component {
    constructor() {
        super();
        this.state = {
            symptoms: []
        };
    }

    componentDidMount() {
        fetch('/symptoms')
        .then(res => res.json())
        .then(symptoms =>this.setState({symptoms}, () => console.log('Symptoms fetched... ', symptoms)));
    }

    render() {
        return (
            <div>
                <h1>Possible Symptoms</h1>
                {/* <ul>
                    {this.state.symptoms.map(symptom => 
                        <li key = {symptom.ID}>{symptom.Name}</li>
                    )}
                </ul> */}

                <select>
                    {this.state.symptoms.map(symptom => (
                        <option key = {symptom.ID} value = {symptom}>
                            {symptom.Name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}