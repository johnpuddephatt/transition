<article @php post_class() @endphp>
  <div class="container">

    <header class="entry-header entry-header__single-project">
      <h1 class="entry-header--title">{!! $post->title !!}</h1>
      @if($post->thumbnail)
        <figure class="entry-header--image">
          {!! $post->thumbnail !!}
        </figure>
      @endif
    </header>

    <div class="entry-content entry-content__single-project">
      <aside class="entry-content--sidebar">
        @include('partials/project-meta')
      </aside>
      <main class="entry-content--main">
        @if($post->client)<div class="entry-content--project">{{ $post->client }}</div>@endif
          {!! the_content() !!}
      </main>
    </div>
  </div>
</article>
