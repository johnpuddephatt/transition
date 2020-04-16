<header class="entry-header {{ $class ?? '' }}">
  <h1 class="entry-header--title">{!! App::Title() !!}</h1>
  @if(isset($page) && property_exists($page, 'description'))
    <div class="entry-header--description">
      {!! $page->description !!}
    </div>
  @endif
</header>
