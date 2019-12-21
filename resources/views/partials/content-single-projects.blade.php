<article @php post_class() @endphp>
  <div class="container">
    <header>
      <h1 class="post-title">{!! App::Title() !!}</h1>
      <em>{{ $excerpt }}</em>
      <p>Custom: {{ $custom_name }}</p>

      @if($featured_image)
        <figure class="entry-image">
          {!! $featured_image !!}
        </figure>
      @endif

      @include('partials/entry-meta')
    </header>


    <div class="entry-content">
      @php the_content() @endphp
    </div>

    <footer>
      {!! wp_link_pages(['echo' => 0, 'before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']) !!}
    </footer>
    @php comments_template('/partials/comments.blade.php') @endphp
  </div>
</article>
