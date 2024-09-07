<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Generate unique id for aria-controls.
$unique_id = wp_unique_id( 'p-' );
$context = array(
  'bx' => array(33, 34),
  'gy' => array(20),  
);
print_r($attributes);
?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="create-block"
	<?php echo wp_interactivity_data_wp_context( array( 'isOpen' => false ) ); ?>
	data-wp-watch="callbacks.logIsOpen"
>

<div>
  
  <form id="add-products-form" method="post" >
    <input type="hidden" name="bx" value="<?php echo esc_attr(json_encode($context['bx'])); ?>">
    <input type="hidden" name="gy" value="<?php echo esc_attr(json_encode($context['gy'])); ?>">
    <button type="submit" name="custom_add_to_cart">Add Products to Cart</button>
  </form>

	<!-- <form id="custom-product-form" method="post" action="">
    <input type="hidden" name="add_product_ids" value="516, 517">
    <input type="hidden" name="free_product_ids" value="503">
    <button type="submit" name="custom_add_to_cart" value="1">Add to Cart</button>
	</form> -->

  
</div>


	<!-- <button
		data-wp-on--click="actions.toggle"
		data-wp-bind--aria-expanded="context.isOpen"
		aria-controls="<?php echo esc_attr( $unique_id ); ?>"
	>
		<?php esc_html_e( 'Toggle', 'my-first-interactive-block' ); ?>
	</button>

	<p
		id="<?php echo esc_attr( $unique_id ); ?>"
		data-wp-bind--hidden="!context.isOpen"
	>
		<?php
			esc_html_e( 'My First Interactive Block - hello from an interactive block!', 'my-first-interactive-block' );
		?>
	</p> -->
</div>


