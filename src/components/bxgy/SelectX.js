import { Button } from '@wordpress/components'
import { useContext } from '@wordpress/element'
import StateContext from '../../context/StateContext'

const SelectX = () => {
  const state = useContext( StateContext )
  return (    
    <Button variant="primary" onClick={ () => state.dispatchConfig({ type: 'SET_X_BXGY' }) }><strong>Select Products For X</strong></Button>   
 )
}

export default SelectX