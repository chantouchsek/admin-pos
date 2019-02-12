<template>
  <div id="app">
    <loading ref="loading"/>
    <transition name="page" mode="out-in">
      <component :is="layout" v-if="layout"/>
    </transition>
  </div>
</template>

<script>
  import store from '@/store'
  import { router } from './bootstrap'
  import i18n from '@/plugins/i18n'

  import Loading from '@/components/Loading'
  // Load layout components dynamically.
  const requireContext = require.context('@/layouts', false, /.*\.vue$/)
  const layouts = requireContext.keys()
    .map(file =>
      [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
    )
    .reduce((components, [name, component]) => {
      components[name] = component.default || component
      return components
    }, {})

  export default {
    name: 'app',
    /**
     * The Locale Language
     */
    i18n,
    /**
     * The Vuex store.
     */
    store,

    /**
     * The router.
     */
    router,

    /**
     * Components
     */
    components: {
      Loading
    },

    /**
     * Data
     */
    data: () => ({
      layout: null,
      defaultLayout: 'default'
    }),

    /**
     * Meta
     */
    metaInfo () {
      const { appName } = {
        "appName": "Point Of Sales",
        "locale": "en",
        "locales": { "en": "EN", "km": "KM" }
      }
      return {
        title: appName,
        titleTemplate: `%s · ${appName}`
      }
    },

    /**
     * This method will be fired once the application has been mounted.
     */
    mounted () {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          this.$store.dispatch('auth/fetchUser')
        }

        if (!state.auth.authenticated) {
          //
        }
      })
      this.$loading = this.$refs.loading
    },
    methods: {
      /**
       * Set the application layout.
       *
       * @param {String} layout
       */
      setLayout (layout) {
        if (!layout || !layouts[layout]) {
          layout = this.defaultLayout
        }
        this.layout = layouts[layout]
      }
    }
  }
</script>

<style lang="scss">
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
