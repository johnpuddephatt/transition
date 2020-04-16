
<div class="entry-content entry-content__page">

  <main class="entry-content--main">

    @if( $post->thumbnail )
      <figure class="entry-header--image entry-header--image__page">
        {!! $post->thumbnail !!}
      </figure>
    @endif

    {!! the_content() !!}
  </main>

</div>
