import React from 'react'
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';
import usePokemonList from '../../hooks/usePokemonList';
function PokemonList() {

    const [pokemonListState, setPokemonListState] = usePokemonList( false);
 
    return (
        <div className='pokemon-list-wrapper'>
            <h3 className='pokemon-listHead'>Pokemon List</h3>
            <div className='pokemon-outputData'>
                {pokemonListState.isLoading ? "Data is loading" :
                    pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            </div>
            <div className='controlls'>
                <button disabled={pokemonListState.prevUrl == null} onClick={() => {
                    const urlToSet = pokemonListState.prevUrl;
                    setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet })
                }}>Prev</button>
                <button disabled={pokemonListState.nextUrl == null} onClick={() => {
                    const urlToSet = pokemonListState.nextUrl;
                    setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet })
                }}>Next</button>
            </div>

        </div>
    );
}


export default PokemonList
