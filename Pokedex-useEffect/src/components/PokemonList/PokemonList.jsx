import React from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import './PokemonList.css';
import { useState } from 'react';
import Pokemon from '../Pokemon/Pokemon';
function PokemonList() {
    const [pokemonListState, setpokemonListState] = useState(
        {
            pokemonList: [],
            isLoading: true,
            pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
            nextUrl: "",
            prevUrl: ""
        }
    );

    async function downloadPokemons() {
        setpokemonListState((state) => ({ ...state, isLoading: true }));
        const response = await axios.get(pokemonListState.pokedexUrl); //downloading list of 20 pokemon of data
        const pokemonResult = response.data.results;  //we are getting name and url from array of pokemons

        setpokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous
        }));

        const pokemonsAllPromises = pokemonResult.map((pokemons) => axios.get(pokemons.url));

        //passing promises array to axios .all
        const pokemonData = await axios.all(pokemonsAllPromises); //array of 20 pokemons detailed data

        // iterating on the data of each pokemons and extracting id, namem, image and typs from pokemonData
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other)
                    ? pokemon.sprites.other.dream_world.front_default
                    : pokemon.sprites.front_shiny,
                types: pokemon.types,
            };
        });

        setpokemonListState((state) => ({
            ...state,
            pokemonList: pokeListResult,
            isLoading: false
        }));

        // console.log(pokeListResult);
    }


    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]); // when change url reload the pokemon list

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
                    setpokemonListState({ ...pokemonListState, pokedexUrl: urlToSet })
                }}>Prev</button>
                <button disabled={pokemonListState.nextUrl == null} onClick={() => {
                    const urlToSet = pokemonListState.nextUrl;
                    setpokemonListState({ ...pokemonListState, pokedexUrl: urlToSet })
                }}>Next</button>
            </div>

        </div>
    );
}


export default PokemonList
