<template>
  <div class="animated fadeIn">
    <b-card
      border-variant="secondary"
      header="User Detail"
      header-bg-variant="secondary"
      header-text-variant="black"
      align="left"
    >
      <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
    </b-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given group identifier.
       */
      uuid: {
        type: [String, Number],
        required: true
      }
    },
    name: 'UserDetail',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    computed: {
      ...mapGetters({ 'detail': 'user/detail' })
    },
    data () {
      return {
        //
      }
    },
    methods: {
      goBack () {
        this.$router.push({ name: 'user.index' })
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    async mounted () {
      const vm = this
      await vm.$store.watch((state) => {
        if (state.auth.authenticated) {
          vm.$store.dispatch('user/detail', vm.uuid)
        }
      })
    }
  }
</script>
