const { registerCheckoutFilters } = window.wc.blocksCheckout
const modifyCartItemClass = ( defaultValue, extensions, args ) => {
	const isCartContext = args?.context === 'cart';

	if ( ! isCartContext ) {
		return defaultValue;
	}

	return 'my-custom-class-pinaki';
}

registerCheckoutFilters( 'bundle-builder-woo', {
  saleBadgePriceFormat: ( value, extensions, args ) => {
    // Return early since this filter is not being applied in the Cart context.
    // We must return the original value we received here.
    //console.log(args.cart)
		if ( args?.context !== 'cart' ) {
      return value;
    }
    return '<price/> PER ITEM';		
  },
	cartItemClass: modifyCartItemClass,
} )


const cartItems = wp.data.select('wc/store/cart').getCartData().items
console.log( cartItems )
zeroPriceProductIds = [20]
const free_prod = BXGY.free_product

wp.data.subscribe( () => {
  if (cartItems && cartItems.length > 0) {
    cartItems.forEach(item => {
      if (zeroPriceProductIds.includes(item.id)) {
        const incrementButton = document.querySelector(`.wc-block-components-quantity-selector__button--plus[aria-label="Increase quantity of ${item.name}"]`);      
        if (incrementButton) {
          incrementButton.setAttribute('disabled', 'disabled');
      }      
      }
    });
  }
})


