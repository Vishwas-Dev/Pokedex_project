import { useParams } from 'react-router-dom'
import usePokemonDetails from '../../hooks/usePokemonDetails';
import './PokemonDetails.css';

function PokemonDetails({pokemonName}) {
  const { id } = useParams();   // <-- FIXED
  const [pokemon] = usePokemonDetails(id, pokemonName);


  return (
  
    
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
