import { __ } from '@wordpress/i18n'
import { Spinner, CheckboxControl } from '@wordpress/components'
import { useState, useEffect, useCallback, useReducer } from '@wordpress/element'
import axios from 'axios'
import SearchBox from './SearchBox'
import Pagination from './Pagination'
import { useContext } from 'react'
import StateContext from '../context/StateContext'
//import { useCallback } from '@wordpress/interactivity'
import SaveX from './bxgy/SaveX'

const pageurl = window.location.href
const match = pageurl.match(/(.*)\/wp-admin/)
const siteUrl = match ? match[1] : null

export default function Products ( { products } ) { 
	const state = useContext( StateContext )   
	
  /* const toggleProductSelecttion = ( productId ) => {
		console.log( productId )
	} */

	useEffect(() => {
		const fetchProducts = async () => {
				state.setIsLoading(true)
				try {						
						const response = await axios.get(`${siteUrl}/wp-json/wc/store/v1/products`, {
								params: {
										page: state.config.currentPage,
										per_page: state.config.paginationCount,
                    search: state.config.searchTerm
								}
						});
						state.setProducts(response.data)
						state.setIsLoading(false)
						/* state.setConfig((prevConfig) => ({
							...prevConfig,
							isLoading: !prevConfig.isLoading, 
							totalProducts: parseInt(response.headers['x-wp-total']),
							totalPages: Math.ceil(response.headers['x-wp-total'] / prevConfig.paginationCount)
						})) */
						state.dispatchConfig({type: 'SET_CONFIG', payload: {							 
							totalProducts: parseInt(response.headers['x-wp-total']),
							totalPages: Math.ceil(response.headers['x-wp-total'] / state.config.paginationCount)}})
				} catch (error) {
						console.error('Error fetching products:', error)
						state.setIsLoading(true)
				}
		}
		fetchProducts()
}, [ state.config.currentPage, state.config.paginationCount, state.config.searchTerm ] ) 

	//console.log( state.products )

	return (    
    <>
			<p>{__('from product page', 'bundle-builder-woo-lang')}</p>
			<SearchBox/>
			<Pagination/>
			<SaveX/>			
			<div className="product-list-block">			
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
						{ state.products.map( (product) => (
							<tr key={product.id}>
								<td>
									<CheckboxControl											
										checked={ state.config.BXGY_X.includes(product.id) }
										onChange={ () => state.dispatchConfig({ type: 'SET_SELECTED_PRODUCTS', payload: { id: product.id } }) }									
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
		
		</>        
  )
}