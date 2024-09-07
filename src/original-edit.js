
import { __ } from '@wordpress/i18n'
import { useState, useEffect, useCallback, useReducer } from '@wordpress/element'
import { Button } from '@wordpress/components'
import { useBlockProps } from '@wordpress/block-editor'
import apiFetch from '@wordpress/api-fetch'
import ProductList from './components/ProductLists'
import ItemGrid from './components/ItemGrid'
//import axios from 'axios'
import { useSelect } from '@wordpress/data';
import BXGYFirstScreen from './components/bxgy/BXGYFirstScreen'
import StateContext from './context/StateContext'


//const initialsettings = { isLoading: false, currentPage: 1, totalPages: 1, searchTerm: '', paginationCount: 5 }
const wootype = [ { heading: 'BXGY', body: 'Buy X Get Y FREE' }, { heading: 'BXSY', body: 'Buy X Save Y% in cart' }, { heading: 'Gift Wrap', body: 'Lorum ipsum dolor sit' }, { heading: 'Coming soon', body: 'Lorum ipsum dolor sit' } ]
const initialConfig = { isLoading: false, currentPage: 1, totalPages: 1, searchTerm: '', paginationCount: 5 }

/* apiFetch( { path: '/wc/store/v1/products?page=1&per_page=20' } ).then( ( products ) => {
	console.log( products );
} );  */

/* fetch('http://localhost/kids-toy/wp-json/wc/store/v1/products?page=1&per_page=20')
    .then(response => {
        // Extract the total number of products from the headers
        const totalProducts = response.headers.get('X-WP-Total');
        console.log('Total products:', totalProducts);
        
        // Parse the JSON response
        return response.json();
    })
    .then(products => {
        // Do something with the products data
        console.log(products);
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    }); */

/* function reducer ( state, action ) {	
	switch ( action.type ) {
		case 'set_bxgy':
			const bx = { id: 0, b: [1,2,3], g: [9], d: 0, active: true }
			const setbxgy = [ ...state.bxx, bx]
			return {
				bxx: setbxgy 
			}
			
	}
	throw Error('Unknown action.');
} */

	



export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps()
	//const [ state, dispatch ] = useReducer( reducer, attributes )
	const [ wooProducts, setWooProducts ] = useState( [] )
	const [ configstate, setConfigState ] = useState( initialConfig )
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [paginationCount, setPagination ] = useState(10)
	const [searchTerm, setSearchTerm] = useState('')
	//const [siteUrl, setSiteUrl] = useState('')


	/* const setsite = new Promise(function(Resolve, Reject) {		
		setTimeout(function(){ Resolve(wp.data.select( 'core' ).getSite()); }, 3000);
	});
	
	setsite.then(function( value ) {		
		setSiteUrl( value.url )
	}); */ 
	

	
	

	const bx = {id: 0, b: [1,2,3], g: [8], d: 0, active: false} 
	const handleClick = () => {
    const newbx = [ ...attributes.bxgy, bx ]        
    setAttributes( { bxgy: newbx } )     
  }

	
	/* const gettitle = useSelect( ( select ) => {
		return select( 'core' ).getSite()
	}, [] )

	console.log( gettitle ) */

	/* useEffect(() => {
		const fetchProducts = async () => {
				try {
						const response = await axios.get(`http://localhost/kids-toy/wp-json/wc/store/v1/products`, {
								params: {
										page: currentPage,
										per_page: productsPerPage,
								}
						});
						setProducts(response.data)
						setTotalProducts(parseInt(response.headers['x-wp-total']))
						setTotalPages(Math.ceil(response.headers['x-wp-total'] / productsPerPage))
				} catch (error) {
						console.error('Error fetching products:', error)
				}
		};

		fetchProducts()
}, [currentPage]) */
//console.log( configstate.searchTerm )
//console.log( searchTerm )
//console.log( configstate.searchTerm)
	
	//console.log( state.bxx )
	//const [ configstate, setConfigState ] = useState( initialsettings )
	//const [ products, setProducts ]	= useState( [] )

	fetch(`http://localhost/kids-toy/wp-json/wc/store/v1/products`)
	.then(response => {
			// Extract the total number of products from the headers
			const totalPages = response.headers.get('X-WP-TotalPages');
			console.log('Total products:', totalPages);
			setTotalPages( totalPages )
			// Parse the JSON response
			return response.json();
	})
	.then(products => {
			// Do something with the products data
			//console.log(products);
	})
	.catch(error => {
			console.error('Error fetching products:', error);
	})
	
	const fetchProducts = useCallback(() => {
		//setConfigState( {...configstate, isLoading: true} )
		setIsLoading(true)
		let apiPath = `/wc/store/v1/products?paged=${currentPage}&per_page=${paginationCount}`
		if ( searchTerm ) {
				apiPath += `&search=${encodeURIComponent( searchTerm )}`
		}
		apiFetch({ path: apiPath })
				.then((response) => {          
          setWooProducts( response )
					setIsLoading(false)          
					//setConfigState( {...configstate, totalPages: response.total_pages} )
					//setConfigState( {...configstate, isLoading: false} )					
				})
				.catch((error) => {
						console.error('Error fetching products:', error)
						//setConfigState( {...configstate, isLoading: false} )
						setIsLoading(false)
				});
}, [ currentPage, paginationCount, searchTerm ] )

useEffect(() => {
	fetchProducts();
}, [fetchProducts])

//console.log( productList )

/* async function getData() {
	const url = "http://localhost/kids-toy/wp-json/wc/store/v1/products";
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		console.log(json);	
		
	} catch (error) {
		console.error(error.message);
	}
} */

//getData()

/* apiFetch( { path: '/wc/store/v1/products?page=1&per_page=20' } ).then( ( products ) => {
	console.log( products );
} ); */ 

/* fetch('http://localhost/kids-toy/wp-json/wc/store/v1/products')
    .then(response => {
        // Extract the total number of products from the headers
        const totalProducts = response.headers.get('X-WP-Total');
        console.log('Total products:', totalProducts);
        
        // Parse the JSON response
        return response.json();
    })
    .then(products => {
        // Do something with the products data
        console.log(products);
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    }); */ 
		

  

	

	

	

	return (		
		<div { ...blockProps }>
			<StateContext.Provider value={ { searchTerm, setSearchTerm, currentPage, setCurrentPage, totalPages, setTotalPages, isLoading, setIsLoading, paginationCount, setPagination, configstate, setConfigState } }>
			<ItemGrid item={ wootype }/>
			<BXGYFirstScreen/>
			<ProductList products={ wooProducts } searchterm={ configstate.searchTerm }/>			
			<p >
				{ __(
					'My First Interactive Block – hello from the editor!',
					'bundle-builder-woo-lang'
				) }
			</p>
			<Button >Hooray!</Button>
			<Button onClick={ () => handleClick() }>set bxx</Button>
			</StateContext.Provider>
		</div>			
	)
}

