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
            'posts_per_page'=>'8',
        ]);

        return array_map(function ($post) {
            $post_object = new \stdClass();
            $post_object->title = get_the_title($post->ID);
            $post_object->excerpt = get_the_excerpt($post->ID);
            $post_object->thumbnail = get_the_post_thumbnail($post->ID, 'large');
            $post_object->link = get_the_permalink($post->ID);
            $post_object->category = get_the_terms($post->ID, 'category')[0];
            return $post_object;
        }, $posts);
    }

}
