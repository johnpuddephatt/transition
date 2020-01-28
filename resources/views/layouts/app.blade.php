@if(!isset($_SERVER['HTTP_X_BARBA']))

  <!doctype html>
  <html class="no-js" {!! get_language_attributes() !!}>
    <script>(function(H){H.removeAttribute('class')})(document.documentElement)</script>
    @include('partials.head')
    <body @php body_class() @endphp>

      @if(is_home())
        @include('partials.welcome')
      @endif

      @include('partials.loading')

      <div id="app" data-barba="wrapper" role="document">
        @php do_action('get_header') @endphp
        @include('partials.header')

@endif

        <div data-barba-class="{{ join( ' ', get_body_class()) }}" data-barba="container" data-barba-namespace="{{ basename( get_permalink() ) }}">

          <main>
            @yield('content')
          </main>
          @php do_action('get_footer') @endphp
          @include('partials.footer')
        </div>

@if(!isset($_SERVER['HTTP_X_BARBA']))

        @php wp_footer() @endphp
      </div>
    </body>
  </html>

@endif
