import { useContext } from 'react'
import { Button } from '@wordpress/components'
import StateContext from '../context/StateContext'

const Pagination = ( { currentpage, totalproducts } ) => {
  const state = useContext( StateContext )
  //console.log( state.config.currentPage )
  //console.log( state.config.totalPages )
  return (
    <div>
      {state.config.currentPage > 1 && (
        <Button variant="primary" onClick={() => state.dispatchConfig({type: 'DECREMENT_PAGE'})}>Previous</Button>
      )}
      {state.config.currentPage < state.config.totalPages && (
       <Button variant="primary" onClick={() => state.dispatchConfig({type: 'INCREMENT_PAGE'})}>Next</Button>
      )}
    </div>
  )
}

export default Pagination