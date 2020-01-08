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

/** Populate Router instance with DOM routes */
window.routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // Project pages
  singleProjects,
});

// Load Events
document.addEventListener('DOMContentLoaded', ()=> window.routes.loadEvents());

document.addEventListener('DOMContentLoaded', () => {
  let wipe = document.querySelector('.pageload--wipe circle');
  barba.use(barbaCss);
  barba.init({
    debug: true,
    transitions: [{
      before(e) {
        wipe.setAttribute('cx', (e.trigger.offsetLeft || 0));
        wipe.setAttribute('cy', (e.trigger.offsetTop || 0));
        wipe.setAttribute('class','triggered');
      },
      after() {
        document.body.className = document.querySelector('main').dataset.barbaClass; // copy new classes onto body class
        console.log('after');
        wipe.removeAttribute('class');
        window.routes.loadEvents();
      },
    }],
  });
});
