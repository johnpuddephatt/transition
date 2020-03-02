<section class="home-projects">
  <div class="container">
    <h2 class="section-title">
      Our work <br/>
      Our process
    </h2>
    <div class="home-projects--tag">Projects</div>

    <p class="home-projects--intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>

    <img class="home-projects--title-image" src="@asset('images/projects.jpg')">

    <div class="projects-grid--wrapper">

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

    <a class="button home-projects--read-more" href="/projects/">View all projects</a>

  </div>
</section>
