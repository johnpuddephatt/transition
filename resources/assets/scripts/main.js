// import external dependencies
require('intersection-observer');
import barba from '@barba/core';
import barbaCss from '@barba/css';

// Import everything from autoload
import './autoload/**/*'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';
import singleProjects from './routes/project';
import singlePost from './routes/post';
import page from './routes/page';
import projects from './routes/projects';

/** Populate Router instance with DOM routes */
window.routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // Projects index page
  projects,
  // Project pages
  singleProjects,
  // Post pages
  singlePost,
    // Pages
  page,
});

// Load Events
document.addEventListener('DOMContentLoaded', ()=> window.routes.loadEvents());

document.addEventListener('DOMContentLoaded', () => {
  let wipe = document.querySelector('.pageload--wipe circle');
  let navTrigger = document.querySelector('.nav-trigger');

  barba.use(barbaCss);

  try {

    barba.hooks.before((data) => {
      navTrigger.checked = false;
      barba.wrapper.classList.add('is-animating');
      let currentScroll = barba.wrapper.scrollTop;
      data.next.container.style.top = currentScroll + 'px';
    });

    barba.hooks.after((data) => {
      barba.wrapper.classList.remove('is-animating');
      barba.wrapper.scrollTop = data.next.container.offsetTop;
      document.body.className = document.querySelector('[data-barba="container"]').dataset.barbaClass; // copy new classes onto body class
      window.routes.loadEvents();
    });

    barba.hooks.enter(() => {
      history.scrollRestoration = 'manual';
      // data.current.container.scrollIntoView({
      //   behavior: 'smooth',
      // });
      // data.next.container.scrollIntoView({
      //   behavior: 'smooth',
      // });
    });

    barba.init({
      debug: true,
      transitions: [{
          name: 'left',
          from: {
            custom: ({ trigger }) => { return trigger.classList.contains('next-project')},
          },
          sync: true,
        },
        {
            name: 'right',
            from: {
              custom: ({ trigger }) => { return trigger.classList.contains('previous-project') },
            },
            sync: true,
          },
        {
        name: 'fade',
        from: {
          custom: ({ trigger }) => { return trigger != 'back' && trigger != 'forward' },
        },
        before(e) {
          if(e.trigger.classList.contains('brand')){
            let triggerBounds = e.trigger.getBoundingClientRect();
            wipe.setAttribute('cx', (triggerBounds.x + triggerBounds.width/2 || 0));
            wipe.setAttribute('cy', (triggerBounds.y + triggerBounds.height/2 || 0));
            wipe.setAttribute('class','triggered');
          }
        },

        after() {
          wipe.removeAttribute('class');
        },
      },
      {
        name: 'default',
        from: {
          custom: ({ trigger }) => { return trigger == 'back' || trigger == 'forward' },
        },
      }],
    });
  } catch (err) {
    console.error(err);
  }

});
