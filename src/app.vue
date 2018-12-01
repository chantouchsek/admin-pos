<template>
  <router-view/>
</template>

<script>
  import store from '@/store'
  import { router } from './bootstrap'

  export default {
    name: 'app',
    /**
     * The Vuex store.
     */
    store,

    /**
     * The router.
     */
    router,

    /**
     * This method will be fired once the application has been mounted.
     */
    mounted () {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          //
        }

        if (!state.auth.authenticated) {
          //
        }
      })
    },

    /**
     * Watch the router changed
     */
    watch: {
      //
    },
    directives: {
      focus: {
        inserted (el) {
          el.focus()
        }
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
