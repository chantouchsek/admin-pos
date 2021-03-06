/* ============
 * Vuex Store
 * ============
 *
 * The store of the application
 *
 * http://vuex.vuejs.org/en/index.html
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

// Load store modules dynamically.
const requireContext = require.context('./modules/', true, /index\.js$/)

const modules = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
  )
  .reduce((modules, [name, module]) => {
    if (module.default.namespaced === undefined) {
      module.default.namespaced = true
    }
    return { ...modules, [name.replace('/index', '')]: module.default }
  }, {})

export default new Vuex.Store({
  /**
   * Assign the modules to the store.
   */
  modules,

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [
    createLogger(),
    createPersistedState(createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: key => Cookies.remove(key)
      }
    }))
  ] : [
    createPersistedState(createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: key => Cookies.remove(key)
      }
    }))
  ]
});
