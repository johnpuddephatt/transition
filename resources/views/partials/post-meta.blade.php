<div class="entry-content--meta-top">
  <a rel="author" href="{{ get_author_posts_url(get_the_author_meta('ID')) }}" class="entry-content--author">
      <div class="entry-content--author--image">
        {!! $post->author_image !!}
      </div>
      <h3 class="entry-content--author--name">{{ $post->author->display_name }}</h3>
      <p class="entry-content--author--role">Housing Lead</p>
      <time class="entry-content--date" datetime="{{ get_post_time('c', true) }}">{{ get_the_date() }}</time>
  </a>
</div>
