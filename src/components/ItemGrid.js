import { Flex, FlexBlock, FlexItem } from '@wordpress/components'
import ItemCard from './ItemCard'

export default function ItemGrid ( { item } ) {
  
  const pairs = [];
  for (let i = 0; i < item.length / 2; i++) {
    pairs.push([item[i], item[i + 2]]);
  }  

  return (
    <Flex>
    {pairs.map((pair, index) => (
      <FlexBlock key={index}>
        {pair.map((item, subIndex) => (
          <FlexBlock key={subIndex}>
            <FlexItem>
              <ItemCard item={ item }/>
            </FlexItem>
          </FlexBlock>
        ))}
      </FlexBlock>
    ))}
  </Flex>  
  )
}