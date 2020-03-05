<div class="entry-content--meta-top">
  <div class="entry-content--number">{{ $post->relative_id }}</div>
</div>

<div class="entry-content--meta-bottom">
  @if($post->footnotes)
    <h3>Project notes</h3>
    {!! $post->footnotes !!}
  @endif
</div>
