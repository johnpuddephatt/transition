<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class Single extends Controller
{
    public function post() {
        $post = get_queried_object();

        if(get_post_type() == 'projects') {
            $navigation = $this->post_navigation('projects','ASC');
            $post->relative_id = $navigation->relative_id;
            $post->next_post = $navigation->next_post;
            $post->previous_post = $navigation->previous_post;
            $post->client = get_field('project_name');
            $post->footnotes = get_field('project_footnotes');
            $post->related_projects = $this->related_projects();
        }

        if(get_post_type() == 'scraps') {
            $navigation = $this->post_navigation('scraps','DESC');
            $post->next_post = $navigation->next_post;
            $post->previous_post = $navigation->previous_post;

            $post->image_colour = get_field('image_colour', $post->ID);
            $post->image_texture = get_field('image_texture', $post->ID);
            $post->image_size = get_field('image_size', $post->ID);
            $post->image_blend = get_field('image_blend', $post->ID);
        }

        // Else post or page
        else {
            $post->category = get_the_terms(null, 'category') ? get_the_terms(null, 'category')[0] : '';
            $post->date = get_the_date(null, $post->ID);
            $post->related_posts = $this->related_posts($post->category->term_id);

            $post->author = get_userdata($post->post_author);
            $post->author_image = wp_get_attachment_image( get_field('image', 'user_' . $post->post_author), 'thumbnail');
            $post->author_role = get_field('position', 'user_' . $post->post_author);
        }

        $post->title = get_the_title();
        $post->excerpt = get_the_excerpt();
        $post->thumbnail = get_the_post_thumbnail(null, 'wide');
        return $post;
    }

    private function post_navigation($post_type, $order = 'DESC') {
          $post_ids = get_posts([
              'fields' => 'ids',
              'posts_per_page'  => -1,
              'post_type' => $post_type,
              'orderby' => 'date',
              'order' => $order
          ]);
          $navigation = new \stdClass();
          $post_index = array_search(get_the_ID(), $post_ids);
          $navigation->relative_id = sprintf("%02d", ($post_index + 1));
          $navigation->next_post = ($post_index + 1) > (count($post_ids) - 1) ? null : get_permalink($post_ids[$post_index + 1]);
          $navigation->previous_post = ($post_index - 1) < 0 ? null : get_permalink($post_ids[$post_index - 1]);
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

    public function related_posts($category = null) {

        $posts = get_posts([
            'post_type' => 'post',
            'numberposts'=>'2',
            'category' => $category,
            'exclude' => get_the_ID()
        ]);

        return array_map(function ($post) {
            $post->post_excerpt = get_the_excerpt($post->ID);
            $post->link = get_the_permalink($post->ID);
            $post->author = get_userdata($post->post_author);
            $post->author_image = wp_get_attachment_image( get_field('image', 'user_' . $post->post_author), 'thumbnail');

            return $post;
        }, $posts);

    }

}
