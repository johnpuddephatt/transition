@if($research && $writing)
  <section class="home-blog">
    <div class="container">
      <div class="column">
        <a href="/articles/">
          <h2 class="section-title">Research &amp; writing</h2>
        </a>
        <a href="/articles/" class="home-blog--read-all">Read all</a>
        <div class="home-blog--article">
          <div class="home-blog--mask"></div>
          <div class="home-blog--image">
            {!! $writing->thumbnail !!}
          </div>
          <div class="home-blog--text">
            <div class="home-blog--tag">Writing</div>
            <h3 class="home-blog--title">{{ $writing->post_title }}</h3>
            <p class="home-blog--excerpt">{{ $writing->post_title }}</p>
            <a href="{{ $writing->link }}" class="home-blog--read-more">Read more</a>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="home-blog--article">
          <div class="home-blog--image">
            {!! $research->thumbnail !!}
          </div>
          <div class="home-blog--mask"></div>
          <div class="home-blog--text">
            <div class="home-blog--tag">Research</div>
            <h3 class="home-blog--title">{{ $research->post_title }}</h3>
            <p class="home-blog--excerpt">{!! $research->excerpt !!}</p>
            <a href="{{ $research->link }}" class="home-blog--read-more">Read more</a>
          </div>
        </div>
      </div>
    </div>
  </section>
@endif

@if($updates)
  <section class="home-updates">
    <div class="container">
      <h2 class="section-title">Updates</h2>
    </div>
    <div class="container">
      @foreach($updates as $update)
        <div class="home-updates--item">
          <time class="home-updates--item--date" datetime="{{ $update->post_modified }}">{{ $update->date }}</time>
          <h3 class="home-updates--item--title">{{ $update->post_title }}</h3>
          <p class="home-updates--item--excerpt">{!! $update->excerpt !!}</p>
          <a href="{{ $update->link }}" class="home-updates--item--read-more">Read more</a>
        </div>
      @endforeach
    </div>
  </section>
@endif
