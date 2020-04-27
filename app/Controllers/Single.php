<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class Single extends Controller
{
    public function post() {
        $post = get_queried_object();

        if(get_post_type() == 'projects') {
            $navigation = $this->project_navigation();
            $post->relative_id = $navigation->relative_id;
            $post->next_post = $navigation->next_post;
            $post->previous_post = $navigation->previous_post;
            $post->client = get_field('project_name');
            $post->footnotes = get_field('project_footnotes');
            $post->related_projects = $this->related_projects();
        }
        else {
            $post->related_posts = $this->related_posts();
            $post->category = get_the_terms(null, 'category') ? get_the_terms(null, 'category')[0] : '';

            $post->author = get_userdata($post->post_author);
            $post->author_image = wp_get_attachment_image( get_field('image', 'user_' . $post->post_author), 'thumbnail');

        }
        $post->title = get_the_title();
        $post->excerpt = get_the_excerpt();
        $post->thumbnail = get_the_post_thumbnail(null, 'wide');
        return $post;
    }

    private function project_navigation() {
        $project_ids = get_posts([
            'fields' => 'ids',
            'posts_per_page'  => -1,
            'post_type' => 'Projects',
            'orderby' => 'date',
            'order' => 'ASC'
        ]);
        $navigation = new \stdClass();
        $post_index = array_search(get_the_ID(), $project_ids);
        $navigation->relative_id = sprintf("%02d", ($post_index + 1));
        $navigation->next_post = ($post_index + 1) > (count($project_ids) - 1) ? null : get_permalink($project_ids[$post_index + 1]);
        $navigation->previous_post = ($post_index - 1) < 0 ? null : get_permalink($project_ids[$post_index - 1]);
        return $navigation;
    }

    public function related_projects() {

        $projects = get_posts([
            'post_type' => 'Projects',
            'numberposts'=>'3',
            'exclude' => get_the_ID()
        ]);

        return array_map(function ($project) use (&$loop_index) {
            $project->excerpt = get_the_excerpt($project->ID);
            $project->thumbnail = get_the_post_thumbnail($project->ID, 'square');
            $project->link = get_the_permalink($project->ID);
            $project->client = get_field('project_name', $project->ID);
            return $project;
        }, $projects);

    }

    public function related_posts() {

        $posts = get_posts([
            'post_type' => 'post',
            'numberposts'=>'2',
            'exclude' => get_the_ID()
        ]);

        return array_map(function ($post) {
            $post->title = get_the_title($post->ID);
            $post->post_excerpt = get_the_excerpt($post->ID);
            $post->link = get_the_permalink($post->ID);
            $post->author = get_userdata($post->post_author);
            // $post->author->name = get_the_author(); // get_author_name?
            // $post->author->link = get_the_author_link();
            $post->author_image = wp_get_attachment_image( get_field('image', 'user_' . $post->post_author), 'thumbnail');

            return $post;
        }, $posts);

    }

}
