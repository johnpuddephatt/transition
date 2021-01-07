<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <style>body {display: none}</style>
  <script>(function(H){H.removeAttribute('class')})(document.documentElement)</script>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-1XNVY0FD6J"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-1XNVY0FD6J');
  </script>

  @php wp_head() @endphp

  <meta property="og:locale" content="{{ $meta->locale }}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="{{ $meta->title }}" />
  <meta property="og:description" content="{{ $meta->description }}" />
  <meta property="og:url" content="{{ $meta->url }}" />
  <meta property="og:site_name" content="{{ $meta->site_name }}" />
  <meta property="og:image" content="{{ $meta->image }}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TransitionbyD" />
</head>
