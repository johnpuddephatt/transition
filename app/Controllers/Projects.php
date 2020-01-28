<?php

namespace App\Controllers;

use Sober\Controller\Controller;


class Projects extends Controller
{
    protected $acf = true;

    public function projects()
    {
        $projects = get_posts([
            'post_type' => 'Projects',
            'posts_per_page'=>'8',
        ]);

        return array_map(function ($project) {
            $project_object = new \stdClass();
            $project_object->title = get_the_title($project->ID);
            $project_object->excerpt = get_the_excerpt($project->ID);
            $project_object->thumbnail = get_the_post_thumbnail($project->ID, 'thumb');
            $project_object->link = get_the_permalink($project->ID);
            return $project_object;
        }, $projects);
    }
}
