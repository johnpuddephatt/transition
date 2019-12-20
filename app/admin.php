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
