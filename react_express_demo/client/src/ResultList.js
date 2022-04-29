import React, { Component,  useEffect, useState } from "react"; 
import axios, { Axios } from 'axios' //npm i axios
import "./ResultList.css"
import Symptoms from "./Symptoms";
import Map from "./Map";
import { Button } from 'react-bootstrap';
import SymptomModal from './SymptomModal'


const gender = 'male';
const age = 30;
const DIAGNOSIS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRjbGFwcHN5QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNzk2NSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjEwOSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiIxMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJCYXNpYyIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjItMDQtMjIiLCJpc3MiOiJodHRwczovL2F1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2NTExODI5NTAsIm5iZiI6MTY1MTE3NTc1MH0.tthKQAoIaYQMpSeEFVwlW3XWfWZzoSI_Y9mbzzXRUOY';
const ISSUE_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRjbGFwcHN5QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNzk2NSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjEwOSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiIxMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJCYXNpYyIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjItMDQtMjIiLCJpc3MiOiJodHRwczovL2F1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2NTExODI5NjQsIm5iZiI6MTY1MTE3NTc2NH0._RDeo_VcvV0dI12ArxFrjCjRFi2XS61WvhAr7zKybHo';


class ResultList extends Component {
    constructor(props) {
        super(props)
        this.result = 'https://healthservice.priaid.ch/diagnosis?symptoms=[' + props.idList + ']&gender=' + gender + '&year_of_birth=' + age + '&token=' + DIAGNOSIS_TOKEN + '&format=json&language=en-gb';

        
        this.state ={
            results: [],
            specialist: [],
            button : false,
            singleIssue: '',
            singleIssueID: '',
            results2: [],
            showComponent: false,
            mapProp: '',
            symptomProp: [],
            user_id: '',
            selected_issue: '',
            med_cond: '',
            date:'',
            illness_desc: '',
            illness_treatment: '',
            displayModal: false
        }
        this._onButtonClick = this._onButtonClick.bind(this);
    }

    closeChild = () => {
        this.setState({
            displayModal: false
        });
    };

    componentDidMount(){
        axios.get(this.result)
        .then(response => {
            console.log('DIAGNOSIS DATA', response.data)
            this.setState({results: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    getIssue(data) {

        const result2 = 'https://healthservice.priaid.ch/issues/' + data + '/info?token=' + ISSUE_TOKEN + '&format=json&language=en-gb'

        axios.get(result2)
        .then(response => {
            console.log('SINGLE ISSUE DATA:', response.data)
            this.setState({results2: [response.data]})
        })

        .catch(error => {
            console.log(error)
        })
    
    }

    fetchSpecialist(data){
            //resets state before next button click 
            this.state.specialist = [];

            data.map(s => {
      
            
            
            this.state.specialist.push(s);

        })

        this.setState(({button}) => ({button: !button}))
        console.log('SPECIALIST STATE:' , this.state.specialist); 
        
    }

    clearSpecialist() {
    
        this.state.specialist = [];
        this.state.singleIssue = '';
        console.log('NEW STATE', this.state.specialist);

        this.setState(({button}) => ({button: button}))
    }

    fetchIssue(data) {
        this.setState({singleIssue: data})

    }

    fetchIssueID(data) {
        this.setState({singleIssueID: data});
        console.log("ISSUE ID: ", data);

        this.getIssue(data)
        
    }

    

    onClickFunctions(name) {
        this._onButtonClick()
        switch(name) {
            case "General practice":
                this.setState({mapProp: "Physician"})
                break;
            case "Internal medicine":
                this.setState({mapProp: 'Physician'})
                break;
            case "Allergology":
                this.setState({mapProp: 'Allergy'})
                break;
            default:
                this.setState({mapProp: name})
        }
        
        this.forceUpdate()
    }


    _onButtonClick() { //function to show map when button is clicked
        this.setState({
            showComponent: true
        })
    }

    fetchAllData(data1,data2,data3) {
        this.fetchSpecialist(data1);
        this.fetchIssue(data2);
        this.fetchIssueID(data3);
        
        this.setState({displayModal:true});

        console.log("THIS SHOULD BE TRUE", this.state.displayModal);

        console.log('SPECIALIST DATA WE NEED TO PASS', data1)
        console.log('selectedissue', data2);
    }


    test() {

        axios.defaults.withCredentials = true;
        let tester = ''; 

        axios.get('http://localhost:5000/diagnosis').then((response) => {

            tester = response.data.user[0].id;

            //console.log('user id: ', response.data.user[0].id);
            this.setState({user_id: tester});
            console.log('id state: ', this.state.user_id);
        })


    }

    userHistory = () => {

        axios.defaults.withCredentials = true;
        let user_response = ''; 

        axios.get('http://localhost:5000/diagnosis').then((response) => {

            user_response = response.data.user[0].id;
            let date = new Date;

           

            //add more info here
            //console.log('user id: ', response.data.user[0].id);
            this.setState({user_id: user_response});
            this.setState({med_cond: this.state.results2[0].MedicalCondition});
            this.setState({date:date});
            this.setState({illness_desc: this.state.results2[0].Description});
            this.setState({illness_treatment:this.state.results2[0].TreatmentDescription});
            // //console.log('id state: ', this.state.user_id);
            console.log('state --> ', this.state.med_cond);
            console.log('state date --> ', this.state.date);
            console.log('specialist state --> ', this.state.specialist);
        
            axios.post('http://localhost:5000/diagnosis', {
                user_id : this.state.user_id,
                singleIssue: this.state.singleIssue,
                specialist:this.state.specialist,
                symptoms: this.props.symptoms,
                med_cond:this.state.med_cond,
                illness_desc: this.state.illness_desc,
                illness_treatment:this.state.illness_treatment,
                date:this.state.date
                //need symptoms and specialist to be complete (both arrays)
                
            }).then((response) => {
                console.log(response);
            });

        })

        
        alert('History saved! Page will be reloaded...');
        window.location.reload(); 
    }

    printHistory() {

        const specialist = this.state.specialist; 
        const selected_issue = this.state.singleIssue;
        const selected_symptoms = this.props.symptoms; 
        const medical_condition = this.state.results2[0].MedicalCondition;
        const illness_desc = this.state.results2[0].Description;
        const illness_treatment = this.state.results2[0].TreatmentDescription;


        let date = new Date;


        console.log('---- USER HISTORY ----');

        console.log('SYMP: ', selected_symptoms);
        console.log('ISSUE: ', selected_issue);
        console.log("MED COND: ", medical_condition);
        console.log("ILLNESS DESC: ", illness_desc);
        console.log("TREATMENT: ", illness_treatment);
        console.log("SPECIALIST: ", specialist);
 


        
    }

    printData() {
        console.log([this.state.results2]);
    }

  
    render() {
        const { results, specialist, singleIssue, results2} = this.state
        return (
            <div>
                            
                <div>
                    <h4 className = "possible-illness-header">Possible Illnesses</h4>
                </div>

                

                <div className='flex-container flex-wrap'>
                    {
                        results.length ? results.map(result => <div className = "flex-item diagnosis-item" key={result.Issue.ID}> {result.Issue.Name} - {result.Issue.Accuracy.toFixed(2)}% 
                            <button className = "diagnosis-info-btn" onClick = {() => this.fetchAllData(result.Specialisation, result.Issue.Name, result.Issue.ID) }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                            </button>   
                        </div>) : <p className = "flex-item">No Resuls found...</p>
    
                     }

            
                </div>


                { results2.length && this.state.displayModal ?  <SymptomModal data1 = {results} data2 = {results2} specialistData = {specialist} saveHistory = {this.userHistory} onClose={this.closeChild}/> : null}
            
              
        </div>

        )
    }
}

export default ResultList;