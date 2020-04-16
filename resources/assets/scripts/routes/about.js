import inView from '../util/inView';

export default {
  init() {
    // JavaScript to be fired on the about us page
    console.log('about us.js');
  },
  finalize() {
    inView('.about-people--grid--item', 0.2);
  },
};
