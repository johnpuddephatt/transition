import inView from '../util/inView';

export default {
  init() {
    // JavaScript to be fired on the home page
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
    inView('.projects-grid--project', 0.5);
  },
};
