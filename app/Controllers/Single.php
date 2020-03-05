<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class Single extends Controller
{
    public function post() {
        if(get_post_type() == 'projects') {
            $this->relative_id = $this->get_relative_id();
            $this->client = get_field('project_name');
            $this->footnotes = get_field('project_footnotes');
        }
        $this->title = get_the_title();
        $this->excerpt = get_the_excerpt();
        $this->thumbnail = get_the_post_thumbnail(null, 'wide');
        $this->category = get_the_terms(null, 'category') ? get_the_terms(null, 'category')[0] : '';
        return $this;
    }

    private function get_relative_id() {
        $project_ids = get_posts([
            'fields' => 'ids',
            'posts_per_page'  => -1,
            'post_type' => 'Projects'
        ]);

        return sprintf("%02d", (array_search(get_the_ID(), $project_ids) + 1));
    }

}
