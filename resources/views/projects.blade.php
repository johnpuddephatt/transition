{{--
  Template Name: Projects
--}}

@extends('layouts.app')

@section('content')

  <div class="container">

    @include('partials.page-header', ['class' => 'entry-header__section'])

    {{-- @foreach($projects as $project)
      <a href="{!! $project->link !!}">
        {!! $project->thumbnail !!}
        <h2 class="projects--title">{!! $project->title !!}</h2>
        <br>
        <p>{!! $project->excerpt !!}</p>
      </a>
    @endforeach --}}

    <div class="projects-grid--wrapper">

      <a class="projects-grid--project">
        <img class="projects-grid--image" src="@asset('images/project1.jpg')" alt="">
        <h3 class="projects-grid--heading">Open House</h3>
        <p class="projects-grid--excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
      </a>

      <a class="projects-grid--project">
        <img class="projects-grid--image" src="@asset('images/project2.jpg')" alt="">
        <h3 class="projects-grid--heading">Godstow</h3>
        <p class="projects-grid--excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt et dolore magna aliqua.</p>
      </a>

      <a class="projects-grid--project">
        <img class="projects-grid--image" src="@asset('images/project3.jpg')" alt="">
        <h3 class="projects-grid--heading">Agloo</h3>
        <p class="projects-grid--excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt et dolore magna aliqua.</p>
      </a>

      <a class="projects-grid--project">
        <img class="projects-grid--image" src="@asset('images/project4.jpg')')" alt="">
        <h3 class="projects-grid--heading">House of the Commons</h3>
        <p class="projects-grid--excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt et dolore magna aliqua.</p>
      </a>

      <a class="projects-grid--project">
        <img class="projects-grid--image" src="@asset('images/project5.jpg')" alt="">
        <h3 class="projects-grid--heading">Wooton Thatched Barn</h3>
        <p class="projects-grid--excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt et dolore magna aliqua.</p>
      </a>

      <a class="projects-grid--project">
        <img class="projects-grid--image" src="@asset('images/project6.jpg')" alt="">
        <h3 class="projects-grid--heading">Makespace Oxford</h3>
        <p class="projects-grid--excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
      </a>
    </div>


  </div>

@endsection
