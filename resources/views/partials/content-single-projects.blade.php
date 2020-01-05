<article @php post_class() @endphp>
  <div class="container">
    <header class="entry-header">
      <h1 class="entry-header--title">{!! App::Title() !!}</h1>
      @if($featured_image)
        <figure class="entry-header--image">
          {!! $featured_image !!}
        </figure>
      @endif
    </header>

    <div class="entry-content">
      <aside class="entry-content--sidebar">
        <div class="entry-content--meta">
          <div class="entry-content--number">01</div>
        </div>
      </aside>
      <main>
        <div class="entry-content--project">{{ $project_name }}</div>
        @php the_content() @endphp
        @include('partials/entry-meta')
      </main>
    </div>

    <footer>
      {!! wp_link_pages(['echo' => 0, 'before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']) !!}
    </footer>
    @php comments_template('/partials/comments.blade.php') @endphp
  </div>
</article>
