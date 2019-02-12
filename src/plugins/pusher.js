import Vue from 'vue'

/* ============
 * Laravel Echo
 * ============
 *
 * Laravel Echo is a JavaScript library that makes it painless to subscribe
 * to channels and listen for events broadcast by Laravel.
 *
 * https://github.com/laravel/echo
 */
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_PUSHER_KEY,
  cluster: process.env.VUE_APP_PUSHER_CLUSTER,
  authEndpoint: process.env.VUE_APP_BROADCAST_AUTH_ENDPOINT,
});

// Bind Laravel Echo to Vue.
Vue.$echo = echo;
Object.defineProperty(Vue.prototype, '$echo', {
  get () {
    return echo;
  },
});
