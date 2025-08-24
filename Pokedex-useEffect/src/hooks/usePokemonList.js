import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
    setPokemonListState((state) => ({ ...state, isLoading: true }));
    const response = await axios.get(pokemonListState.pokedexUrl); //downloading list of 20 pokemon of data
    const pokemonResult = response.data.results; //we are getting name and url from array of pokemons

    // console.log("1usePokemonList respones is", response.data.pokemon);

    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
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
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        types: pokemon.types,
      };
    });

    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
