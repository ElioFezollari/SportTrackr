import React from 'react'
import "../styles/components/search.css"
function Search({text,setText,placeholder}) {
  return (
    <input className='search-component' type="text" placeholder={placeholder}  value={text} onChange={(e)=>setText(e.target.value)}/>
  )
}

export default Search