<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class Single extends Controller
{
    protected $acf = true;

    public function post() {
        $this->title = get_the_title();
        $this->excerpt = get_the_excerpt();
        $this->thumbnail = get_the_post_thumbnail(null, 'wide-large');
        $this->category = get_the_terms(null, 'category')[0];
        return $this;
    }

}
