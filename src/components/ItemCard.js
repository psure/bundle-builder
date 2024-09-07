import { Card, CardHeader, CardBody } from '@wordpress/components'
import ItemButton from './ItemButton'


const ItemCard = ( { item } ) => {
  
  return (
       
    <Card elevation="1" variant="primary" style={{ marginBottom: '10px'}}>
      <CardHeader size="small" style={{ padding: '10px 25px 10px 25px'}}>
        <strong>{ item.heading }</strong>        
        <ItemButton heading={ item.heading }/>									
      </CardHeader>
      <CardBody variant="secondary">
        { item.body }										
      </CardBody>      
    </Card>   
        
 )
   
}
export default React.memo(ItemCard)