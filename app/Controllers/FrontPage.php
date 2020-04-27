<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class FrontPage extends Controller
{
    public function projects() {

        //     $args = array( 'post_type' => 'Projects', 'posts_per_page' => 10 );
        //     return new \WP_Query( $args );

        $projects = get_posts([
            'post_type' => 'Projects',
            'posts_per_page'=>'24',
            'numberposts' => 6
        ]);

        $loop_index = 0;

        return array_map(function ($project) use (&$loop_index) {
            $is_large = (($loop_index + 1) % 6 == 0) || ($loop_index %6 == 0);
            $project->excerpt = get_the_excerpt($project->ID);
            $project->thumbnail = get_the_post_thumbnail($project->ID, $is_large ? 'wide' : 'tall');
            $project->link = get_the_permalink($project->ID);
            $project->client = get_field('project_name', $project->ID);
            $loop_index++;
            return $project;
        }, $projects);

    }

}
