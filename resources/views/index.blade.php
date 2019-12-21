@extends('layouts.app')

@section('content')
  @include('partials.loading')

  @include('partials.home-hero')
  @include('partials.home-about')
  @include('partials.home-projects')
  @include('partials.home-blog')

@endsection
