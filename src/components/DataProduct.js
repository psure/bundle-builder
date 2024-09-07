import { DataViews, filterSortAndPaginate } from '@wordpress/dataviews';
import { useState, useMemo, UseEffect } from '@wordpress/element';
import { getTopicsElementsFormat } from './utils';


// source "data" definition
const dataPhotos = [
  {
    id: "nwPxPBWY5JI",
    slug: "a-blue-bird-sitting-on-top-of-a-plant-covered-in-snow-nwPxPBWY5JI",
    width: 2818,
    color: "#c0c0d9",
    height: 4235,
    alt_description: "a blue bird sitting on top of a plant covered in snow",
    urls: {
      raw: "https://images.unsplash.com/photo-1710699915484-0b3541dc7265?ixid=M3wxNjgzM3wwfDF8dG9waWN8fEpwZzZLaWRsLUhrfHx8fHx8fDE3MjMyNzUyOTV8&ixlib=rb-4.0.3",
      full: "https://images.unsplash.com/photo-1710699915484-0b3541dc7265?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNjgzM3wwfDF8dG9waWN8fEpwZzZLaWRsLUhrfHx8fHx8fDE3MjMyNzUyOTV8&ixlib=rb-4.0.3&q=85",
      regular:
        "https://images.unsplash.com/photo-1710699915484-0b3541dc7265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjgzM3wwfDF8dG9waWN8fEpwZzZLaWRsLUhrfHx8fHx8fDE3MjMyNzUyOTV8&ixlib=rb-4.0.3&q=80&w=1080",
      small:
        "https://images.unsplash.com/photo-1710699915484-0b3541dc7265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjgzM3wwfDF8dG9waWN8fEpwZzZLaWRsLUhrfHx8fHx8fDE3MjMyNzUyOTV8&ixlib=rb-4.0.3&q=80&w=400",
      thumb:
        "https://images.unsplash.com/photo-1710699915484-0b3541dc7265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjgzM3wwfDF8dG9waWN8fEpwZzZLaWRsLUhrfHx8fHx8fDE3MjMyNzUyOTV8&ixlib=rb-4.0.3&q=80&w=200",
      small_s3:
        "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1710699915484-0b3541dc7265",
    },
    topics: ["animals"],
    user: {
      first_name: "Clayton",
      last_name: "Chase",
      url: "https://chasemade.com",
    },
  },
  {
    id: "tLRrSMCcdFQ",
    slug: "a-colorful-bird-perched-on-a-tree-branch-tLRrSMCcdFQ",
    width: 3368,
    color: "#26400c",
    height: 6000,
    alt_description: "A colorful bird perched on a tree branch",
    urls: {
      raw: "https://images.unsplash.com/photo-1723036123319-c47e12bb0f41?ixid=M3wxNjgzM3wwfDF8dG9waWN8fEpwZzZLaWRsLUhrfHx8fHx8fDE3MjMyNzUyOTV8&ixlib=rb-4.0.3",
      full: "https://images.unsplash.com/photo-1723036123319-c47e12bb0f41?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNjgzM3wwfDF8dG9waWN8fEpwZzZLaWRsLUhrfHx8fHx8fDE3MjMyNzUyOTV8&ixlib=rb-4.0.3&q=85",
      regular:
        "https://images.unsplash.com/photo-1723036123319-c47e12bb0f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjgzM3wwfDF8dG9waWN8fEpwZzZLaWRsLUhrfHx8fHx8fDE3MjMyNzUyOTV8&ixlib=rb-4.0.3&q=80&w=1080",
      small:
        "https://images.unsplash.com/photo-1723036123319-c47e12bb0f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjgzM3wwfDF8dG9waWN8fEpwZzZLaWRsLUhrfHx8fHx8fDE3MjMyNzUyOTV8&ixlib=rb-4.0.3&q=80&w=400",
      thumb:
        "https://images.unsplash.com/photo-1723036123319-c47e12bb0f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjgzM3wwfDF8dG9waWN8fEpwZzZLaWRsLUhrfHx8fHx8fDE3MjMyNzUyOTV8&ixlib=rb-4.0.3&q=80&w=200",
      small_s3:
        "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1723036123319-c47e12bb0f41",
    },
    topics: ["human"],
    user: {
      first_name: "Michael",
      last_name: "van Gorkum",
      url: "https://michaelvg.dev",
    },
  },
  
  
]

// "defaultLayouts" definition
const primaryField = 'id';
const mediaField = 'img_src';

const defaultLayouts = {
	table: {
		layout: {
			primaryField,
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
			<img alt={ item.alt_description } src={ item.urls.thumb } />
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
const DataProducts = () => {
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

export default DataProducts;