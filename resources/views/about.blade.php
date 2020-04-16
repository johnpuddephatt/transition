{{--
  Template Name: About
--}}

@extends('layouts.app')

@section('content')
  @while(have_posts()) @php the_post() @endphp
    <div class="container">
      @include('partials.page-header', ['class' => 'entry-header__single-page'])
      @include('partials.content-page-about')
    </div>
  @endwhile
@endsection
