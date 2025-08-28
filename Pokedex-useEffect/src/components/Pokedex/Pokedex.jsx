import React, { useState } from 'react'
import PokemonList from '../PokemonList/PokemonList'
import Search from '../Search/Search'
import PokemonDetails from '../PokemonDetails/PokemonDetails'
// Css
import './Pokedex.css'


function Pokedex() {
  const [seacrhTerm, setSearchTerm] = useState('')
  return (
    <div className='pokedex-wrapper'>
      
      <Search updateSearchTerm={setSearchTerm} />
      {( !seacrhTerm) ? <PokemonList/> : <PokemonDetails key={seacrhTerm} pokemonName={seacrhTerm}/> }
    </div>
  )
}

export default Pokedex
