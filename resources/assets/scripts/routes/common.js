import inView from '../util/inView';

export default {
  init() {
    // JavaScript to be fired on all pages
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
    inView('.projects-grid--project', 0.2);
    inView('.wp-block-image', 0.2);
    inView('.scraps--item', 0.2);
  },
};
