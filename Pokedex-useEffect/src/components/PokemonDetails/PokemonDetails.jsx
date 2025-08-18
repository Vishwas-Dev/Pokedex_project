import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './PokemonDetails.css';

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name)
    })
    console.log(response.data);
  }
  console.log(id);

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className='pokemon-details'>
      <img src={pokemon.image} alt="pokemones-details-image" className='img' />
      <div className='pokemon-details-name'>  <span> {pokemon.name}</span> </div>
      <div className='pokemon-details-weigth'>Weigth: {pokemon.weight}  </div>
      <div className='pokemon-details-heigth'>Heigth: {pokemon.height}  </div>
      <div className='pokemon-details-types'>
      Types: <span>{pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}</span> 
      </div>
    </div>
  );
}

export default PokemonDetails
