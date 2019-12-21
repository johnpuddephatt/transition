<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class Single extends Controller
{
    protected $acf = true;

    public function featured_image()
   {
       return get_the_post_thumbnail();
   }

   public function excerpt()
   {
       return get_the_excerpt();
   }
}
