<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class Single extends Controller
{
    public function post() {
        if(get_post_type() == 'projects') {
            $navigation = $this->project_navigation();
            $this->relative_id = $navigation->relative_id;
            $this->next_post = $navigation->next_post;
            $this->previous_post = $navigation->previous_post;
            $this->client = get_field('project_name');
            $this->footnotes = get_field('project_footnotes');
        }
        $this->title = get_the_title();
        $this->excerpt = get_the_excerpt();
        $this->thumbnail = get_the_post_thumbnail(null, 'wide');
        $this->category = get_the_terms(null, 'category') ? get_the_terms(null, 'category')[0] : '';
        return $this;
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

}
