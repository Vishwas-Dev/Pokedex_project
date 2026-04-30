import React from 'react'
import { Link } from 'react-router-dom'
import './Pokemon.css'

function Pokemon({name, image, id}) {
  return (
    <div className='pokemon'>
      <Link to={`/pokemon/${id}`}>
      <div className='pokemon-name'><span>{name}</span></div>
     <div>
      <img className='pokemon-img' src={image} alt="pokemons-images/avatar" />
      </div>  
      </Link>
     
    </div>
  )
}

export default Pokemon
