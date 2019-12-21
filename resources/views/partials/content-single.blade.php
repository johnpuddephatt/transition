<article @php post_class() @endphp>
  <div class="container">
    <header>
      <h1 class="post-title">{!! get_the_title() !!}</h1>
      @if( has_post_thumbnail() )
        <figure class="entry-image">
          {{ the_post_thumbnail( 'large' ) }}
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
