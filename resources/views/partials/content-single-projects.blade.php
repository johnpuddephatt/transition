<article @php post_class() @endphp>
  <div class="container">

    <header class="entry-header entry-header__single-project">
      <h1 class="entry-header--title">{!! $post->title !!}</h1>
      @if($post->thumbnail)
        <figure class="entry-header--image">
          {!! $post->thumbnail !!}
        </figure>
      @endif
    </header>

    <div class="entry-content entry-content__single-project">
      <aside class="entry-content--sidebar">
        @include('partials/project-meta')
      </aside>
      <main class="entry-content--main">
        @if($post->client)<div class="entry-content--project">{{ $post->client }}</div>@endif
          {!! the_content() !!}
      </main>
    </div>
    <div class="projects-grid--wrapper projects-grid--wrapper__related">
      <h2 class="projects-grid--header">Explore more</h2>
      <div class="projects-grid projects-grid__related">
        @foreach($post->related_projects as $project)
          <a href="{!! $project->link !!}" class="projects-grid--project">
            <div class="projects-grid--image">
              {!! $project->thumbnail !!}
            </div>
            <h3 class="projects-grid--heading">{!! $project->client !!}</h3>
            <p class="projects-grid--excerpt">{!! $project->excerpt !!}</p>
            <p class="projects-grid--read-more">See this project&nbsp;&rarr;</p>
          </a>
        @endforeach
      </div>
    </div>
  </div>
</article>
