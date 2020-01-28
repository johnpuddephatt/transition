<footer class="site-footer">
    <a class="site-footer--brand" href="{{ home_url('/') }}">
      @if(has_site_icon())
        <img src="{{ get_site_icon_url() }}" alt="Transition by Design Logo"/>
      @endif
      <div class="brand--text">
        <h3 class="site-footer--title">{{ get_bloginfo('description', 'display') }}</h3>
        <p>Makespace Oxford, Aristotle Ln, Oxford OX2 6TP <br>(+44) 1865 554927</p>
      </div>
    </a>
    <div class="site-footer--logos">
      <a href="https://uk.coop/directory/transition-design-cooperative">
        <img src="@asset('images/cuk_member.svg')" />
      </a>
      <a href="https://www.architecture.com/find-an-architect/transition-by-design/oxford">
        <img src="@asset('images/RIBA-logo.svg')" />
      </a>
    </div>
    @php dynamic_sidebar('sidebar-footer') @endphp
</footer>
