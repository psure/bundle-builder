import { __ } from '@wordpress/i18n'
import { useReducer } from 'react'
import { useState, useEffect, useCallback } from '@wordpress/element'
import { InspectorControls, useBlockProps } from '@wordpress/block-editor'
import { PanelBody,  __experimentalNumberControl as NumberControl  } from '@wordpress/components';
import StateContext from './context/StateContext'
import Products from './components/Products'
//import axios from 'axios'
import ItemGrid from './components/ItemGrid'
import BXGYFirstScreen from './components/bxgy/BXGYFirstScreen'
//import DataProductsTable from './components/DataProductTable';


function reducer(state, action) {
  switch ( action.type ) {
		case 'INCREMENT_PAGE':
      return { ...state, currentPage: state.currentPage + 1 };
		case 'DECREMENT_PAGE':
			return { ...state, currentPage: state.currentPage - 1 };	    
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload.searchTerm, currentPage: action.payload.currentPage };
		case 'SET_CONFIG':
			return { ...state, isLoading: action.payload.isLoading, totalPages: action.payload.totalPages, totalProducts: action.payload.totalProducts };
		case 'SET_BXGY':
			if ( action.payload.item === 'BXGY') {
				return { ...state, isBXGY: true, isFirstScreen: false }
			};	
		case 'SET_X_BXGY':
			return { ...state, isProduct: true, isBXGY: false};
		case 'SET_Y_BXGY':
			return { ...state, isProduct: true, isBXGY: false};
		case 'SAVE_X_BXGY':
			console.log('save x')
		case 'SET_SELECTED_PRODUCTS':
			const id = action.payload.id
			/* const index = state.BXGY_X.indexOf(id);
      if (index === -1) {
        return {
          ...state,
          BXGY_X: [...state.BXGY_X, id]
        };
      } else {
        return {
          ...state,
          BXGY_X: [...state.BXGY_X.slice(0, index), ...state.BXGY_X.slice(index + 1)]
        };
      } */
		 const newId = state.BXGY_X.includes(id) ? state.BXGY_X.filter( item => item !== id ) : [...state.BXGY_X, id ]
		 return { ...state, BXGY_X: newId }
								
    default:
      return state;
	}
  throw Error('Unknown action.');
}

const wootype = [ { heading: 'BXGY', body: 'Buy X Get Y FREE' }, { heading: 'BXSY', body: 'Buy X Save Y% in cart' }, { heading: 'Gift Wrap', body: 'Lorum ipsum dolor sit' }, { heading: 'Coming soon', body: 'Lorum ipsum dolor sit' } ]


export default function Edit ( { attributes, setAttributes } ) {
  
  const blockProps = useBlockProps()
  const [ products, setProducts ] = useState([])
	const [ isLoading, setIsLoading ] = useState(false)	
	const [ config, dispatchConfig ] = useReducer( reducer, { totalPages: 1, searchTerm: '',	currentPage: 1, paginationCount: 5, totalProducts: 1, isProduct: false, isBXGY: false, isFirstScreen: false, BXGY_X: [] } )
  
	//console.log( config.currentPage )
	//console.log( config.BXGY_X )

  /* useEffect(() => {
		const fetchProducts = async () => {
				try {
						const response = await axios.get(`${siteUrl}/wp-json/wc/store/v1/products`, {
								params: {
										page: config.currentPage,
										per_page: config.paginationCount,
                    search: config.searchTerm
								}
						});
						setProducts(response.data)
						setConfig((prevConfig) => ({
							...prevConfig,
							isLoading: !prevConfig.isLoading, 
							totalProducts: parseInt(response.headers['x-wp-total']),
							totalPages: Math.ceil(response.headers['x-wp-total'] / prevConfig.paginationCount)
						}))
						
				} catch (error) {
						console.error('Error fetching products:', error)
				}
		}
		fetchProducts()
}, [ config.currentPage, config.paginationCount, config.searchTerm ] ) */
 
  return (
    <div {...blockProps} >
      <StateContext.Provider value={ { products, setProducts, config, dispatchConfig, isLoading, setIsLoading } }>
				<p >
					{ __(
						'My First Interactive Block – hello from the editor!',
						'bundle-builder-woo-lang'
					) }
				</p>
				{ config.isFirstScreen && <ItemGrid item={ wootype }/> }
				{ config.isBXGY && <BXGYFirstScreen/> }
				{ config.isProduct && <Products/> }
				 				
      </StateContext.Provider>
			<InspectorControls>				
				<PanelBody title="Selected Products">
					<ul>
						{config.BXGY_X.map((productName, index) => (
								<li key={index}>{productName}</li>
						))}
					</ul>
				</PanelBody>
  		</InspectorControls>
			
    </div>
  )

}