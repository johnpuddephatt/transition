@extends('layouts.app')

@section('content')

  <div class="container">

    @include('partials.page-header', ['class' => 'entry-header__services'])

    <div class="projects-grid">
      @foreach($projects as $project)
        <a href="{!! $project->link !!}" class="projects-grid--project">
          <div class="projects-grid--image">
            {!! $project->thumbnail !!}
          </div>
          <h3 class="projects-grid--heading">{!! $project->client !!}</h3>
          <p class="projects-grid--excerpt">{!! $project->excerpt !!}</p>
          <p class="projects-grid--read-more">See this project&nbsp;&rarr;</p>
        </a>
      @endforeach
    </div>

  </div>

@endsection
