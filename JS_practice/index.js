//convert min to seconds
function convertToSeconds(value) {
    const seconds = value * 60;

    return seconds;
}

// alert(convertToSeconds(10));

//return sum of two numbers
function returnSum(value1, value2) {
    const sum = value1 + value2;

    return sum;
}

// console.log(returnSum(-3,-6));

//return first element in an array
function getFirstValue(array) {

    for(let i =0; i < array.length; i++) {
        if(array.length >= 10) {
            console.log('array has exceeded maximum size');
        } else {
            return array[8];
        }
    }
    
}

// console.log(getFirstValue([1,2,3,4,5,6,7,8,9,10]));

//map 
const products = [
    {
        name:'apple',
        type: 'fruit'
    },
    {
        name:'spinach',
        type:'veggie'
    }, 
    {    
        name: 'strawberry',
        type:'fruit'
    }
];

//new var assigned to map function, products loops through array, product is new var which can be accessed to get other info, like a foreach loop

const fruits = products.map(product => {
    // const combine = product.name + "-" + product.type;

    // return combine;

    return product.name + ' - ' + product.type;
})

console.log(fruits);

//filter
const teams = ['yankees','red sox','blue jays'];
const result = teams.filter(team => team.length > 7);

console.log(result);

