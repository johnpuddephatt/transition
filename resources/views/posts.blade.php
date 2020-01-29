{{--
  Template Name: Posts
--}}

@extends('layouts.app')

@section('content')

  <div class="container">
    @include('partials.page-header')

    <h2>In progress...</h2>
    <br><br>

    @foreach($posts as $post)
      <a href="{!! $post->link !!}">
        {{-- <span class="tag">{!! $post->category->name !!}</span> --}}
        <h2>{!! $post->title !!}</h2>
        <br>
        {{-- {!! $post->thumbnail !!} --}}
      </a>
      <br><br>
    @endforeach

  </div>

@endsection
