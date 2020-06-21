<article @php post_class() @endphp>
  <div class="container">

    <header class="entry-header entry-header__single-scrap">
      @if($post->thumbnail)
        <figure class="entry-header--image scraps--item colour__{{ $post->image_colour}} texture__{{ $post->image_texture}} size__{{ $post->image_size }} blend__{{ $post->image_blend}}">
          {!! $post->thumbnail !!}
        </figure>
      @endif
      <h1 class="entry-header--title">{!! $post->title !!}</h1>
    </header>

    <div class="entry-content entry-content__single-scrap">
      <main class="entry-content--main">
          {!! the_content() !!}
      </main>
    </div>
    <nav class="project-navigation project-navigation__scraps">
      @if($post->previous_post)<a class="previous-project" aria-label="Previous project" href="{{ $post->previous_post }}">&larr;</a>
      @else<span class="previous-project">&larr;</span> @endif
      @if($post->next_post)<a class="next-project" aria-label="Next project" href="{{ $post->next_post }}">&rarr;</a>
      @else<span class="next-project">&rarr;</span> @endif
    </nav>
  </div>
</article>
