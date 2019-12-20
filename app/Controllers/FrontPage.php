<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class FrontPage extends Controller
{
    public function projects() {
        $args = array( 'post_type' => 'Projects', 'posts_per_page' => 10 );
        return new \WP_Query( $args );
    }
}
