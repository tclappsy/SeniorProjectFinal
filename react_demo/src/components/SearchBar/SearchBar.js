import React, { useEffect } from 'react';
import { useState } from "react";
import './SearchBar.css'



function SearchBar(props) {

    const[searchValue, setSearchMethod] = useState("");

    function handleInputChange (event) {
        setSearchMethod(event.target.value)
    }

    function clearSearchBar() {
        setSearchMethod("")
    }

    //products
    const filterProducts = props.products.filter((product) => {
        return product.toLowerCase().includes(searchValue.toLowerCase());
    })

    const searchBarStatus = searchValue.length > 0;
    console.log(searchBarStatus);

    return <div>
        <input type = "text" value = {searchValue} onChange = {handleInputChange} placeholder = "Enter text" />
        <br></br>
        
        {/* if searchBarStatus is true, then render out the button */}
        {searchBarStatus &&  <button onClick = {clearSearchBar}>Clear</button>}

        <ul>
            {filterProducts.map((product) => {
            return <li key = {product}>{product}</li>
            })}
        </ul>

    </div>
}

export default SearchBar;