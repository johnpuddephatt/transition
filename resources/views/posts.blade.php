{{--
  Template Name: Posts
--}}

@extends('layouts.app')

@section('content')

  <div class="container">
    @include('partials.page-header', ['class' => 'entry-header__section'])

    <div class="posts-list--wrapper">
      @foreach($posts as $post)
        <a href="{{ $post->link }}" class="posts-list--post">

          <div class="posts-list--post--meta">
            @if($post->category)
              <span class="posts-list--post--tag tag">{{ $post->category->name }}</span>
            @endif
            <time class="entry-content--date" datetime="{{ $post->post_modified }}">{{ $post->date }}</time>
          </div>

          {{-- <div class="posts-list--post--image" >{!! $post->thumbnail !!}</div> --}}

          <div class="posts-list--post--text">
            <h2 class="posts-list--post--title">{{ $post->post_title }}</h2>
            <div class="posts-list--post--excerpt">{!! $post->excerpt !!}</div>

            <div class="posts-list--post--author">
              @if($post->author->user_login != 'admin')
                {!! $post->author_image !!}
                <span>{{ $post->author->display_name }}</span>
              @endif
            </div>

          </div>
        </a>
      @endforeach
    </div>

  </div>

@endsection
