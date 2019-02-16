<template>
  <div class="animated fadeIn">
    <b-card
      border-variant="secondary"
      header="User Detail"
      header-bg-variant="secondary"
      header-text-variant="black"
      align="left"
    >

      <b-media>
        <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder"/>
        <h5 class="mt-0">{{ detail.name }}</h5>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
          Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
          ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </p>
        <p>
          Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
      </b-media>

      <b-card-footer footer-border-variant="primary">

        <b-button type="button" variant="primary" class="mr-1" :disabled="$errors.busy">
          <i class="fa fa-pencil-square-o"></i> Edit
        </b-button>

        <b-button type="button" variant="warning" @click="goBack" :disabled="$errors.busy">
          <i class="fa fa-arrow-circle-left"></i> Back
        </b-button>

      </b-card-footer>

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
