let pokemonRepository = (function() {
    let pokemonList= [
        //{name: 'Bulbasaur', height: 7, type: ['grass', 'poison']},
        //{name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
        //{name: 'Gyarados', height: 6.5, type: ['water', 'flying']}
    ];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container')
    
    function add(pokemon) {
        if(typeof pokemon === 'object' && 
        'name' in pokemon && 
        //'height' in pokemon && 
        //'type' in pokemon
        'detailsUrl' in pokemon ) {
        pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    };
    
    function getAll() {
        return pokemonList;
    };
    
    function showDetails(pokemon) {
        console.log(pokemon);
        modalContainer.innerHTML= '';
        
        //create modal
        let modal = document.createElement('div');
        modal.classList.add('pokemon-list-modal');

        let info = document.createElement('div');
        info.classList.add('pokemon-info');

        let name = document.createElement('h1');
        name.innerText= pokemon.name;

        let height = document.createElement('h3');
        height.innerText = 'Height: ' + pokemon.height + ' cm';

        let pic = document.createElement('img');
        pic.src = pokemon.imageUrl

        //create button
        let button = document.createElement('button');
        button.classList.add('back-button');
        button.innerText='Close';

        //append
        modal.appendChild(info);
        info.appendChild(name);
        info.appendChild(height);
        info.appendChild(pic);
        info.appendChild(button);
        modalContainer.appendChild(modal);

        //event listeners
        button.addEventListener('click', () => {
            modal.classList.add('is-visible')
        })
    };
    
    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('new-button');
        listItem.appendChild(button);
        list.appendChild(listItem);
        button.addEventListener('click', function(){
            showDetails(pokemon)
        });
    };
    
    function loadList() {
        return fetch(apiUrl).then( function (response) {
            return response.json();
        }).then (function(json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add (pokemon);
                console.log(pokemon);
            });
            }).catch (function (e){
                console.error(e);
            })
    };

    function loadDetails (item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e) {
            console.error(e);
        });
    };

    //function showDetails(pokemon) {
       // loadDetails(pokemon).then(function() {
     //       console.log(pokemon)
      //  })
   // };

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();
    
    
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function(pokemon){

        pokemonRepository.addListItem(pokemon);
        
        //document.write(pokemon.name + ' height: ' + pokemon.height)
    
        // for (let i = 0;  pokemonList.length; i++) {
        // This will display the pokemon names with their heights
       // document.write(pokemonList[i].name + ` (height:  + ${pokemonList[i].height} )` )
       //if (pokemon.height >= 7) {
        // This will display a message for large pokemons
        // if (pokemonList[i].height >= 7) {
        // This will display a message for large pokemons
       // document.write(' That\'s a big pokemon! ')
        //} else if (pokemon.height > 3 && pokemon.height < 7) {
        // } else if (pokemonList[i].height > 3 && pokemonList[i].height < 7) {
        // This will display a message for medium pokemons
      //  document.write(' That\'s a medium sized pokemon! ')
        //} else {
        // This will display a message for small pokemons
      //  document.write(' That\'s a small pokemon! ')
        //}
    });
})
    
    
    
function divide(dividend, divisor) {
    if (divisor === 0) {
        return 'You are trying to divide by zero'
    } else {
        let result = dividend / divisor ;
        return result
    }
}