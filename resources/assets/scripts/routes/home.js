require('typesplit');

const SplitType = window.SplitType;

export default {
  init() {
    // JavaScript to be fired on the home page

  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
    new SplitType('.loading--title', { split: 'chars', tagName: 'span' });

    (function aboutIntersectionObserver() {
      let callback = function (entries) {
        entries.forEach(entry => {
          if(entry.intersectionRatio > 0) {
            entry.target.classList.add('in-view');
          }
        });
      };
      let options = {
        // rootMargin: '0px 0px',
        threshold: 0.1,
      }
      let observer = new IntersectionObserver(callback, options);
      let target = document.querySelector('.home-about');
      observer.observe(target);
    })();

    (function projectsIntersectionObserver() {
      let height = window.innerHeight;
      let targets = document.querySelectorAll('.home-projects--list li');
      let targetHeight = targets[0].clientHeight;
      let callback = function (entries) {
        entries.forEach(entry => {
          if(entry.intersectionRatio > 0.5) {
            entry.target.classList.add('active');
          }
          else{
            entry.target.classList.remove('active');
          }
        });
      };

      let options = {
        rootMargin: `-${(height - targetHeight)/2}px 0px`,
        threshold: 0.5,
      }
      let observer = new IntersectionObserver(callback, options);
      targets.forEach(target => {
        observer.observe(target);
      });

    })();



    // let heroSplit = new SplitType('.loading--title', { split: 'words,chars', tagName: 'span' });
    // window.addEventListener('resize', ()=>{
    //   heroSplit.revert();
    //   new SplitType('.loading--title', { split: 'words,chars', tagName: 'span' });
    // });
  },
};
