{{--
  Template Name: Posts
--}}

@extends('layouts.app')

@section('content')

  <div class="container">
    @include('partials.page-header', ['class' => 'entry-header__section'])

    <div class="posts-list--wrapper">
      @foreach($posts as $post)
        <a href="{!! $post->link !!}" class="posts-list--post">
          <div class="posts-list--post--image" >{!! $post->thumbnail !!}</div>
          <div class="posts-list--post--text">
            <span class="posts-list--post--tag tag">{!! $post->category->name !!}</span>
            <h2 class="posts-list--post--title">{!! $post->post_title !!}</h2>
            <div class="posts-list--post--excerpt">{!! $post->excerpt !!}</div>
          </div>
        </a>
      @endforeach
    </div>

  </div>

@endsection
