import React from "react"

function PokemonList({pokemon}) {
    return (
        <div>
            {/* loops through pokemon, bascially a for each since p is 'i', 
            after loop print p which is each element within array. 
            key is assigned to each name ({p}) */}
            {pokemon.map(p=> (
                <div key = {p}>{p}</div>
            ))}
        </div>

    )
}
export default PokemonList;