<?php

namespace App\Controllers;

use Sober\Controller\Controller;


class Page extends Controller
{
    // protected $acf = true;

    public function post()
    {
        $this->title = get_the_title();
        $this->thumbnail = get_the_post_thumbnail(null, 'large');
        return $this;
    }
}
