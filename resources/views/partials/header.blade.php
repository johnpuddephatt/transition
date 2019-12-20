<header class="banner">
  {{-- <div class="container"> --}}

    <a class="brand" href="{{ home_url('/') }}">
       @if(has_site_icon())
         <img src="{{ get_site_icon_url() }}" alt="Transition by Design Logo"/>
       @endif
      <span class="sr-only">{{ get_bloginfo('name', 'display') }}</span>
    </a>

    <input type="checkbox" id="nav-trigger" class="nav-trigger" />
    <label for="nav-trigger">
      <span class="menu-icon">
        @include('icons.menu')
      </span>
    </label>

    <nav class="trigger nav-primary">
      @if (has_nav_menu('primary_navigation'))
        {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']) !!}
      @endif
    </nav>

  {{-- </div> --}}
</header>
