import React from 'react';
import CountButton from "./CountButton/CountButton";
import SearchBar from "./SearchBar/SearchBar";

function App() {


    return (
      <div>
          <SearchBar 
          products = {[
            "apple",
            "orange"
          ]}/>

          <CountButton incrementBy = {10} />
         
      </div>
    )
    
  } 

  //makes this file available for use in other files, can be referenced. MUST include
  export default App;
