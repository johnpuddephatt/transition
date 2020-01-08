<div class="entry-content--meta-top">
  <div class="entry-content--number">01</div>
</div>

<div class="entry-content--meta-bottom">
  @if($project_footnotes)
    <h3>Project notes</h3>
    {!! $project_footnotes !!}
  @endif
  {{-- <time class="updated" datetime="{{ get_post_time('c', true) }}">{{ get_the_date() }}</time>
  <p class="byline author vcard">
    {{ __('By', 'sage') }} <a href="{{ get_author_posts_url(get_the_author_meta('ID')) }}" rel="author" class="fn">
      {{ get_the_author() }}
    </a>
  </p> --}}
</div>
