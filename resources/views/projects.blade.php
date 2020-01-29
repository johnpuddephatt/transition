{{--
  Template Name: Projects
--}}

@extends('layouts.app')

@section('content')

  <div class="container">
    @include('partials.page-header')

    <h2>In progress...</h2>

    @foreach($projects as $project)
      <a href="{!! $project->link !!}">
        {!! $project->thumbnail !!}
        <h2 class="projects--title">{!! $project->title !!}</h2>
        <p>{!! $project->excerpt !!}</p>
      </a>
    @endforeach

  </div>

@endsection