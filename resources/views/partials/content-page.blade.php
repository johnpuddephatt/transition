
<div class="entry-content entry-content__page">

  <main class="entry-content--main">

    @if( $post->thumbnail )
      <figure class="entry-header--image entry-header--image__page">
        {!! $post->thumbnail !!}
      </figure>
    @endif

    {!! the_content() !!}
  </main>

  <div class="entry-content--sidebar">
    <address>
      Transition by Design<br>
      Makespace Oxford<br>
      1 Aristotle Lane<br>
      Oxford<br>
      OX2 6TP
    </address>

    <p><a href="mailto:info@transitionbydesign.org">info@transitionbydesign.org</a></p>
    <p><a href="tel:01865554927">01865554927</a></p>
  </div>

</div>
