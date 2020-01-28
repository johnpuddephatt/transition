import 'typesplit';
import inView from '../util/inView';

const SplitType = window.SplitType;

export default {
  init() {
    // JavaScript to be fired on the home page
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS

    console.log('home.js');

    new SplitType('.loading--title', { split: 'chars', tagName: 'span' });
    // new SplitType('.home-projects .section-title', { split: 'chars', tagName: 'span' });

    inView('.home-about', 0.1);
    inView('.home-blog', 0.1);

    inView('.home-projects .section-title', 1);
    inView('.home-blog .section-title', 1);
    inView('.home-projects--project', 0.5);

    // Not in use, was for experimental project list layout
    // (function projectsIntersectionObserver() {
    //   let height = window.innerHeight;
    //   let targets = document.querySelectorAll('.home-projects--list li');
    //   if(targets.length) {
    //     let targetHeight = targets[0].clientHeight;
    //     let callback = function (entries) {
    //       entries.forEach(entry => {
    //         if(entry.intersectionRatio > 0.5) {
    //           entry.target.classList.add('active');
    //         }
    //         else{
    //           entry.target.classList.remove('active');
    //         }
    //       });
    //     }
    //
    //     let options = {
    //       rootMargin: `-${(height - targetHeight)/2}px 0px`,
    //       threshold: 0.5,
    //     }
    //     let observer = new IntersectionObserver(callback, options);
    //     targets.forEach(target => {
    //       observer.observe(target);
    //     });
    //   }
    // })();

  },
};
