let pokemonRepository = (function() {
    let pokemonList= [
       
    ];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container')
    
    function add(pokemon) {
        if(typeof pokemon === 'object' && 
        'name' in pokemon && 
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
        loadDetails(pokemon).then(function() {
            showModal(pokemon.name, pokemon.height, pokemon.imageUrl)           
        });
    };
    
    //showModal function
    function showModal(pokename, pokeheight, pokeimage) {
        
        modalTitle = document.querySelector('#pokemonModalLabel');
        modalBody = document.querySelector('.modal-body');

        modalTitle.innerText = pokename;
        modalBody.innerHTML = '';

        let height = document.createElement('h3');
        height.innerText = 'Height: ' + pokeheight + ' cm';

        let pic = document.createElement('img');
        pic.src = pokeimage;
        pic.classList.add('img-fluid');

        let buttonToolbar = document.createElement('div');
        buttonToolbar.innerHTML = `<div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with buttons"></div>`;

        let buttonGroup = document.createElement('div');
        buttonGroup.innerHTML = `<div class="btn-group" role="group"></div>`;

        let nextButton = document.createElement('button');
        nextButton.innerHTML = '<div class ="btn btn-secondary"><p>Next Pokemon</p></div>';

        let backButton = document.createElement('button');
        backButton.innerHTML = '<div class ="btn btn-secondary"><p>Previous Pokemon</p></div>';

        let hr = document.createElement('hr');

        //append

        modalBody.appendChild(height);
        modalBody.appendChild(pic);
        modalBody.appendChild(hr);
        modalBody.appendChild(buttonToolbar);
        buttonToolbar.appendChild(buttonGroup);
        buttonGroup.appendChild(nextButton);
        buttonGroup.appendChild(backButton);

        $('#pokemonModal').modal('show');
       
        
        window.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && modal.classList.contains('is-visible')) {
                modal.classList.remove('is-visible');
            };
        });

        modal.addEventListener('click', (e) => {
            let target = e.target;
            if(target === modal) {
                modal.classList.remove('is-visible')
            };
        });
    };

    function addListItem(pokemon) {
        let list = document.querySelector('.list-group-flush');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
     
        listItem.classList.add('list-group-item');

        button.innerHTML = pokemon.name;
        button.classList.add('btn', 'btn-primary', 'btn-block', 'btn-lg');

        button.addEventListener('click', function(){
            showDetails(pokemon)
        });

        listItem.appendChild(button);
        list.appendChild(listItem);
        
        
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
    });
});
    
    
    
function divide(dividend, divisor) {
    if (divisor === 0) {
        return 'You are trying to divide by zero'
    } else {
        let result = dividend / divisor ;
        return result
    }
}