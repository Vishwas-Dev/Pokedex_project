import {Routes, Route} from 'react-router-dom'
import Pokedex from '../components/Pokedex/Pokedex'
import PokemonDetails from '../components/PokemonDetails/PokemonDetails'

function CustomRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Pokedex/>}/>

            <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
        </Routes>
      
    </div>
  )
}

export default CustomRoutes
