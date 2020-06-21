<div class="entry-content--meta-top">
  @if($post->author->user_login != 'admin')
    <a rel="author" href="{{ get_author_posts_url(get_the_author_meta('ID')) }}" class="entry-content--author">
      <div class="entry-content--author--image">
        {!! $post->author_image !!}
      </div>
      <h3 class="entry-content--author--name">{{ $post->author->display_name }}</h3>
      <p class="entry-content--author--role">{{ $post->author_role }}</p>
    </a>
  @endif

  <time class="entry-content--date" datetime="{{ $post->post_modified }}">{{ $post->date }}</time>
</div>
