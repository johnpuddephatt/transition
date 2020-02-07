{{--
  Template Name: Posts
--}}

@extends('layouts.app')

@section('content')

  <div class="container">
    @include('partials.page-header', ['class' => 'entry-header__section'])

    <div class="posts-list--wrapper">
      @foreach($posts as $post)
        <div class="posts-list--post">
          <a class="posts-list--post--image" href="{!! $post->link !!}">{!! $post->thumbnail !!}</a>
          <div class="posts-list--post--text">
            <span class="posts-list--post--tag tag">{!! $post->category->name !!}</span>
            <h2 class="posts-list--post--title"><a href="{!! $post->link !!}">{!! $post->title !!}</a></h2>
            <div class="posts-list--post--excerpt">{!! $post->excerpt !!}</div>
          </div>
        </div>
      @endforeach
    </div>

  </div>

@endsection
