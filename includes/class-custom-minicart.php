<?php
namespace MyNamespace\WooCommerce;

use Automattic\WooCommerce\Blocks\BlockTypes\MiniCart;

class CustomMiniCart {

    public function __construct() {
        // Hook into WooCommerce Blocks initialization.
        
        add_action('woocommerce_blocks_loaded', [$this, 'register_customizations']);
    }

    public function register_customizations() {
        // Modify mini cart settings or behavior.
        add_filter('woocommerce_blocks_mini_cart_settings', [$this, 'custom_mini_cart_settings'], 10);
    }

    public function custom_mini_cart_settings($settings) {
        // Customize the settings.
        $settings['showProductImages'] = false;
        $settings['showPrice'] = false;
        $settings['showRemoveButton'] = true;

        // Debug output to confirm filter application.
        //error_log('Mini cart settings modified: ' . print_r($settings, true));

        return $settings;
    }
}
