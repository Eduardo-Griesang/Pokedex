const pokemonName = document.querySelector('.name');
const pokemonNumber = document.querySelector('.number');
const pokemonImg = document.querySelector('.pokemom_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;  
    }   
}

const renderPokemom = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;
    }else{
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = '';
        pokemonImg.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemom(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon = searchPokemon - 1;
        renderPokemom(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon = searchPokemon + 1;
    renderPokemom(searchPokemon);
});

renderPokemom(searchPokemon);