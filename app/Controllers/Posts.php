<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class Posts extends Controller
{
    // protected $acf = true;

    public function posts()
    {
        $posts = get_posts([
            'post_type' => 'Post',
            'posts_per_page'=> get_option( 'posts_per_page' )
        ]);

        return array_map(function ($post) {
            $post->excerpt = get_the_excerpt($post->ID);
            $post->thumbnail = get_the_post_thumbnail($post->ID, 'wide_s');
            $post->link = get_the_permalink($post->ID);
            $post->category = get_the_terms($post->ID, 'category')[0];
            $post->date = get_the_date(null, $post->ID);

            $post->author = get_userdata($post->post_author);
            $post->author_image = wp_get_attachment_image( get_field('image', 'user_' . $post->post_author), 'thumbnail');

            return $post;
        }, $posts);

    }

}
