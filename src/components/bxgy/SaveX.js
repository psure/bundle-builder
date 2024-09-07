import { Button } from '@wordpress/components'
import { useContext } from '@wordpress/element'
import StateContext from '../../context/StateContext'

const SaveX = () => {
  const state = useContext( StateContext )
  return (    
    <Button variant="secondary" onClick={ () => state.dispatchConfig({ type: 'SAVE_X_BXGY' }) }><strong>Save Products For X</strong></Button>   
 )
}

export default SaveX