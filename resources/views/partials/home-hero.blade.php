<section class="home-hero">
  <div class="container">
    <div class="home-hero--text">
      <h2 class="home-hero--title">{{ $hero->post_title }}</h2>
      <p class="home-hero--excerpt">{!! $hero->excerpt !!}</p>
      <a href="{{ $hero->link }}" class="button"
        >See this project&nbsp;&rarr;</a
      >
    </div>
    <div class="home-hero--image">
      <!-- <img src="/wp-content/uploads/2020/06/manorfarm-base.png" alt=""> -->
      <img src="{!! $hero->image !!}" alt="" />
      @if(get_theme_mod('home_hero_textures', true))

      <div class="image--blob"></div>
      <div class="image--blob image--blob_2"></div>
      <div class="image--dots"></div>

@endif
    </div>
  </div>
</section>
