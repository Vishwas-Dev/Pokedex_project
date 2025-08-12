import React from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import './PokemonList.css';
import { useState } from 'react';
import Pokemon from '../Pokemon/Pokemon';
function PokemonList() {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');


    async function downloadPokemons() {
        setIsLoading(true);
        const response = await axios.get(pokedexUrl); //downloading list of 20 pokemon of data
        const pokemonResult = response.data.results;  //we are getting name and url from array of pokemons
        // console.log(pokemonResult);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        // iterating over array of pokemons and using thier url and creating array of promises
        // that will download those 20 pokemons
        const pokemonsAllPromises = pokemonResult.map((pokemons) => axios.get(pokemons.url)); 

        //    console.log(pokemonsAllPromises);

        //passing promises array to axios .all
        const pokemonData = await axios.all(pokemonsAllPromises); //array of 20 pokemons detailed data

        // iterating on the data of each pokemons and extracting id, namem, image and typs from pokemonData
        const pokeListResult = (pokemonData.map((pokemon) => {
            const pokeData = pokemon.data;
            return {
                id : pokeData.id,
                name : pokeData.name, 
                image : (pokeData.sprites.other) ? pokeData.sprites.other.dream_world.front_default : pokeData.sprites.front_shiny,
                types : pokeData.types,
            };
        }))

        setPokemonList(pokeListResult);
        console.log(pokeListResult);
        setIsLoading(false);
    }


    useEffect(() => {
        downloadPokemons();
    }, [pokedexUrl]); // when change url reload the pokemon list

    return (
        <div className='pokemon-list-wrapper'>
            <h3 className='pokemon-listHead'>Pokemon List</h3>
            <div className='pokemon-outputData'>
            {isLoading ? "Data is loading" : 
            pokemonList.map((p) => <Pokemon name={p.name} image={p.image}  key={p.id} />)
            }
            </div>
            <div className='controlls'>
                <button disabled={ prevUrl == null} onClick={() => setPokedexUrl(prevUrl) }>Prev</button>
                <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl) }>Next</button>
            </div>
          
        </div>
    );
}


export default PokemonList
