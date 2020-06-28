<section class="home-projects">
  <div class="container">
    <div class="home-projects--intro">

      <h2 class="section-title">
        Our work <br/>
        Our process
      </h2>
      <div class="home-projects--tag">Projects</div>

      <p class="home-projects--intro--text">
        {{ get_theme_mod('home_projects_text', 'Our work is motivated by the belief that collaboration combined with good design can solve complex problems and improve the world we live in.') }}
      </p>

      <img class="home-projects--title-image" src="@asset('images/projects.jpg')">

    </div>

    <div class="projects-grid--wrapper">
      <div class="projects-grid projects-grid__irregular">

        @foreach($projects as $project)
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

    <a class="button solid home-projects--read-more" href="/projects/">View all projects</a>

  </div>
</section>
