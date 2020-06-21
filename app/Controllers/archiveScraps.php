<?php

namespace App\Controllers;

use Sober\Controller\Controller;


class archiveScraps extends Controller
{
    // protected $acf = true;

    public function page_content() {
        $page_content = get_posts([
            'post_type' => 'page',
            'post_status' => 'publish',
            'numberposts' => 1,
            'meta_query' => array(
                array(
                    'key' => '_wp_page_template',
                    'value' => 'views/archive-scraps.blade.php', // template name as stored in the dB
                )
            )
        ])[0];
        $page_content->thumbnail = get_the_post_thumbnail($page_content->ID, 'large');
        return $page_content;
    }

    public function scraps()
    {

        $scraps = get_posts([
            'post_type' => 'scraps',
            'posts_per_page'=>'16', // Multiple of 8
            'orderby' => 'menu_order'
        ]);

        $loop_index = 0;

        return array_map(function ($scrap) use (&$loop_index) {
            $is_tall = ($loop_index % 8 == 0) || (($loop_index - 6) % 8 == 0);
            $is_small = (($loop_index - 1) % 8 == 0) || (($loop_index - 2) % 8 == 0) || (($loop_index - 4) % 8 == 0) || (($loop_index - 5) % 8 == 0);
            $scrap->excerpt = get_the_excerpt($scrap->ID);
            // $scrap->thumbnail = get_the_post_thumbnail($scrap->ID, $is_tall ? 'tall' : 'wide');
            $scrap->thumbnail = get_the_post_thumbnail($scrap->ID, 'large', array( 'sizes' => ($is_tall || $is_small) ? '(min-width: 1120px) 545px, 40vw' : '(min-width: 1120px) 1030px, 90vw') );
            $scrap->link = get_the_permalink($scrap->ID);
            $scrap->index = $loop_index;
            $scrap->image_colour = get_field('image_colour', $scrap->ID);
            $scrap->image_texture = get_field('image_texture', $scrap->ID);
            $scrap->image_size = get_field('image_size', $scrap->ID);
            $scrap->image_blend = get_field('image_blend', $scrap->ID);
            $loop_index++;
            return $scrap;
        }, $scraps);
    }
}
