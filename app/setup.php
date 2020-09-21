<?php

namespace App;

use Roots\Sage\Container;
use Roots\Sage\Assets\JsonManifest;
use Roots\Sage\Template\Blade;
use Roots\Sage\Template\BladeProvider;

/**
 * Theme assets
 */
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('sage/main.css', asset_path('styles/main.css'), false, null);
    wp_enqueue_script('sage/main.js', asset_path('scripts/main.js'), null, null, true);

    if ( !is_admin() && !is_customize_preview() ) {
        wp_deregister_script('jquery');
        wp_deregister_script('wp-embed');
    }

    if (is_single() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}, 100);

remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

/**
 * Theme setup
 */
add_action('after_setup_theme', function () {
    /**
     * Enable features from Soil when plugin is activated
     * @link https://roots.io/plugins/soil/
     */
    add_theme_support('soil-clean-up');
    add_theme_support('soil-jquery-cdn');
    add_theme_support('soil-nav-walker');
    add_theme_support('soil-nice-search');
    add_theme_support('soil-relative-urls');

    /**
     * Enable plugins to manage the document title
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');

    /**
     * Register navigation menus
     * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
     */
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage')
    ]);

    /**
     * Enable post thumbnails
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable HTML5 markup support
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);

    /**
     * Enable selective refresh for widgets in customizer
     * @link https://developer.wordpress.org/themes/advanced-topics/customizer-api/#theme-support-in-sidebars
     */
    add_theme_support('customize-selective-refresh-widgets');

    /**
     * Use main stylesheet for visual editor
     * @see resources/assets/styles/layouts/_tinymce.scss
     */
    add_editor_style(asset_path('styles/main.css'));

}, 20);

/**
 * Register custom post types
 */

function create_project_post_type() {
    register_post_type('projects',
       array(
          'labels' => array(
             'name' => __('Projects'),
             'singular_name' => __('Project')
          ),
          'public' => true,
          'has_archive' => true,
          'rewrite' => array(
              'slug' => 'projects',
              'with_front' => false
          ),
          'menu_icon' => 'dashicons-camera-alt',
          'menu_position' => 4,
          'show_in_rest' => true,
          'supports' => array('title','thumbnail','excerpt','editor', 'revisions'),
       )
    );
}

add_action('init', 'App\create_project_post_type');

function add_acf_columns ( $columns ) {
    $position = 2;
    return array_slice($columns, 0, $position, true) + array('project_name'   => __( 'Project name' )) + array_slice($columns, $position, NULL, true);
 }
 add_filter( 'manage_projects_posts_columns', 'App\add_acf_columns');

/*
 * Add columns to project post list
 */
 function project_custom_column ( $column, $post_id ) {
   switch ( $column ) {
      case 'project_name':
       echo get_post_meta ( $post_id, 'project_name', true );
       break;
   }
 }
add_action ( 'manage_projects_posts_custom_column', 'App\project_custom_column', -50, 3 );

function create_scrap_post_type() {
    register_post_type('scraps',
       array(
          'labels' => array(
             'name' => __('Sketchbook'),
             'singular_name' => __('Sketch')
          ),
          'public' => true,
          'has_archive' => true,
          'rewrite' => array(
              'slug' => 'sketchbook',
              'with_front' => false
          ),
          'menu_icon' => 'dashicons-pressthis',
          'menu_position' => 4,
          'show_in_rest' => true,
          'supports' => array('title','thumbnail','author','editor'),
       )
    );
}

add_action('init', 'App\create_scrap_post_type');

/**
 * Add services taxonomy to projects
 */

function project_services_taxonomy() {
    register_taxonomy(
        'projectservices',  // The name of the taxonomy. Name should be in slug form (must not contain capital letters or spaces).
        'projects',             // post type name
        array(
            'hierarchical' => false,
            'label' => 'Services', // display name
            'query_var' => false,
            'show_ui' => true,
            'show_admin_column' => true,
            'show_in_rest' => true,
            'rewrite' => array(
                'slug' => 'service',    // This controls the base slug that will display before each term
                'with_front' => false  // Don't display the category base before
            )
        )
    );
}
add_action( 'init', 'App\project_services_taxonomy');

/**
 * Trying out gutenberg templates...
 */
add_action( 'init', function() {
    $post_type_object = get_post_type_object( 'projects' );
    $post_type_object->template = array(
        array( 'core/paragraph', array(
          'placeholder' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ) ),
        array( 'core/paragraph', array(
          'placeholder' => ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ) ),
        array( 'core/separator', array(
            'className' => 'is-style-wide'
        ) ),
    );
    // $post_type_object->template_lock = 'all';
});

/**
 * Remove comments
 */

// Removes from admin menu
add_action( 'admin_menu', 'App\remove_admin_menus' );
function remove_admin_menus() {
  remove_menu_page( 'edit-comments.php' );
  // remove_menu_page( 'upload.php' );
}
// Removes from post and pages
add_action('init', 'App\remove_comment_support', 100);

function remove_comment_support() {
  remove_post_type_support( 'post', 'comments' );
  remove_post_type_support( 'page', 'comments' );
}
// Removes from admin bar
function admin_bar_render() {
  global $wp_admin_bar;
  $wp_admin_bar->remove_menu('comments');
}
add_action( 'wp_before_admin_bar_render', 'App\admin_bar_render' );

/**
 * Register sidebars
 */
// add_action('widgets_init', function () {
//     $config = [
//         'before_widget' => '<section class="widget %1$s %2$s">',
//         'after_widget'  => '</section>',
//         'before_title'  => '<h3>',
//         'after_title'   => '</h3>'
//     ];
//     register_sidebar([
//         'name'          => __('Footer', 'sage'),
//         'id'            => 'sidebar-footer'
//     ] + $config);
// });

/**
 * Updates the `$post` variable on each iteration of the loop.
 * Note: updated value is only available for subsequently loaded views, such as partials
 */
add_action('the_post', function ($post) {
    sage('blade')->share('post', $post);
});

/**
 * Change URL base for authors
 */

function custom_author_base() {
    global $wp_rewrite;
    $wp_rewrite->author_base = 'about';
    $wp_rewrite->author_structure = '/' . $wp_rewrite->author_base . '/%author%';
}

add_action( 'init', 'App\custom_author_base' );

/**
 * Setup Sage options
 */
add_action('after_setup_theme', function () {
    /**
     * Add JsonManifest to Sage container
     */
    sage()->singleton('sage.assets', function () {
        return new JsonManifest(config('assets.manifest'), config('assets.uri'));
    });

    /**
     * Add Blade to Sage container
     */
    sage()->singleton('sage.blade', function (Container $app) {
        $cachePath = config('view.compiled');
        if (!file_exists($cachePath)) {
            wp_mkdir_p($cachePath);
        }
        (new BladeProvider($app))->register();
        return new Blade($app['view']);
    });

    /**
     * Create @asset() Blade directive
     */
    sage('blade')->compiler()->directive('asset', function ($asset) {
        return "<?= " . __NAMESPACE__ . "\\asset_path({$asset}); ?>";
    });

    add_filter('acf/settings/show_admin', '__return_false');

    if( function_exists('acf_add_local_field_group') ) {

        acf_add_local_field_group(array(
        	'key' => 'group_5e73f7567635f',
        	'title' => 'User image',
        	'fields' => array(
        		array(
        			'key' => 'field_5e73f7600cc5a',
        			'label' => 'Image',
        			'name' => 'image',
        			'type' => 'image',
        			'instructions' => '',
        			'required' => 0,
        			'conditional_logic' => 0,
        			'wrapper' => array(
        				'width' => '',
        				'class' => '',
        				'id' => '',
        			),
        			'return_format' => 'id',
        			'preview_size' => 'medium',
        			'library' => 'all',
        			'min_width' => '',
        			'min_height' => '',
        			'min_size' => '',
        			'max_width' => '',
        			'max_height' => '',
        			'max_size' => '',
        			'mime_types' => '',
        		),
        	),
        	'location' => array(
        		array(
        			array(
        				'param' => 'user_form',
        				'operator' => '==',
        				'value' => 'all',
        			),
        		),
        	),
        	'menu_order' => -1,
        	'position' => 'acf_after_title',
        	'style' => 'default',
        	'label_placement' => 'top',
        	'instruction_placement' => 'label',
        	'hide_on_screen' => '',
        	'active' => true,
        	'description' => '',
        ));

        acf_add_local_field_group(array(
        	'key' => 'group_5e2ae18188f0c',
        	'title' => 'Category',
        	'fields' => array(
        		array(
        			'key' => 'field_5e2ae1cf59e37',
        			'label' => 'Category',
        			'name' => 'category',
        			'type' => 'taxonomy',
        			'instructions' => '',
        			'required' => 0,
        			'conditional_logic' => 0,
        			'wrapper' => array(
        				'width' => '',
        				'class' => '',
        				'id' => '',
        			),
        			'taxonomy' => 'category',
        			'field_type' => 'radio',
        			'allow_null' => 0,
        			'add_term' => 0,
        			'save_terms' => 1,
        			'load_terms' => 1,
        			'return_format' => 'object',
        			'multiple' => 0,
        		),
        	),
        	'location' => array(
        		array(
        			array(
        				'param' => 'post_type',
        				'operator' => '==',
        				'value' => 'post',
        			),
        		),
        	),
        	'menu_order' => 0,
        	'position' => 'side',
        	'style' => 'default',
        	'label_placement' => 'top',
        	'instruction_placement' => 'label',
        	'hide_on_screen' => array(
        		0 => 'discussion',
        		1 => 'comments',
        		2 => 'categories',
        		3 => 'tags',
        		4 => 'send-trackbacks',
        	),
        	'active' => true,
        	'description' => '',
        ));

        acf_add_local_field_group(array(
        	'key' => 'group_5e729da14c9c9',
        	'title' => 'Contact details',
        	'fields' => array(
        		array(
        			'key' => 'field_5e729da86cc72',
        			'label' => 'Twitter',
        			'name' => 'twitter',
        			'type' => 'text',
        			'instructions' => 'e.g. TransitionByD',
        			'required' => 0,
        			'conditional_logic' => 0,
        			'wrapper' => array(
        				'width' => '',
        				'class' => '',
        				'id' => '',
        			),
        			'default_value' => '',
        			'placeholder' => '',
        			'prepend' => '@',
        			'append' => '',
        			'maxlength' => '',
        		),
        		array(
        			'key' => 'field_5e729e3b6cc74',
        			'label' => 'Instagram',
        			'name' => 'instagram',
        			'type' => 'text',
        			'instructions' => 'e.g. TransitionByD',
        			'required' => 0,
        			'conditional_logic' => 0,
        			'wrapper' => array(
        				'width' => '',
        				'class' => '',
        				'id' => '',
        			),
        			'default_value' => '',
        			'placeholder' => '',
        			'prepend' => '@',
        			'append' => '',
        			'maxlength' => '',
        		),
        		array(
        			'key' => 'field_5e729e376cc73',
        			'label' => 'Phone number',
        			'name' => 'phone_number',
        			'type' => 'text',
        			'instructions' => '',
        			'required' => 0,
        			'conditional_logic' => 0,
        			'wrapper' => array(
        				'width' => '',
        				'class' => '',
        				'id' => '',
        			),
        			'default_value' => '',
        			'placeholder' => '',
        			'prepend' => '',
        			'append' => '',
        			'maxlength' => '',
        		),
        	),
        	'location' => array(
        		array(
        			array(
        				'param' => 'user_form',
        				'operator' => '==',
        				'value' => 'all',
        			),
        		),
        	),
        	'menu_order' => 0,
        	'position' => 'normal',
        	'style' => 'default',
        	'label_placement' => 'top',
        	'instruction_placement' => 'label',
        	'hide_on_screen' => '',
        	'active' => true,
        	'description' => 'Additional contact details shown on user\'s public page',
        ));

        acf_add_local_field_group(array(
        	'key' => 'group_5eee1e4340dba',
        	'title' => 'Image options',
        	'fields' => array(
        		array(
        			'key' => 'field_5eee1e4e8c9df',
        			'label' => 'Background colour',
        			'name' => 'image_colour',
        			'type' => 'select',
        			'instructions' => '',
        			'required' => 0,
        			'conditional_logic' => 0,
        			'wrapper' => array(
        				'width' => '',
        				'class' => '',
        				'id' => '',
        			),
        			'choices' => array(
        				'white' => 'White',
        				'feather' => 'Feather',
        				'light' => 'Light',
        				'medium' => 'Medium',
        				'heavy' => 'Heavy',
        			),
        			'default_value' => array(
        				0 => 'white',
        			),
        			'allow_null' => 0,
        			'multiple' => 0,
        			'ui' => 0,
        			'return_format' => 'value',
        			'ajax' => 0,
        			'placeholder' => '',
        		),
        		array(
        			'key' => 'field_5eee1ee38c9e0',
        			'label' => 'Texture',
        			'name' => 'image_texture',
        			'type' => 'select',
        			'instructions' => '',
        			'required' => 0,
        			'conditional_logic' => 0,
        			'wrapper' => array(
        				'width' => '',
        				'class' => '',
        				'id' => '',
        			),
        			'choices' => array(
        				'none' => 'None',
        				'noise' => 'Noise',
        				'grunge' => 'Grunge',
        				'concrete' => 'Concrete',
        				'paper' => 'Paper',
        				'asphalt' => 'Asphalt',
        			),
        			'default_value' => array(
        				0 => 'none',
        			),
        			'allow_null' => 0,
        			'multiple' => 0,
        			'ui' => 0,
        			'return_format' => 'value',
        			'ajax' => 0,
        			'placeholder' => '',
        		),
        		array(
        			'key' => 'field_5eee1ef58c9e1',
        			'label' => 'Size',
        			'name' => 'image_size',
        			'type' => 'select',
        			'instructions' => '‘Bleed’ will extend the image to cover the tile and is recommended for photos. ‘Fit’ will work best with illustrations with a transparent background.',
        			'required' => 0,
        			'conditional_logic' => 0,
        			'wrapper' => array(
        				'width' => '',
        				'class' => '',
        				'id' => '',
        			),
        			'choices' => array(
        				'bleed' => 'Bleed',
        				'fit' => 'Fit',
        				'pad_small' => 'Pad (small)',
        				'pad_medium' => 'Pad (medium)',
        				'pad_large' => 'Pad (large)',
        			),
        			'default_value' => array(
        				0 => 'pad_small',
        			),
        			'allow_null' => 0,
        			'multiple' => 0,
        			'ui' => 0,
        			'return_format' => 'value',
        			'ajax' => 0,
        			'placeholder' => '',
        		),
        		array(
        			'key' => 'field_5eee1f7f8c9e2',
        			'label' => 'Blend',
        			'name' => 'image_blend',
        			'type' => 'true_false',
        			'instructions' => 'Attempts to blend the image with its background.',
        			'required' => 0,
        			'conditional_logic' => 0,
        			'wrapper' => array(
        				'width' => '',
        				'class' => '',
        				'id' => '',
        			),
        			'message' => '',
        			'default_value' => 0,
        			'ui' => 0,
        			'ui_on_text' => '',
        			'ui_off_text' => '',
        		),
        	),
        	'location' => array(
        		array(
        			array(
        				'param' => 'post_type',
        				'operator' => '==',
        				'value' => 'scraps',
        			),
        		),
        	),
        	'menu_order' => 0,
        	'position' => 'side',
        	'style' => 'default',
        	'label_placement' => 'top',
        	'instruction_placement' => 'label',
        	'hide_on_screen' => '',
        	'active' => true,
        	'description' => '',
        ));

        acf_add_local_field_group(array(
        	'key' => 'group_5e72c4fe8c111',
        	'title' => 'Position',
        	'fields' => array(
        		array(
        			'key' => 'field_5e72c50806e45',
        			'label' => 'Position',
        			'name' => 'position',
        			'type' => 'text',
        			'instructions' => 'Position within organisation, e.g. Housing lead',
        			'required' => 0,
        			'conditional_logic' => 0,
        			'wrapper' => array(
        				'width' => '',
        				'class' => '',
        				'id' => '',
        			),
        			'default_value' => '',
        			'placeholder' => '',
        			'prepend' => '',
        			'append' => '',
        			'maxlength' => '',
        		),
        	),
        	'location' => array(
        		array(
        			array(
        				'param' => 'user_form',
        				'operator' => '==',
        				'value' => 'all',
        			),
        		),
        	),
        	'menu_order' => 0,
        	'position' => 'acf_after_title',
        	'style' => 'default',
        	'label_placement' => 'top',
        	'instruction_placement' => 'label',
        	'hide_on_screen' => '',
        	'active' => true,
        	'description' => '',
        ));

        acf_add_local_field_group(array(
        	'key' => 'group_5df3d34069244',
        	'title' => 'Project details',
        	'fields' => array(
        		array(
        			'key' => 'field_5df3d37780a54',
        			'label' => 'Project name',
        			'name' => 'project_name',
        			'type' => 'text',
        			'instructions' => '',
        			'required' => 0,
        			'conditional_logic' => 0,
        			'wrapper' => array(
        				'width' => '',
        				'class' => '',
        				'id' => '',
        			),
        			'default_value' => '',
        			'placeholder' => 'e.g. Manor Farm',
        			'prepend' => '',
        			'append' => '',
        			'maxlength' => '',
        		),
        		array(
        			'key' => 'field_5df3d4b480a55',
        			'label' => 'Footnotes',
        			'name' => 'project_footnotes',
        			'type' => 'wysiwyg',
        			'instructions' => 'Displayed at the end of case studies.',
        			'required' => 0,
        			'conditional_logic' => 0,
        			'wrapper' => array(
        				'width' => '',
        				'class' => '',
        				'id' => '',
        			),
        			'default_value' => '',
        			'tabs' => 'all',
        			'toolbar' => 'basic',
        			'media_upload' => 0,
        			'delay' => 1,
        		),
        	),
        	'location' => array(
        		array(
        			array(
        				'param' => 'post_type',
        				'operator' => '==',
        				'value' => 'projects',
        			),
        		),
        	),
        	'menu_order' => 0,
        	'position' => 'side',
        	'style' => 'default',
        	'label_placement' => 'top',
        	'instruction_placement' => 'label',
        	'hide_on_screen' => '',
        	'active' => true,
        	'description' => '',
        ));
    }

});
