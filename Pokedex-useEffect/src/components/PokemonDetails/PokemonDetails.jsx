import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import usePokemonDetails from '../../hooks/usePokemonDetails';
import usePokemonList from '../../hooks/usePokemonList';
import './PokemonDetails.css';

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon] = usePokemonDetails(id);


  return (
    <div className='pokemon-details'>
      <img src={pokemon.image} alt="pokemones-details-image" className='img' />
      <div className='pokemon-details-name'>  <span> {pokemon.name}</span> </div>
      <div className='pokemon-details-weigth'>Weigth: {pokemon.weight}  </div>
      <div className='pokemon-details-heigth'>Heigth: {pokemon.height}  </div>
      <div className='pokemon-details-types'>
        Types: <span>{pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}</span>
      </div>

    
        {pokemon.types && pokemon.similarPokemon &&
          <div>
            more {pokemon.types[0]} types pokemon 
            <ul>
              {pokemon.similarPokemon.map((p) => <li key={p.pokemon.url}>{p.pokemon.name} </li>)}
            </ul>

          </div>
        }
     

    </div>
  );
}

export default PokemonDetails
