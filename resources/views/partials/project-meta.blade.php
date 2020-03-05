<div class="entry-content--meta-top">
  <div class="entry-content--meta-top--inner">
    <div class="entry-content--number">{{ $post->relative_id }}</div>
    <nav class="project-navigation">
      @if($post->previous_post)<a class="previous-project" aria-label="Previous project" href="{{ $post->previous_post }}">&larr;</a>
      @else<span class="previous-project">&larr;</span> @endif
      @if($post->next_post)<a class="next-project" aria-label="Next project" href="{{ $post->next_post }}">&rarr;</a>
      @else<span class="next-project">&rarr;</span> @endif
    </nav>
  </div>
</div>

<div class="entry-content--meta-bottom">
  @if($post->footnotes)
    <h3>Project notes</h3>
    {!! $post->footnotes !!}
  @endif
</div>
