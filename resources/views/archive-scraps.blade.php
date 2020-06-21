{{--
  Template Name: Scrapbook
--}}

@extends('layouts.app')

@section('content')

  <div class="container">

    @include('partials.page-header', ['class' => 'entry-header__section'])


    <div class="scraps-intro">
      <div class="scraps-intro--text">
        {!! $page_content->post_content !!}
      </div>
      <div class="scraps-intro--image">
        {!! $page_content->thumbnail !!}
      </div>
    </div>

    <div class="scraps-grid scraps-grid--wrapper">
      <div class="scraps-grid">
        @foreach(array_chunk($scraps,4) as $row)

            @if( $loop->index % 2)
              <div class="scraps-grid--row">
                <div class="scraps-grid--column">
                  @if(isset($row[0])) @include('partials.scraps-grid-item', ['scrap' => $row[0]]) @endif
                  @if(isset($row[1])) @include('partials.scraps-grid-item', ['scrap' => $row[1]]) @endif
                </div>
                <div class="scraps-grid--column">
                  @if(isset($row[2])) @include('partials.scraps-grid-item', ['scrap' => $row[2]]) @endif
                </div>
              </div>
              @if(isset($row[3]))
                <div class="scraps-grid--row scraps-grid--row__wide">
                  @include('partials.scraps-grid-item', ['scrap' => $row[3]])
                </div>
              @endif
            @else
              <div class="scraps-grid--row">
                <div class="scraps-grid--column">
                  @if(isset($row[0])) @include('partials.scraps-grid-item', ['scrap' => $row[0]]) @endif
                </div>
                <div class="scraps-grid--column">
                  @if(isset($row[1])) @include('partials.scraps-grid-item', ['scrap' => $row[1]]) @endif
                  @if(isset($row[2])) @include('partials.scraps-grid-item', ['scrap' => $row[2]]) @endif
                </div>
              </div>
              @if(isset($row[3]))
                <div class="scraps-grid--row scraps-grid--row__wide">
                  @include('partials.scraps-grid-item', ['scrap' => $row[3]])
                </div>
               @endif
            @endif
          </div>
        @endforeach
      </div>
    </div>

  </div>

@endsection
