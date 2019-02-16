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

// The middleware for every page of the application.
const globalMiddleware = ['locale', 'check-auth']

// Load middleware modules dynamically.
const routeMiddleware = resolveMiddleware(
  require.context('@/middleware', false, /.*\.js$/)
)

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

require('@/plugins')
require('@/components')
require('@/filters')

require('offline-plugin/runtime').install()

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

export const router = createRouter()

/**
 * Create a new router instance.
 *
 * @return {VueRouter}
 */
function createRouter () {
  const router = new VueRouter({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior,
    routes
  })

  router.beforeEach(beforeEach)
  router.afterEach(afterEach)

  return router
}

router.afterEach(afterEach);

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
import '@/assets/stylus/app.styl'

export default {
  router
}

/**
 * Global router guard.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function beforeEach (to, from, next) {
  // Get the matched components and resolve them.
  const components = await resolveComponents(
    router.getMatchedComponents({ ...to })
  )

  if (components.length === 0) {
    return next()
  }

  // Start the loading bar.
  if (components[components.length - 1].loading !== false) {
    router.app.$nextTick(() => router.app.$loading.start())
  }

  // Get the middleware for all the matched components.
  const middleware = getMiddleware(components)

  // Call each middleware.
  callMiddleware(middleware, to, from, (...args) => {
    // Set the application layout only if "next()" was called with no args.
    if (args.length === 0) {
      router.app.setLayout(components[0].layout || '')
    }

    next(...args)
  })
}

/**
 * Global after hook.
 *
 */
async function afterEach () {
  await router.app.$nextTick()
  router.app.$loading.finish()
}

/**
 * Call each middleware.
 *
 * @param {Array} middleware
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
function callMiddleware (middleware, to, from, next) {
  const stack = middleware.reverse()

  const _next = (...args) => {
    // Stop if "_next" was called with an argument or the stack is empty.
    if (args.length > 0 || stack.length === 0) {
      if (args.length > 0) {
        router.app.$loading.finish()
      }

      return next(...args)
    }

    const middleware = stack.pop()

    if (typeof middleware === 'function') {
      middleware(to, from, _next)
    } else if (routeMiddleware[middleware]) {
      routeMiddleware[middleware](to, from, _next)
    } else {
      throw Error(`Undefined middleware [${middleware}]`)
    }
  }

  _next()
}

/**
 * Resolve async components.
 *
 * @param  {Array} components
 * @return {Promise<any[]>}
 */
function resolveComponents (components) {
  return Promise.all(components.map(component => {
    return typeof component === 'function' ? component() : component
  }))
}

/**
 * Merge the the global middleware with the components middleware.
 *
 * @param  {Array} components
 * @return {Array}
 */
function getMiddleware (components) {
  const middleware = [...globalMiddleware]

  components.filter(c => c.middleware).forEach(component => {
    if (Array.isArray(component.middleware)) {
      middleware.push(...component.middleware)
    } else {
      middleware.push(component.middleware)
    }
  })

  return middleware
}

/**
 * Scroll Behavior
 *
 * @link https://router.vuejs.org/en/advanced/scroll-behavior.html
 *
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
function scrollBehavior (to, from, savedPosition) {
  return new Promise((resolve, reject) => {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return { selector: to.hash }
    }

    const [component] = router.getMatchedComponents({ ...to }).slice(-1)

    if (component && component.scrollToTop === false) {
      return {}
    }

    setTimeout(() => {
      resolve({ x: 0, y: 0 })
    }, 500)
  })
}

/**
 * @param  {Object} requireContext
 * @return {Object}
 */
function resolveMiddleware (requireContext) {
  return requireContext.keys()
    .map(file =>
      [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((guards, [name, guard]) => (
      { ...guards, [name]: guard.default }
    ), {})
}
