import React, {Component} from "react";


export default class Issues extends Component {
    constructor() {
        super();
        this.state = {
            issues: []
        };
    }

    componentDidMount() {
        fetch('/issues')
        .then(res => res.json())
        .then(issues =>this.setState({issues}, () => console.log('Issues fetched... ', issues)));
    }

    render() {
        return (
            <div>
                <h1> Possible Issues</h1>

                {/* <ul>
                    {this.state.issues.map(issue => 
                    <li key = {issue.ID}>{issue.Name}</li>
                    )}
                </ul> */}

                  <select>
                    {this.state.issues.map(issue => (
                        <option key = {issue.ID} value = {issue}>
                            {issue.Name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}