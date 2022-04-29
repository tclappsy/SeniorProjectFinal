import React from 'react';


function Products () {


    //array
    const products = ["Apples", "Oranges", "Bananas"];

    //arrow function that loops through products (map)
    const listProducts = products.map((product) =>
    <li key = {product.toString()}>{product}</li>
    );


    return (
        <div>
           <ul>{listProducts}</ul>
        </div>
    );
}

export default Products;