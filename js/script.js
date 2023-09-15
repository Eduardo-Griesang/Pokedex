const pokemonName = document.querySelector('.name');
const pokemonNumber = document.querySelector('.number');
const pokemonImg = document.querySelector('.pokemom_image');
const pokemomType1 = document.querySelector('.type1')
const pokemomType2 = document.querySelector('.type2')

const pokemonStats = document.querySelector('.stats');
const pokemonHP = document.querySelector('.HP');
const pokemonAttack = document.querySelector('.Attack');
const pokemonDefense = document.querySelector('.Defense');
const pokemonSpeed = document.querySelector('.Speed');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')
const buttonUp = document.querySelector('.btn-up')

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
    pokemomType1.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);
    
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        pokemonHP.innerHTML = data.stats[0].base_stat
        pokemonAttack.innerHTML = data.stats[1].base_stat
        pokemonDefense.innerHTML = data.stats[2].base_stat
        pokemonSpeed.innerHTML = data.stats[5].base_stat

        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        
        pokemomType1.innerHTML = data.types[0].type.name;
        pokemomType2.innerHTML = '';
        pokemomType2.innerHTML = data.types[1].type.name;
        
        searchPokemon = data.id;
    }else{
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = '';
        pokemomType1.innerHTML = '';
        pokemomType2.innerHTML = '';
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

/* quanto o botão Up é clicado, ele mostra os stats dos pokemom atual */
buttonUp.addEventListener('click', () => {
    let display = pokemonStats.style.display
    
    if(display != 'block'){
        pokemonStats.style.display = "block"
        pokemonImg.style.right = "52%"
    } else{
        pokemonStats.style.display = "none"
        pokemonImg.style.right = "43%"
    }

})

renderPokemom(searchPokemon);


function openWindow() {
    alert("Utilize o sistema de busca para procurar seu Pokemom favorito por nome ou número ou os botões para navegar entre toda a Pokedex e os status dos Pokemons!" + 
    "\n \n \n" + "Use the input sistem to search for your favorite Pokemon by its name or number or use the buttons to navigate through the entire Pokedex and the Pokemon's stats")
}

setTimeout(openWindow, 150)