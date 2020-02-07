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
  let wrapper = document.querySelector('#app');

  barba.use(barbaCss);
  barba.init({
    debug: true,
    transitions: [{
      name: 'fade',
      from: {
        // define a custom rule based on the trigger class
        custom: ({ trigger }) => {
          return trigger != 'back' && trigger != 'forward';
        },
      },
      before(e) {
        navTrigger.checked = false;
        if(e.trigger.classList.contains('brand')){
          let triggerBounds = e.trigger.getBoundingClientRect();
          wipe.setAttribute('cx', (triggerBounds.x + triggerBounds.width/2 || 0));
          wipe.setAttribute('cy', (triggerBounds.y + triggerBounds.height/2 || 0));
          wipe.setAttribute('class','triggered');
        }
      },
      afterLeave() {
        history.scrollRestoration = 'manual';
        wrapper.scrollTop = 0;
      },
      after() {
        document.body.className = document.querySelector('[data-barba="container"]').dataset.barbaClass; // copy new classes onto body class
        wipe.removeAttribute('class');
        window.routes.loadEvents();
      },
    },
    {
      name: 'default',
      from: {
        // define a custom rule based on the trigger class
        custom: ({ trigger }) => {
          return trigger == 'back' || trigger == 'forward';
        },
      },
      before() {
        navTrigger.checked = false;
      },
      afterLeave() {
        history.scrollRestoration = 'manual';
        wrapper.scrollTop = 0;
      },
      after() {
        document.body.className = document.querySelector('[data-barba="container"]').dataset.barbaClass; // copy new classes onto body class
        window.routes.loadEvents();
      },
    }],
  });

});
