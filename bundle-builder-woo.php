<?php
/**
 * Plugin Name:       Bundle Builder Woo
 * Description:       Bundle Builder For WooCommerce
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Pinaki
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bundle-builder-woo-lang
 *
 * @package           bundle-builder-woo-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Include necessary files.
//require_once plugin_dir_path( __FILE__ ) . 'includes/className-custom-minicart.php';

// Initialize the custom mini cart className.
/* add_action( 'plugins_loaded', function() {
    new MyNamespace\WooCommerce\CustomMiniCart();
}); */ 

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function bundle_builder_woo_block () {	
	register_block_type_from_metadata( __DIR__ . '/build' );    	
}
add_action( 'init', 'bundle_builder_woo_block' );

//add_filter( 'woocommerce_store_api_disable_nonce_check', '__return_true' );

add_action('template_redirect', 'custom_add_to_cart');

function custom_add_to_cart() {
    if (isset($_POST['custom_add_to_cart']) ) {
        //$add_product_ids = explode(',', sanitize_text_field($_POST['add_product_ids']));
        //$free_product_ids = explode(',', sanitize_text_field($_POST['free_product_ids']));

        $bx = isset($_POST['bx']) ? json_decode(stripslashes($_POST['bx']), true) : [];
        $gy = isset($_POST['gy']) ? json_decode(stripslashes($_POST['gy']), true) : [];

        // Check if the option already exists
        if (get_option('free_prod') === false) {
            // Option does not exist, add it
            add_option('free_prod', $gy);
        } else {
            // Option exists, update it
            update_option('free_prod', $gy);
        }

        // Check if the option already exists
        if (get_option('paid_prod') === false) {
            // Option does not exist, add it
            add_option('paid_prod', $bx);
        } else {
            // Option exists, update it
            update_option('paid_prod', $bx);
        }

        // Add the regular products to the cart
        foreach ($bx as $product_id) {
            WC()->cart->add_to_cart($product_id);
        }

        // Add the free products to the cart with a custom meta to indicate they should be free
        foreach ($gy as $product_id) {            
            WC()->cart->add_to_cart($product_id, 1, '', '', array('custom_price' => 0));
        }        
        
        // Redirect to avoid resubmitting the form
        //wp_redirect(wc_get_cart_url());
        //exit;
    }
}


add_action('woocommerce_before_calculate_totals', 'custom_adjust_cart_item_prices');
function custom_adjust_cart_item_prices($cart) {
    if (is_admin() && !defined('DOING_AJAX')) {
        return;
    }

    foreach ($cart->get_cart() as $cart_item_key => $cart_item) {
        if (isset($cart_item['custom_price']) && $cart_item['custom_price'] == 0 ) {
           if ( $cart_item['quantity'] > 1 ) {
            $cart_item['data']->set_price( $cart_item['data']->get_regular_price() );
            //$cart_item['discount_amount'] = 0;
           } else {
            $cart_item['data']->set_price(0);
            //$cart_item['discount_amount'] = $cart_item['data']->get_regular_price();
           }                                   
        }        
    }
}

add_action('woocommerce_after_cart_item_quantity_update', 'restrict_cart_quantity', 10, 3);

function restrict_cart_quantity($cart_item_key, $quantity, $old_quantity) {
    $cart_item = WC()->cart->get_cart()[$cart_item_key];
    if (isset($cart_item['custom_price']) && $cart_item['custom_price'] == 0 ) { 
        if ( $quantity > 1 ) {
            WC()->cart->set_quantity( $cart_item_key, 1 );
            wc_add_notice(__("FREE product, quantity can't be more than 1", 'bundle-builder-woo-lang'), 'error');
            
        }
    }
}



add_action('wp_enqueue_scripts', 'enqueue_kidstoy_ajax_script');

function enqueue_kidstoy_ajax_script() {
    $free_prod = get_option('free_prod'); 
    $paid_prod = get_option('paid_prod');  
    
    /* if ( is_cart() ) {        
        wp_enqueue_script('kidstoy-ajax-script', plugin_dir_url(__FILE__) . 'js/custom_disable_block_cart_items.js', array(), '1.0.0', true);
        wp_add_inline_script( 'kidstoy-ajax-script', 'const BXGY = ' . json_encode( array(        
            'free_product' => $free_prod,
            'paid_product' => $paid_prod,
        )),);
    }  */
     
    wp_enqueue_script('kidstoy-global-cart-script', plugin_dir_url(__FILE__) . '/assets/js/block_cart_global_script.js');
    wp_add_inline_script( 'kidstoy-global-cart-script', 'const BXGY = ' . json_encode( array(        
        'free_product' => $free_prod,
        'paid_product' => $paid_prod,
    )), 'before' );     
    
}







