let pokemonRepository = (function() {
let pokemonList= [
    {name: 'Bulbasaur', height: 7, type: ['grass', 'poison']},
    {name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
    {name: 'Gyarados', height: 6.5, type: ['water', 'flying']}
];
return {
    add: function(pokemon) {   
        pokemonList.push(pokemon);
    },
    getAll: function() {
        return pokemonList;
    }
}
})()
pokemonRepository.getAll().forEach(function(pokemon){
    document.write(pokemon.name + ' height: ' + pokemon.height)

// for (let i = 0;  pokemonList.length; i++) {
    // This will display the pokemon names with their heights
   // document.write(pokemonList[i].name + ` (height:  + ${pokemonList[i].height} )` )
   if (pokemon.height >= 7) {
    // This will display a message for large pokemons
// if (pokemonList[i].height >= 7) {
    // This will display a message for large pokemons
    document.write(' That\'s a big pokemon! ')
} else if (pokemon.height > 3 && pokemon.height < 7) {
// } else if (pokemonList[i].height > 3 && pokemonList[i].height < 7) {
    // This will display a message for medium pokemons
    document.write(' That\'s a medium sized pokemon! ')
} else {
    // This will display a message for small pokemons
    document.write(' That\'s a small pokemon! ')
}
})

function divide(dividend, divisor) {
    if (divisor === 0) {
        return 'You are trying to divide by zero'
    } else {
        let result = dividend / divisor ;
        return result
    }
}