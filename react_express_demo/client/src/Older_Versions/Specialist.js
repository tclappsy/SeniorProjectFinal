import React, {Component} from 'react';

export default class Specialist extends Component {
    constructor() {
        super()
        this.state = {
            specialist: []
        };
    }

    componentDidMount() {
        fetch('/specialist')
        .then(res => res.json())
        .then(specialist => this.setState({specialist}, () => console.log("Specialist fetched... ", specialist)));
    }

    render() {
        return (
            <div>
                <h1> Specialist </h1>

                <ul>
                    {this.state.specialist.map(s => 
                        <li key = {s.ID}>{s.Name} - {s.Accuracy}%</li>
                    )}
                </ul>
            </div>
        )
    }

}