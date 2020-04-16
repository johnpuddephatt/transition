<?php

namespace App\Controllers;

use Sober\Controller\Controller;


class About extends Controller
{
    // protected $acf = true;

    public function page()
    {
        $this->title = get_the_title();
        $this->thumbnail = get_the_post_thumbnail(null, 'large');

        return $this;

    }

    public function team()
    {
        $members = get_users([
            'exclude' => '1',
            'orderby' => 'meta_value',
            'meta_key' => 'last_name'
        ]);

        return array_map(function ($member) {
            $member->image = wp_get_attachment_image( get_field('image', 'user_' . $member->ID), 'thumbnail');
            $member->role = get_field('position', $member->ID);
            return $member;
        }, $members);
    }

    public function services()
    {
        return get_terms( array(
            'taxonomy' => 'projectservices',
            'hide_empty' => false,
        ) );
    }
}
