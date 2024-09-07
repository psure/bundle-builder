import { Button } from '@wordpress/components'
import { useContext } from '@wordpress/element'
import StateContext from '../../context/StateContext'

const SelectY = () => {
  const state = useContext( StateContext )
  return (    
    <Button variant="secondary" onClick={ () => state.dispatchConfig({ type: 'SET_Y_BXGY' }) }><strong>Select Products For Y</strong></Button>   
 )
}

export default SelectY