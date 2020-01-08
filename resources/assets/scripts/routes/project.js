import inView from '../util/inView';

export default {
  init() {
    // JavaScript to be fired on the home page
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
    inView('.wp-block-image', 0.2);
  },
};
