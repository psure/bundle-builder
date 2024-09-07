import { __ } from '@wordpress/i18n'
//import { decodeEntities } from '@wordpress/html-entities'
import { Spinner, CheckboxControl } from '@wordpress/components'
import SearchBox from './SearchBox'
import Pagination from './Pagination'
import { useContext } from 'react'
import StateContext from '../context/StateContext'

const ProductList = ( { products } ) => { 
	const state = useContext( StateContext )
	const searchQuery = state.searchTerm
	console.log( searchQuery )

	const filteredProducts = products.filter( ( item ) => { return ( item.name.toLowerCase().includes( searchQuery.toLowerCase() ) || item.sku.toLowerCase().includes( searchQuery.toLowerCase() ) ) } )
	console.log ( filteredProducts )
	return (		
		<div className="product-list-block">
			<SearchBox/>
			<Pagination/>
			{ state.isLoading ? <Spinner/> : 
				<table className="wp-list-table widefat fixed striped table-view-list">
					<thead>
						<tr>
							<td><strong>Select</strong></td>
							<td><strong>Name</strong></td>
							<td><strong>Price</strong></td>
							<td><strong>Image</strong></td>						
						</tr>
					</thead>
					<tbody>
						{ filteredProducts.map( (product) => (
							<tr key={product.id}>
								<td>
									<CheckboxControl											
										checked={ false }									
									/>
								</td>
								<td><strong>{ product.name  }</strong></td>
								<td><strong>{(parseInt(product.prices.price, 10)/100).toFixed(2) + ' ' + product.prices.currency_symbol }</strong></td>
								<td><img src={product.images[0].thumbnail} alt={product.name} width={40} height={40}/></td>
							</tr>
						))}
					</tbody>
			</table>
			}
						
		</div>		
	);
}

export default ProductList