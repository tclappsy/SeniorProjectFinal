import React from 'react';
import Products from './Products';
import Rating from "./Rating";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function formatName(user) {
  return user.firstName + " " + user.lastName;
}

function App() {

  const user = {
    firstName: "Tom",
    lastName: "Clappsy",
    url: 'https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/krpjbyvedpf7kwz2scyh/james-gandolfini-tony-soprano'
  };

  const isValid = true;

  return (
    <div className="App">
      <h1> test 
        <br />
        {/* <img src = {user.url}></img> */}
      </h1>
      <h2> Hello, {formatName(user)}</h2>
      <Products />
      <Button variant = "danger" disabled = {!isValid}>Button</Button>

      <Rating rating = "1"/>
      <Rating rating = "2"/>
      <Rating rating = "3"/>
      <Rating rating = "4"/>
      <Rating rating = "5"/>
    
    </div>
  );
}

export default App;
