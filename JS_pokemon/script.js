const searchInput = document.getElementById('input');
const searchButton = document.getElementById('button');
const clear_button = document.getElementById('clear_button');
const error_message = document.getElementById('error_message');
const add_button = document.getElementById('add_to_team');

// const pokemon_name = document.getElementById('pokemon_name');
// const pokemon_id = document.getElementById('pokemon_id');


let api_url = 'https://pokeapi.co/api/v2/pokemon/';
let pokemon = '';
let pokemon_team = []
let pokemon_sprite = '';



function fetchAPI() {

    let input = document.getElementById('input').value;
    let inputValue = input.toLowerCase();

    fetch(api_url + inputValue).then(
    function(response) {
        if(response.status !== 200) {

            //error handle
            console.log('Error: ' + response.status);
            console.log('no pokemon found');

            //add error statement here
            document.getElementById('error_message').innerHTML = 'No Pokemon found';
            clear_input();

            
            return;
        }

        response.json().then(function(data) {
            console.log(data);
            // console.log('----FOR TABLE----');
            // console.log(data.name);
            // console.log(data.sprites.front_default);
            // console.log(data.id);

            console.log('searched pokemon...', data.name)

            pokemon = data;
            
           
            document.getElementById('pokemon_name').innerHTML = 'Name: ' + data.name;
            document.getElementById('pokemon_sprite_front').src = data.sprites.front_default;
            document.getElementById('pokemon_sprite_shiny').src = data.sprites.front_shiny;
            document.getElementById('pokemon_id').innerHTML = 'ID: ' + data.id;

            //show add pokemon button when added
            document.getElementById('add_button').style.display = "flex";
            document.getElementById('clear_party').style.display = "flex";

            document.getElementById('error_message').innerHTML = '';
        
        });
    }
)
    .catch(function(err) {
        console.log('Fetch error: ', err);
    });

}

function displayData() {

    let inputValue = document.getElementById('input').value;
    
    if(inputValue === '') {
        alert('no input')
    } else {
        fetchAPI();
    }   
}

function clear_input() {
    document.getElementById('input').value = "";
    document.getElementById('pokemon_name').innerHTML = "";
    document.getElementById('pokemon_id').innerHTML = "";
    document.getElementById('pokemon_sprite_front').src = "";
    document.getElementById('pokemon_sprite_shiny').src = "";
    document.getElementById('add_button').style.display = "none";
    

    console.log('cleared');
}

function add_pokemon() {
    //need to add selected pokemon to array
    
    console.log('Team: ' , pokemon_team);

    if(pokemon_team.length > 5) {
        console.log('LIMIT EXCEEDED');
        document.getElementById('party_limit_error').innerHTML = "Party cannot be greater than 6 pokemon";
    } else {
        pokemon_team.push(pokemon);
        console.log('length:' , pokemon_team.length);

        var pokemon_list = document.getElementById('pokemon_list');
    
        for(let i =0; i < pokemon_team.length; i++) {
            var items = document.createElement('li');
    
            var pokemon_name = document.createTextNode(pokemon_team[i].name + "\n");
            // var pokemon_sprite = document.createTextNode(pokemon_team[i].sprites.front_default);
            //document.getElementById('team_sprite').src = pokemon_team[i].sprites.front_default;
        }

        items.appendChild(pokemon_name);
        //items.appendChild(pokemon_sprite);
        pokemon_list.appendChild(items);
    
    }   
}

function clearParty() {
    document.getElementById('pokemon_list').innerHTML = "";
    document.getElementById('party_limit_error').innerHTML = "";
    pokemon_team.length = 0;

    console.log(pokemon_team.length);
}



var cat = {name: "Athena"};

function swap(feline) {
    feline.name = "wild";
    feline = {name: "tabby"};


}

swap(cat);
console.log(cat.name);


