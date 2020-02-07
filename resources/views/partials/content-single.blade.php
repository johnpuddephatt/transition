<article @php post_class() @endphp>
  <div class="container">
    <header class="entry-header entry-header__single-post">
      <div>
        <span class="tag">{{$post->category->name}}</span>
        <h1 class="entry-header--title">{!! $post->title !!}</h1>
      </div>
    </header>
    <div class="entry-content entry-content__single-post">
      <div class="entry-content--sidebar">
        @include('partials/post-meta')
      </div>

      <main class="entry-content--main">
        {!! the_content() !!}
      </main>
    </div>

  </div>
</article>
