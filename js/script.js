const pokemonName = document.querySelector('.name');
const pokemonNumber = document.querySelector('.number');
const pokemonImg = document.querySelector('.pokemom_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;

/* faz a primeira busca na API com o Pokemom numero 1 */
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;  
    }   
}

/* com a resposta da API é feita a renderização do nome, numero e gif do Pokemom */
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

/* quando um numero ou nome de Pokemom é digitado ele faz a busca passando o input para o renderPokemom() */
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemom(input.value.toLowerCase());
    input.value = '';
});

/* quando o botão Prev é clicado, se o numero for maior que 1 ele passa o numero atual -1 para o renderPokemom() */
buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon = searchPokemon - 1;
        renderPokemom(searchPokemon);
    }
});

/* quando o botão Next é clicado, ele passa o numero atual +1 para o renderPokemom() */
buttonNext.addEventListener('click', () => {
    searchPokemon = searchPokemon + 1;
    renderPokemom(searchPokemon);
});

renderPokemom(searchPokemon);

function openWindow() {
    alert("Utilize o sistema de busca para procurar seu Pokemom favorito por nome ou número ou os botões para navegar entre toda a Pokedex!" + 
    "\n \n" + "Use the input sistem to search for your favorite Pokemon by its name or number or use the buttons to navigate through the entire Pokedex")
}

setTimeout(openWindow, 150)