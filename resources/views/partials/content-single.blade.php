<article @php post_class() @endphp>
  <div class="container">
    <header class="entry-header entry-header__single-post">
      <div>
        @if($post->category)<span class="tag">{{$post->category->name}}</span>@endif
        <h1 class="entry-header--title">{!! $post->title !!}</h1>
      </div>
    </header>
    <div class="entry-content entry-content__single-post">
      <div class="entry-content--sidebar">
        @include('partials/post-meta')
      </div>

      <main class="entry-content--main">
        {!! the_content() !!}

        <div class="related-posts">
          <h2 class="related-posts--title">More research & writing...</h2>
          @foreach($post->related_posts as $related_post)
            <a class="related-posts--item" href="{{ $related_post->link }}">
              <h3 class="related-posts--item--title">{{ $related_post->post_title  }}</h3>
              <p class="related-posts--item--excerpt">{!! $related_post->post_excerpt !!}</p>
              <div class="related-posts--item--author">
                  {!! $related_post->author_image !!}
                  <span>
                    @if($related_post->author->user_login != 'admin')
                      {{ $related_post->author->display_name }}
                    @endif
                  </span>
              </div>
            </a>
          @endforeach
        </div>

        @include('partials.newsletter')

      </main>
    </div>

  </div>
</article>
