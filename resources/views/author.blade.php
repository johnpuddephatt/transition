{{--
  Template Name: About
--}}

@extends('layouts.app')

@section('content')
  <div class="container">

    <header class="entry-header entry-header__author">
      <div>
        <div class="entry-header--image">{!! $author->image !!}</div>
        <h1 class="entry-header--title">{{ $author->display_name }}</h1>
        <p class="entry-header--subtitle">{{ $author->position }}</p>
        <p class="entry-header--intro">{!! nl2br($author->description) !!}</p>
        <ul class="entry-header--contact">
          @if($author->user_email)<li class="contact-email"><a href="mailto:{{ $author->user_email }}">{{ $author->user_email }}</a></li>@endif
          @if($author->phone_number)<li class="contact-phone"><a href="tel:{{ $author->user_email }}">{{ $author->phone_number }}</a></li>@endif
          @if($author->instagram)<li class="contact-instagram"><a href="//instagram.com/{{ $author->instagram }}">&#64;{{ $author->twitter }}</a></li>@endif
          @if($author->twitter)<li class="contact-twitter"><a href="//twitter.com/{{ $author->twitter }}">&#64;{{ $author->instagram }}</a></li>@endif
        </ul>
      </div>
    </header>


    @if(count($posts))
      <div class="posts-list--wrapper posts-list--wrapper__author">
        @foreach($posts as $post)
          <a class="posts-list--post" href="{!! $post->link !!}">
            <div class="posts-list--post--image">{!! $post->thumbnail !!}</div>
            <div class="posts-list--post--text">
              <span class="posts-list--post--tag tag">{!! $post->category->name !!}</span>
              <h2 class="posts-list--post--title">{!! $post->post_title !!}</h2>
              <div class="posts-list--post--excerpt">{!! $post->excerpt !!}</div>
            </div>
          </a>
        @endforeach
      </div>
    @endif

  </div>

@endsection
