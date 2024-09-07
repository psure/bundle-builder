import { DataViews, filterSortAndPaginate } from '@wordpress/dataviews';
import { useState, useMemo, UseEffect } from '@wordpress/element';
import { getTopicsElementsFormat } from './utils';

const pageurl = window.location.href
const match = pageurl.match(/(.*)\/wp-admin/)
const siteUrl = match ? match[1] : null

// source "data" definition
const allProducts = fetch(`${siteUrl}/wp-json/wc/store/v1/products?per_page=20`).then( response => response.json()).then(products => products)

async function getData() {
	const url = `${siteUrl}/wp-json/wc/store/v1/products?per_page=20`;
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
}

getData()




// "defaultLayouts" definition
const primaryField = 'id';
const nameField = 'name'
const mediaField = 'img_src';
const priceField = 'price'

const defaultLayouts = {
	table: {
		layout: {
			primaryField,
			nameField,
			priceField,
			mediaField,
		},
	},
	/* grid: {
		layout: {
			primaryField,
			mediaField,
		},
	}, */
};

// "fields" definition
const fields = [
	{
		id: 'img_src',
		label: 'Image',
		render: ( { item } ) => (
			<img alt={ item.images[0].alt } src={ item.images[0].thumbnail } />
		),
		enableSorting: false,
	},
	{
		id: 'id',
		label: 'ID',
		enableGlobalSearch: true,
	},
	{
		id: 'author',
		label: 'Author',
		getValue: ( { item } ) =>
			`${ item.user.first_name } ${ item.user.last_name }`,
		render: ( { item } ) => (
			<a target="_blank" href={ item.user.url } rel="noreferrer">
				{ item.user.first_name } { item.user.last_name }
			</a>
		),
		enableGlobalSearch: true,
	},
	{
		id: 'alt_description',
		label: 'Description',
		enableGlobalSearch: true,
	},
	{
		id: 'topics',
		label: 'Topics',
		elements: getTopicsElementsFormat( dataPhotos ),
		render: ( { item } ) => {
			return (
				<div className="topic_photos">
					{ item.topics.map( ( topic ) => (
						<span key={ topic } className="topic_photo_item">
							{ topic.toUpperCase() }
						</span>
					) ) }
				</div>
			);
		},
		filterBy: {
			operators: [ 'isAny', 'isNone', 'isAll', 'isNotAll' ],
		},
		enableSorting: false,
	},
	{
		id: 'width',
		label: 'Width',
		getValue: ( { item } ) => parseInt( item.width ),
		enableSorting: true,
	},
	{
		id: 'height',
		label: 'Height',
		getValue: ( { item } ) => parseInt( item.height ),
		enableSorting: true,
	},
];
const DataProductsTable = () => {
	// "view" and "setView" definition
		
	const [ view, setView ] = useState( {
		type: 'table',
		perPage: 10,
		layout: defaultLayouts.table.layout,
		fields: [
			'img_src',
			'id',
			'alt_description',
			'author',
			'topics',
			'width',
			'height',
		],
	} );

	// "processedData" and "paginationInfo" definition
	const { data: processedData, paginationInfo } = useMemo( () => {
		return filterSortAndPaginate( dataPhotos, view, fields );
	}, [ view ] );

	// "actions" definition
	const actions = [
		{
			id: 'see-original',
			label: 'See Original',
			callback: ( [ item ] ) => {
				const urlImage = item.urls.raw;
				window.open( urlImage, '_blank' );
			},
		},
	];
	return (
		<DataViews
			data={ processedData }
			fields={ fields }
			view={ view }
			onChangeView={ setView }
			defaultLayouts={ defaultLayouts }
			actions={ actions }
			paginationInfo={ paginationInfo }
		/>
	);
};

export default DataProductsTable;