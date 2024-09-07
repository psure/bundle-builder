import { Card, CardHeader, CardBody } from '@wordpress/components'
import SelectX from './SelectX'
import SelectY from './SelectY'

const BXGYFirstScreen = () => {
  
  return (    
    <Card elevation="1" variant="primary" style={{ marginBottom: '10px'}}>
      <CardHeader size="small" style={{ padding: '10px 25px 10px 25px'}}>
        <strong>First Screen BXGY</strong>        									
      </CardHeader>
      <CardBody variant="secondary">
        <SelectX/>
        <SelectY/>										
      </CardBody>      
    </Card>    
 )
   
}
export default React.memo(BXGYFirstScreen)