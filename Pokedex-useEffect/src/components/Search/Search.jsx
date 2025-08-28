import React from 'react'
import useDebounce from '../../hooks/useDebounce';
// Seacrh css
import './Search.css';


function Search({updateSearchTerm}) {
   const debounceCallback = useDebounce((e) => updateSearchTerm(e.target.value));
    return (
        <div className='search-wrapper'>
            <input
                id='search-pokemon-name'
                type="text"
                placeholder='Pokemon Name...'
                onChange={debounceCallback}
            />
        </div>
    )
}

export default Search
