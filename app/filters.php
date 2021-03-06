<?php

namespace App;

/**
 * Add <body> classes
 */
add_filter('body_class', function (array $classes) {
    /** Add page slug if it doesn't exist */
    if (is_single() || is_page() && !is_front_page()) {
        if (!in_array(basename(get_permalink()), $classes)) {
            $classes[] = basename(get_permalink());
        }
    }

    /** Add class if sidebar is active */
    if (display_sidebar()) {
        $classes[] = 'sidebar-primary';
    }

    if(($_SERVER['SERVER_NAME'] ?? '') === parse_url(($_SERVER['HTTP_REFERER'] ?? ''), PHP_URL_HOST)) {
        $classes[] = 'internal-referer';
    }

    if (isset($_SERVER['HTTP_X_BARBA'])) {
        $classes[] = 'barba-loaded';
    }

    /** Clean up class names for custom templates */
    $classes = array_map(function ($class) {
        return preg_replace(['/-blade(-php)?$/', '/^page-template-views/'], '', $class);
    }, $classes);

    return array_filter($classes);
});

/**
 * Add "… Continued" to the excerpt
 */
add_filter('excerpt_more', function () {
    // return '&hellip;&nbsp;&nbsp; Read more&nbsp;&rarr;';
    return '&hellip;';
});

add_filter( 'excerpt_length', function($length) {
    return 20;
} );

/**
 * Image sizes
 */
add_image_size( 'wide', 1480, 800, true );
add_image_size( 'wide_m', 1110, 600, true );
add_image_size( 'wide_s', 740, 400, true );
add_image_size( 'wide_xs', 370, 200, true );

add_image_size( 'tall', 480, 648, true );
add_image_size( 'tall_m', 360, 486, true );
add_image_size( 'tall_s', 240, 324, true );

add_image_size( 'square_l', 640, 640, true );
add_image_size( 'square', 480, 480, true );
add_image_size( 'square_s', 240, 240, true );

add_filter( 'image_size_names_choose', function ( $sizes ) {
    $sizes['wide'] = 'Wide';
    $sizes['tall'] = 'Tall';
    $sizes['square'] = 'Square';
    return $sizes;
}, 11, 1 );

/**
 * Template Hierarchy should search for .blade.php files
 */
collect([
    'index', '404', 'archive', 'author', 'category', 'tag', 'taxonomy', 'date', 'home',
    'frontpage', 'page', 'paged', 'search', 'single', 'singular', 'attachment', 'embed'
])->map(function ($type) {
    add_filter("{$type}_template_hierarchy", __NAMESPACE__.'\\filter_templates');
});

/**
 * Render page using Blade
 */
add_filter('template_include', function ($template) {
    collect(['get_header', 'wp_head'])->each(function ($tag) {
        ob_start();
        do_action($tag);
        $output = ob_get_clean();
        remove_all_actions($tag);
        add_action($tag, function () use ($output) {
            echo $output;
        });
    });
    $data = collect(get_body_class())->reduce(function ($data, $class) use ($template) {
        return apply_filters("sage/template/{$class}/data", $data, $template);
    }, []);
    if ($template) {
        echo template($template, $data);
        return get_stylesheet_directory().'/index.php';
    }
    return $template;
}, PHP_INT_MAX);

/**
 * Render comments.blade.php
 */
add_filter('comments_template', function ($comments_template) {
    $comments_template = str_replace(
        [get_stylesheet_directory(), get_template_directory()],
        '',
        $comments_template
    );

    $data = collect(get_body_class())->reduce(function ($data, $class) use ($comments_template) {
        return apply_filters("sage/template/{$class}/data", $data, $comments_template);
    }, []);

    $theme_template = locate_template(["views/{$comments_template}", $comments_template]);

    if ($theme_template) {
        echo template($theme_template, $data);
        return get_stylesheet_directory().'/index.php';
    }

    return $comments_template;
}, 100);
