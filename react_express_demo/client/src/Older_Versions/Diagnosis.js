import React, {Component} from 'react';

export default class Diagnosis extends Component {
    constructor() {
        super();
        this.state = {
            diagnosis: []
        };
    }


    componentDidMount() {
        fetch('/diagnosis')
        .then(res => res.json())
        .then(diagnosis =>this.setState({diagnosis}, () => console.log('Diagnosis fetched...', diagnosis)));
    }

    render() {
        return (
            <div>
                <h1>Diagnosis</h1>

                <ul>
                    {this.state.diagnosis.map(d => 
                        <li key = {d.Issue.ID}>ID: {d.Issue.ID} - {d.Issue.Name}</li>
                    )}
                </ul>

            </div>
        );
    }
}