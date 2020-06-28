<footer class="site-footer">
    <a class="site-footer--brand" href="{{ home_url('/') }}">
      @if(has_site_icon())
        <img src="{{ get_site_icon_url() }}" alt="Transition by Design Logo"/>
      @endif
    </a>
    <div class="site-footer--brand--text">
      <h3 class="site-footer--title">{{ get_bloginfo('description', 'display') }}</h3>
      <p>
        <span class="site-footer--address contact-address">{{ get_theme_mod('contact_address', 'Makespace Oxford, Aristotle Ln, Oxford OX2 6TP') }}</span>
      <br><a class="site-footer--email contact-email" href="mailto:{{ get_theme_mod('contact_email', 'info@transitionbydesign.org') }}">{{ get_theme_mod('contact_email', 'info@transitionbydesign.org') }}</a>
      <br><a class="site-footer--phone contact-phone" href="telto:{{ get_theme_mod('contact_phone', '00441865554927') }}">{{ get_theme_mod('contact_phone_human', '(+44) 1865 554927') }}</a></p>
    </div>
    <div class="site-footer--logos">
      <a href="https://uk.coop/directory/transition-design-cooperative">
        <img src="@asset('images/cuk_member.svg')" />
      </a>
      <a href="https://www.architecture.com/find-an-architect/transition-by-design/oxford">
        <img src="@asset('images/RIBA-logo.svg')" />
      </a>
    </div>
</footer>
