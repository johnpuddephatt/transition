<div class="entry-content entry-content__page">

  <main class="entry-content--main">

    @if( $page->thumbnail )
      <figure class="entry-header--image entry-header--image__page">
        {!! $page->thumbnail !!}
      </figure>
    @endif

    <h2 class="tag">About us</h2>

    {!! the_content() !!}

    <div class="about-people">
      <h2 class="tag">Our people</h2>
      <div class="about-people--grid">

        @foreach($team as $user)
          <a href="/about/{{ $user->user_login }}" class="about-people--grid--item">
            <div class="about-people--grid--item--image">{!! $user->image !!}</div>
            <h3>{{ $user->display_name }}</h3>
            <p>{{ $user->position }}</p>
          </a>
        @endforeach
      </div>
    </div>

    <div class="about-services">
      <h2 class="tag">Our services</h2>
      <p>As an interdisciplinary co-operative we use a range of skillsets to unlock solutions to complex problems. We’re passionate about making the world a better place by design.</p>
      <ul class="about-services--list">
        @foreach($services as $service)
          <li><a class="about-services--list--item--anchor" href="/service/{{$service->slug }}">{!! $service->name !!}</a></li>
        @endforeach
      </ul>
    </div>



  </main>

  <div class="entry-content--sidebar">
    <h2 class="tag">Contact us</h2>
    <address class="sidebar--address">
      Transition by Design<br>
      Makespace Oxford<br>
      1 Aristotle Lane<br>
      Oxford<br>
      OX2 6TP
    </address>
    <a class="sidebar--email" href="mailto:info@transitionbydesign.org">info@transitionbydesign.org</a>
    <a class="sidebar--phone" href="tel:01865554927">01865 554 927</a>
  </div

</div>
