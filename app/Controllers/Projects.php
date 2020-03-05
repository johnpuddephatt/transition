<?php

namespace App\Controllers;

use Sober\Controller\Controller;


class Projects extends Controller
{
    // protected $acf = true;

    public function projects()
    {

        $projects = get_posts([
            'post_type' => 'Projects',
            'posts_per_page'=>'24',
        ]);

        $loop_index = 0;

        return array_map(function ($project) use (&$loop_index) {
            $is_large = (($loop_index + 1) % 6 == 0) || ($loop_index %6 == 0);
            $project_object = new \stdClass();
            $project_object->title = get_the_title($project->ID);
            $project_object->excerpt = get_the_excerpt($project->ID);
            $project_object->thumbnail = get_the_post_thumbnail($project->ID, $is_large ? 'wide' : 'tall');
            $project_object->link = get_the_permalink($project->ID);
            $project_object->client = get_field('project_name', $project->ID);
            $loop_index++;
            return $project_object;
        }, $projects);
    }
}
