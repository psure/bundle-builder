import { useContext } from 'react'
import { SearchControl } from '@wordpress/components'
import StateContext from '../context/StateContext'

const SearchBox = () => {
  const state = useContext( StateContext );
  //console.log( query )
  /* const handleSearchChange = ( value ) => {
    state.setSearchTerm(value);
    state.setCurrentPage(1);    
  } */
  
  /* const testSearch = ( event ) => {
    //state.setConfigState( { ...state.configstate, searchTerm: event.target.value} )
    //state.setConfigState( { ...state.configstate, currentPage: 1} )
    console.log( typeof(Number(event.target.value)) )
    state.setSearchTerm( event.target.value );
    state.setCurrentPage(1); // Reset to first page when changing search term
  } */

  return (
    <>
    <input type="text" value={ state.searchTerm } onChange={(event) => state.dispatchConfig({ type: 'SET_SEARCH_TERM', payload: {
      searchTerm: event.target.value,
      currentPage: 1
    }})}/>
      {/* <SearchControl
        label="Search Products by Name, SKU, or Price"
        value={state.searchTerm}
        onChange={handleSearchChange}
	    /> */}
    </>
  )
}

export default SearchBox