import React from 'react'
import './Pokemon.css'

function Pokemon({name, image}) {
  return (
    <div className='pokemon'>
      <div className='pokemon-name'><span>{name}</span></div>
     <div>
      <img className='pokemon-img' src={image} alt="pokemons-images/avatar" />
      </div>  
     
    </div>
  )
}

export default Pokemon
