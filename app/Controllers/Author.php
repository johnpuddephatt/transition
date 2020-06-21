<?php

namespace App\Controllers;

use Sober\Controller\Controller;


class Author extends Controller
{
    // protected $acf = true;

    public function author()
    {
        $user = get_queried_object();
        $user->position = get_field('position', 'user_' . $user->ID);
        $user->twitter = get_field('twitter', 'user_' . $user->ID);
        $user->instagram = get_field('instagram', 'user_' . $user->ID);
        $user->phone_number = get_field('phone_number', 'user_' . $user->ID);

        $user->image = wp_get_attachment_image( get_field('image', 'user_' . $user->ID), 'wide');
        return $user;
    }

    public function posts()
    {
        $posts = get_posts([
            'post_type' => 'Post',
            'author' => get_queried_object()->ID,
            'posts_per_page'=> get_option( 'posts_per_page' )
        ]);

        return array_map(function ($post) {
            $post->excerpt = get_the_excerpt($post->ID);
            $post->thumbnail = get_the_post_thumbnail($post->ID, 'wide', array( 'sizes' => '(min-width: 860px) 336px, 90vw'));
            $post->link = get_the_permalink($post->ID);
            $post->category = get_the_terms($post->ID, 'category')[0];
            return $post;
        }, $posts);
    }
}
