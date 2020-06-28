import $ from 'jquery';

// wp.customize('blogname', (value) => {
//   value.bind(to => $('.brand').text(to));
// });

wp.customize('blogdescription', (value) => {
  value.bind(to => $('.site-footer--title').text(to));
});

wp.customize('home_about_text', (value) => {
  value.bind(to => $('.home-about--title').text(to));
});

wp.customize('home_about_button', (value) => {
  value.bind(to => $('.home-about--button span').text(to));
});

wp.customize('home_projects_text', (value) => {
  value.bind(to => $('.home-projects--intro--text').text(to));
});

wp.customize('newsletter_heading', (value) => {
  value.bind(to => $('.newsletter-signup--heading').text(to));
});

wp.customize('newsletter_disclaimer', (value) => {
  value.bind(to => $('.newsletter-signup--disclaimer').html(to));
});

wp.customize('contact_phone_human', (value) => {
  value.bind(to => $('.contact-phone').text(to));
});

wp.customize('contact_email', (value) => {
  value.bind(to => $('.contact-email').text(to));
});

wp.customize('contact_address', (value) => {
  value.bind(to => $('.contact-address').text(to));
});

wp.customize('home_sketchbook_text', (value) => {
  value.bind(to => $('.home-scrapbook--intro').text(to));
});

wp.customize('home_sketchbook_button', (value) => {
  value.bind(to => $('.home-scrapbook--button span').text(to));
});
