


//const globalCartItems = wp.data.select('wc/store/cart').getCartData().items
//console.log( globalCartItems )
/* const globalPriceProductIds = [503]
if (globalCartItems && globalCartItems.length > 0) {
  globalCartItems.forEach(item => {
    if (globalPriceProductIds.includes(item.id)) {
      const incrementButtonGlobal = document.querySelector(`.wc-block-components-quantity-selector__button--plus[aria-label="Increase quantity of ${item.name}"]`);      
      if (incrementButtonGlobal) {
        incrementButtonGlobal.setAttribute('disabled', 'disabled');
    }      
    }
  });
} */

  
const free_prod = BXGY.free_product
const paid_prod = BXGY.paid_product
const cart_prod = paid_prod.concat( free_prod )

/* if (cart_prod && cart_prod.length > 0) {
  cart_prod.forEach(item => {
    if (free_prod.includes(item.id)) {
      const incrementButtonGlobal = document.querySelector(`.wc-block-components-quantity-selector__button--plus[aria-label="Increase quantity of ${item.name}"]`);      
      if (incrementButtonGlobal) {
        incrementButtonGlobal.setAttribute('disabled', 'disabled');
    }      
    }
  })
} */

  async function getData() {
    const url = "http://localhost/kids-toy/wp-json/wc/store/v1/cart";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json.items);
      if (json.items && json.items.length > 0) {
        json.items.forEach(item => {
          if (free_prod.includes(item.id)) {
            const incrementButtonGlobal = document.querySelector(`.wc-block-components-quantity-selector__button--plus[aria-label="Increase quantity of ${item.name}"]`)     
            if (incrementButtonGlobal) {
              incrementButtonGlobal.setAttribute('disabled', 'disabled')
            }               
          }
        })
      }
      
    } catch (error) {
      console.error(error.message);
    }
  }
  getData() 

 