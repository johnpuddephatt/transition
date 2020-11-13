wp.domReady( function() {

  wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-category' ) ;
  wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-post_tag' );
  wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'discussion-panel' );

  wp.blocks.unregisterBlockType( 'core/verse' );
  wp.blocks.unregisterBlockType( 'core/cover' );
  wp.blocks.unregisterBlockType( 'core/more' );
  wp.blocks.unregisterBlockType( 'core/code' );
  wp.blocks.unregisterBlockType( 'core/nextpage' );
  wp.blocks.unregisterBlockType( 'core/preformatted' );
  wp.blocks.unregisterBlockType( 'core/html' );
  wp.blocks.unregisterBlockType( 'core/embed' );
  wp.blocks.unregisterBlockType( 'core/archives' );
  wp.blocks.unregisterBlockType( 'core/categories' );
  wp.blocks.unregisterBlockType( 'core/calendar' );
  wp.blocks.unregisterBlockType( 'core/tag-cloud' );
  wp.blocks.unregisterBlockType( 'core/rss' );
  wp.blocks.unregisterBlockType( 'core/search' );
  wp.blocks.unregisterBlockType( 'core/shortcode' );
  wp.blocks.unregisterBlockType( 'core/latest-posts' );
  wp.blocks.unregisterBlockType( 'core/latest-comments' );
  wp.blocks.unregisterBlockType( 'core/spacer' );

  wp.blocks.unregisterBlockStyle( 'core/quote', 'default' );
  wp.blocks.unregisterBlockStyle( 'core/image', 'circle-mask' );
  wp.blocks.unregisterBlockStyle( 'core/pullquote', 'solid-color' );

  wp.blocks.registerBlockStyle( 'core/paragraph', {
      name: 'two-columns',
      label: 'Two columns',
  } );

  wp.blocks.registerBlockStyle( 'core/image', {
      name: 'grain',
      label: 'Grain',
  } );

  wp.blocks.registerBlockStyle( 'core/image', {
      name: 'full-width',
      label: 'Full width',
  } );

  wp.blocks.registerBlockStyle( 'core/image', {
      name: 'full-width-grain',
      label: 'Full width + grain',
  } );


});
