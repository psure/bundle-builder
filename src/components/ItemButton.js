import { Button } from '@wordpress/components'
import { useContext } from '@wordpress/element'
import StateContext from '../context/StateContext'

export default function ItemButton ( { heading } ) {
  const state = useContext( StateContext )
  
  /* const createClick = ( item ) => {
    console.log( item )
    if ( item == 'BXGY') {
      state.dispatchConfig({ ...state.config, isBXGY: true })
    }    
  } */
  return (
    <>
      {/* { heading.toLowerCase() === "coming soon" ? ( <Button variant="primary" disabled><strong>Create</strong></Button> ) : ( <Button variant="primary" onClick={ () => createClick( heading ) }><strong>Create</strong></Button> ) } */}
      <div>
        { heading.toLowerCase() === "coming soon" ? ( <Button variant="primary" disabled><strong>Create</strong></Button> ) : ( <Button variant="primary" onClick={ () => state.dispatchConfig({ type: 'SET_BXGY', payload: { item: heading } }) }><strong>Create</strong></Button> ) }
      </div>
    </>
  )
}