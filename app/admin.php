<?php

namespace App;

include 'inc/custom-controls.php';

/**
 * Theme customizer
 */
add_action('customize_register', function (\WP_Customize_Manager $wp_customize) {

    $wp_customize->remove_section( 'static_front_page' );
    $wp_customize->remove_section( 'custom_css' );

    $wp_customize->get_setting('blogdescription')->transport = 'postMessage';

    /*
    ** Home
    */

    $wp_customize->add_panel( 'home_panel', array(
        'priority'       => 10,
        'capability'     => 'edit_theme_options',
        'theme_supports' => '',
        'title'          => 'Homepage',
        'description'    => 'Settings relating to the homepage',
    ));

    // Home hero case study

    $wp_customize->add_section(
      'home_hero',
      array(
          'title' => 'Hero',
          'description' => '',
          'priority' => 15,
          'panel'=>'home_panel',
        )
    );

    $wp_customize->add_setting(
        'home_hero_project',
        array(
          'default' => '',
          'sanitize_callback' => 'absint'
        )
    );

    $wp_customize->add_control(
      'home_hero_project',
      array(
        'type' => 'select',
        'label' => 'Case study',
        'section' => 'home_hero',
        'settings' => 'home_hero_project',
        		'transport' => 'refresh',

        'choices' => array_reduce(
            get_posts( 'post_type=projects&posts_per_page=-1' ),
            function( $result, $item ) {
                $result[$item->ID] = $item->post_title;
                return $result;
            }
        ),
      )
    );

    $wp_customize->add_setting(
        'home_hero_image'
    );

    $wp_customize->add_control(
        new \WP_Customize_Image_Control(
          $wp_customize,
          'home_hero_image',
          array(
            'label' => 'Image',
            'section' => 'home_hero',
            'settings' => 'home_hero_image',
            'transport' => 'postMessage'
          )
        )
    );

    $wp_customize->add_setting(
        'home_hero_textures',
        array(
            'default' => 1,
        )
    );

    $wp_customize->add_control(
    'home_hero_textures',
        array(
          'type' => 'checkbox',
          'label' => 'Show textures?',
          'section' => 'home_hero'
        )
    );

    // Home about

    $wp_customize->add_section(
      'home_about',
      array(
          'title' => 'About',
          'description' => '',
          'priority' => 35,
          'panel'=>'home_panel',
      )
    );

    $wp_customize->add_setting(
        'home_about_text',
        array(
          'default' => 'We are Transition by Design, a cross-disciplinary design collective at the junction of architecture, strategic design and social change.',
          'sanitize_callback' => 'sanitize_textarea_field',
          'transport' => 'postMessage'
        )
    );

    $wp_customize->selective_refresh->add_partial('home_about_text', [
        'selector' => '.home-about--title',
        'container_inclusive' => false,
        'fallback_refresh' => false,
        'render_callback' => function() {
            echo get_theme_mod('home_about_text');
        }
    ]);

  $wp_customize->get_setting('home_about_text')->transport = 'postMessage';

  $wp_customize->add_control(
    'home_about_text',
    array(
      'type' => 'textarea',
      'label' => 'About text',
      'section' => 'home_about',
      'settings' => 'home_about_text',
    )
  );

  $wp_customize->add_setting(
    'home_about_button',
    array(
      'default' => 'More about who we are',
      'sanitize_callback' => 'sanitize_text_field',
      'transport' => 'postMessage'
    )
  );

  $wp_customize->selective_refresh->add_partial('home_about_button', [
      'selector' => '.home-about--button span',
      'container_inclusive' => false,
      'fallback_refresh' => false,
      'render_callback' => function() {
          echo get_theme_mod('home_about_button');
      }
  ]);

  $wp_customize->get_setting('home_about_button')->transport = 'postMessage';

  $wp_customize->add_control(
    'home_about_button',
    array(
      'label' => 'About button text',
      'section' => 'home_about',
      'settings' => 'home_about_button',
    )
  );

      $wp_customize->add_section(
        'home_projects',
        array(
            'title' => 'Projects',
            'description' => '',
            'priority' => 35,
            'panel'=>'home_panel',
        )
      );

      $wp_customize->add_setting(
          'home_projects_text',
          array(
            'default' => 'Our work is motivated by the belief that collaboration combined with good design can solve complex problems and improve the world we live in.',
            'sanitize_callback' => 'sanitize_textarea_field',
            'transport' => 'postMessage'
          )
      );

    $wp_customize->selective_refresh->add_partial('home_projects_text', [
        'selector' => '.home-projects--intro--text',
        'container_inclusive' => false,
        'fallback_refresh' => false,
        'render_callback' => function() {
            echo get_theme_mod('home_projects_text');
        }
    ]);

    $wp_customize->get_setting('home_projects_text')->transport = 'postMessage';

    $wp_customize->add_control(
      'home_projects_text',
      array(
        'type' => 'textarea',
        'label' => 'Projects text',
        'section' => 'home_projects',
        'settings' => 'home_projects_text',
      )
    );

    $wp_customize->add_setting( 'homepage_projects',
        array(
            'transport' => 'refresh'
        )
    );

    $projects_list = array_reduce(
        get_posts( 'post_type=projects&posts_per_page=-1' ),
        function( $result, $item ) {
            $result[strval($item->ID)] = strlen($item->post_title) > 26 ? substr($item->post_title,0,23)."..." : $item->post_title;
            return $result;
        }
    );

    $wp_customize->add_control( new \App\CustomControls\Skyrocket_Pill_Checkbox_Custom_Control( $wp_customize, 'homepage_projects',
        array(
            'label' => 'Featured projects',
            'description' => 'Select case studies to appear on the homepage. Rearrange with drag and drop.',
            'section' => 'home_projects',
            'input_attrs' => array(
                'sortable' => true,
                'fullwidth' => true,
            ),
            'choices' => $projects_list
        )
    ) );

    // Newsletter

    $wp_customize->add_section(
      'newsletter',
      array(
          'title' => 'Newsletter',
          'description' => '',
          'priority' => 40
      )
    );

    $wp_customize->add_setting(
        'newsletter_heading',
        array(
          'default' => 'Sign up for the latest news, ideas & events from Transition by Design',
          'sanitize_callback' => 'sanitize_textarea_field',
          'transport' => 'postMessage'
        )
    );

    $wp_customize->selective_refresh->add_partial('newsletter_heading', [
      'selector' => '.newsletter-signup--heading',
      'container_inclusive' => false,
      'fallback_refresh' => false,
      'render_callback' => function() {
          echo get_theme_mod('newsletter_heading');
      }
    ]);

    $wp_customize->get_setting('newsletter_heading')->transport = 'postMessage';

    $wp_customize->add_control(
    'newsletter_heading',
    array(
      'type' => 'textarea',
      'label' => 'Heading',
      'section' => 'newsletter',
      'settings' => 'newsletter_heading',
    )
    );


    $wp_customize->add_setting(
      'newsletter_disclaimer',
      array(
        'default' => 'Clicking ‘subscribe’ confirms you have read and agree to our <a href="/privacy-policy/">privacy policy</a>',
        'sanitize_callback' => 'sanitize_textarea_field',
        'transport' => 'postMessage'
      )
    );

    $wp_customize->selective_refresh->add_partial('newsletter_disclaimer', [
        'selector' => '.newsletter-signup--disclaimer',
        'container_inclusive' => false,
        'fallback_refresh' => false,
        'render_callback' => function() {
            echo get_theme_mod('newsletter_disclaimer');
        }
    ]);

    $wp_customize->get_setting('newsletter_disclaimer')->transport = 'postMessage';

    $wp_customize->add_control(
      'newsletter_disclaimer',
      array(
        'type' => 'textarea',
        'label' => 'Disclaimer',
        'section' => 'newsletter',
        'settings' => 'newsletter_disclaimer',
      )
    );



    $wp_customize->add_setting(
        'newsletter_url',
        array(
          'default' => 'https://transitionbydesign.us9.list-manage.com/subscribe/post?u=93ce5fb1f178a607501f44054&amp;id=5f8363d512',
          'sanitize_callback' => 'sanitize_text_field',
          'transport' => 'postMessage'
        )
    );

    $wp_customize->get_setting('newsletter_url')->transport = 'postMessage';

    $wp_customize->add_control(
    'newsletter_url',
    array(
      'label' => 'Signup URL (e.g. Mailchimp)',
      'section' => 'newsletter',
      'settings' => 'newsletter_url',
    )
    );


    // Home sketchbook

    $wp_customize->add_section(
      'home_sketchbook',
      array(
          'title' => 'Sketchbook',
          'description' => '',
          'priority' => 35,
          'panel'=>'home_panel',
      )
    );

    $wp_customize->add_setting(
        'home_sketchbook_text',
        array(
          'default' => 'Not all ideas find their way into reality; some never make it off the page. This is where you can explore our sketches – things we imagined but which never came to be.',
          'sanitize_callback' => 'sanitize_textarea_field',
          'transport' => 'postMessage'
        )
    );

    $wp_customize->selective_refresh->add_partial('home_sketchbook_text', [
        'selector' => '.home-scrapbook--intro',
        'container_inclusive' => false,
        'fallback_refresh' => false,
        'render_callback' => function() {
            echo get_theme_mod('home_sketchbook_text');
        }
    ]);

  $wp_customize->get_setting('home_sketchbook_text')->transport = 'postMessage';

  $wp_customize->add_control(
    'home_sketchbook_text',
    array(
      'type' => 'textarea',
      'label' => 'Sketchbook text',
      'section' => 'home_sketchbook',
      'settings' => 'home_sketchbook_text',
    )
  );


  $wp_customize->add_setting(
      'home_sketchbook_button',
      array(
        'default' => 'Look inside',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage'
      )
  );

  $wp_customize->selective_refresh->add_partial('home_sketchbook_button', [
      'selector' => '.home-scrapbook--button span',
      'container_inclusive' => false,
      'fallback_refresh' => false,
      'render_callback' => function() {
          echo get_theme_mod('home_sketchbook_button');
      }
  ]);

    $wp_customize->get_setting('home_sketchbook_button')->transport = 'postMessage';

    $wp_customize->add_control(
      'home_sketchbook_button',
      array(
        'type' => 'text',
        'label' => 'Sketchbook button',
        'section' => 'home_sketchbook',
        'settings' => 'home_sketchbook_button',
      )
    );

    /*
    ** Contact details
    */

    $wp_customize->add_section(
      'contact',
      array(
          'title' => 'Contact details',
          'description' => '',
          'priority' => 35,
      )
    );

    // Address
    $wp_customize->add_setting(
        'contact_address',
        array(
          'default' => 'Makespace Oxford, Aristotle Ln, Oxford OX2 6TP',
          'sanitize_callback' => 'sanitize_textarea_field',
          'transport' => 'postMessage'
        )
    );

    $wp_customize->selective_refresh->add_partial('contact_address', [
      'selector' => '.contact-address',
      'container_inclusive' => false,
      'fallback_refresh' => false,
      'render_callback' => function() {
          echo get_theme_mod('contact_address');
      }
    ]);

    $wp_customize->get_setting('contact_address')->transport = 'postMessage';

    $wp_customize->add_control(
    'contact_address',
    array(
      'type' => 'textarea',
      'label' => 'Address',
      'section' => 'contact',
      'settings' => 'contact_address',
    )
    );

    // Phone
    $wp_customize->add_setting(
        'contact_phone',
        array(
          'default' => '00441865554927',
          'sanitize_callback' => 'sanitize_text_field',
          'transport' => 'postMessage'
        )
    );

    $wp_customize->add_control(
    'contact_phone',
    array(
      'type' => 'text',
      'label' => 'Phone (machine readable)',
      'section' => 'contact',
      'settings' => 'contact_phone',
    )
    );

    // Phone (human readable)
    $wp_customize->add_setting(
        'contact_phone_human',
        array(
          'default' => '(+44) 1865 554927',
          'sanitize_callback' => 'sanitize_text_field',
          'transport' => 'postMessage'
        )
    );

    $wp_customize->selective_refresh->add_partial('contact_phone_human', [
      'selector' => '.contact-phone',
      'container_inclusive' => false,
      'fallback_refresh' => false,
      'render_callback' => function() {
          echo get_theme_mod('contact_phone_human');
      }
    ]);

    $wp_customize->get_setting('contact_phone_human')->transport = 'postMessage';

    $wp_customize->add_control(
    'contact_phone_human',
    array(
      'type' => 'text',
      'label' => 'Phone (human readable)',
      'section' => 'contact',
      'settings' => 'contact_phone_human',
    )
    );

    // Email
    $wp_customize->add_setting(
        'contact_email',
        array(
          'default' => 'info@transitionbydesign.org',
          'sanitize_callback' => 'sanitize_text_field',
          'transport' => 'postMessage'
        )
    );

    $wp_customize->selective_refresh->add_partial('contact_email', [
      'selector' => '.contact-email',
      'container_inclusive' => false,
      'fallback_refresh' => false,
      'render_callback' => function() {
          echo get_theme_mod('contact_email');
      }
    ]);

    $wp_customize->get_setting('contact_email')->transport = 'postMessage';

    $wp_customize->add_control(
    'contact_email',
    array(
      'type' => 'text',
      'label' => 'Email',
      'section' => 'contact',
      'settings' => 'contact_email',
    )
    );

    // Facebook
    $wp_customize->add_setting(
        'facebook',
        array(
          'default' => '',
          'sanitize_callback' => 'sanitize_text_field',
          'transport' => 'postMessage'
        )
    );

    $wp_customize->selective_refresh->add_partial('facebook', [
      'selector' => '.social-icon__facebook',
      'container_inclusive' => false,
      'fallback_refresh' => false,
      'render_callback' => function() {
          echo get_theme_mod('facebook');
      }
    ]);

    $wp_customize->get_setting('facebook')->transport = 'postMessage';

    $wp_customize->add_control(
    'facebook',
    array(
      'type' => 'text',
      'label' => 'Facebook',
      'section' => 'contact',
      'settings' => 'facebook',
    )
    );


    // Twitter
    $wp_customize->add_setting(
        'twitter',
        array(
          'default' => '',
          'sanitize_callback' => 'sanitize_text_field',
          'transport' => 'postMessage'
        )
    );

    $wp_customize->selective_refresh->add_partial('twitter', [
      'selector' => '.social-icon__twitter',
      'container_inclusive' => false,
      'fallback_refresh' => false,
      'render_callback' => function() {
          echo get_theme_mod('twitter');
      }
    ]);

    $wp_customize->get_setting('twitter')->transport = 'postMessage';

    $wp_customize->add_control(
    'twitter',
    array(
      'type' => 'text',
      'label' => 'Twitter',
      'section' => 'contact',
      'settings' => 'twitter',
    )
    );

    // Instagram
    $wp_customize->add_setting(
        'instagram',
        array(
          'default' => '',
          'sanitize_callback' => 'sanitize_text_field',
          'transport' => 'postMessage'
        )
    );

    $wp_customize->selective_refresh->add_partial('instagram', [
      'selector' => '.social-icon__instagram',
      'container_inclusive' => false,
      'fallback_refresh' => false,
      'render_callback' => function() {
          echo get_theme_mod('instagram');
      }
    ]);

    $wp_customize->get_setting('instagram')->transport = 'postMessage';

    $wp_customize->add_control(
    'instagram',
    array(
      'type' => 'text',
      'label' => 'Instagram',
      'section' => 'contact',
      'settings' => 'instagram',
    )
    );


    // Linkedin
    $wp_customize->add_setting(
        'linkedin',
        array(
          'default' => '',
          'sanitize_callback' => 'sanitize_text_field',
          'transport' => 'postMessage'
        )
    );

    $wp_customize->selective_refresh->add_partial('linkedin', [
      'selector' => '.social-icon__linkedin',
      'container_inclusive' => false,
      'fallback_refresh' => false,
      'render_callback' => function() {
          echo get_theme_mod('linkedin');
      }
    ]);

    $wp_customize->get_setting('linkedin')->transport = 'postMessage';

    $wp_customize->add_control(
    'linkedin',
    array(
      'type' => 'text',
      'label' => 'Linkedin',
      'section' => 'contact',
      'settings' => 'linkedin',
    )
    );

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
    add_theme_support( 'disable-custom-gradients' );
    add_theme_support('disable-custom-font-sizes');
    add_theme_support('editor-font-sizes', array(
        array(
            'name' => 'Large',
            'slug' => 'large',
            'size' => 18
        )
    ));
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
