import React from 'react'
// Seacrh css
import './Search.css';

function Search() {
    return (
        <div className='search-wrapper'>
            <input
                id='search-pokemon-name'
                type="text"
                placeholder='Pokemon Name...'
            />
        </div>
    )
}

export default Search
