/* ============
 * Bootstrap File
 * ============
 *
 * This will configure and bootstrap the application.
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'

/* ============
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'

Vue.config.debug = process.env.NODE_ENV !== 'production';


/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */
import Axios from 'axios';

Axios.defaults.baseURL = process.env.VUE_APP_API_LOCATION;
Axios.defaults.headers.common.Accept = 'application/json';

// Bind Axios to Vue.
Vue.$http = Axios;
Object.defineProperty(Vue.prototype, '$http', {
  get () {
    return Axios;
  },
});


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


/* ============
 * Vuex Router Sync
 * ============
 *
 * Effortlessly keep vue-router and vuex store in sync.
 *
 * https://github.com/vuejs/vuex-router-sync/blob/master/README.md
 */
import VuexRouterSync from 'vuex-router-sync';
import store from '@/store';

store.dispatch('auth/check');


/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */
import VueRouter from 'vue-router';
import routes from '@/routes';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      console.log(savedPosition, reject)
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 500)
    })
  },
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
    next({
      name: 'Login',
    });
  } else if (to.matched.some(m => m.meta.guest) && store.state.auth.authenticated) {
    next({
      name: 'Dashboard',
    });
  } else {
    next();
  }
});
router.afterEach(() => {
  if (store.state.application.drawerActive) {
    Vue.nextTick(() => {
      store.dispatch('application/hideDrawer');
    });
  }
});

Vue.use(BootstrapVue)

VuexRouterSync.sync(store, router);

Vue.router = router;

/* ============
 * Styling
 * ============
 *
 * Require the application styling.
 *
 * http://stylus-lang.com/
 */
import '@/assets/stylus/app.styl';

export default {
  router,
};
