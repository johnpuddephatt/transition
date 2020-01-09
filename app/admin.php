<?php

namespace App;

/**
 * Theme customizer
 */
add_action('customize_register', function (\WP_Customize_Manager $wp_customize) {
    // Add postMessage support
    $wp_customize->get_setting('blogname')->transport = 'postMessage';
    $wp_customize->selective_refresh->add_partial('blogname', [
        'selector' => '.brand',
        'render_callback' => function () {
            bloginfo('name');
        }
    ]);
});

/**
 * Customizer JS
 */
add_action('customize_preview_init', function () {
    wp_enqueue_script('sage/customizer.js', asset_path('scripts/customizer.js'), ['customize-preview'], null, true);
});

/**
 * Hide WP Admin on frontend
 */
add_action('after_setup_theme', function(){
    show_admin_bar(false);
});

/**
 * Hide ACF from non-admins
 */
add_filter('acf/settings/show_admin', function ($show) {
    return current_user_can('manage_options');
});

/**
 * Disable custom colours
 */
add_action( 'after_setup_theme', function() {
    add_theme_support( 'disable-custom-colors' );
    add_theme_support(
		'editor-color-palette', array(
			array(
				'name'  => esc_html__( 'Black', '@@textdomain' ),
				'slug' => 'black',
				'color' => '#2a2a2a',
			),
			array(
				'name'  => esc_html__( 'Vanilla', '@@textdomain' ),
				'slug' => 'vanilla',
				'color' => '#d2bfab',
			),
            array(
                'name'  => esc_html__( 'White', '@@textdomain' ),
                'slug' => 'white',
                'color' => '#ffffff',
            )
		)
	);
} );

/**
 * Register our Gutenberg customisations
 */

add_action( 'enqueue_block_editor_assets', function() {
    wp_enqueue_script(
        'myguten', asset_path('scripts/gutenberg.js'),
        array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' ),
    );
});

add_action( 'enqueue_block_assets', function() {
    if(is_admin()) {
        wp_enqueue_style( 'myguten-style', asset_path('styles/gutenberg.css') );
    }
} );
