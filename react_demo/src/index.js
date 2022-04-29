import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App"; //imports all code from App file
import './style/style.css';

//renders our App file by div id root in index.html
ReactDOM.render(App(), document.getElementById("root"));

