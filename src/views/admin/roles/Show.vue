<template>
  <div class="animated fadeIn">
    <b-card
      border-variant="secondary"
      header="Role Detail"
      header-bg-variant="secondary"
      header-text-variant="black"
      align="left"
      :title="detail.name"
    >
      <hr>
      <h4>Users: </h4>
      <b-list-group>
        <b-list-group-item v-for="(user, index) in detail.users" :key="`user-${index}`">
          <b-badge variant="success" pill>{{ index + 1 }}</b-badge>
          . {{ user.name }}
        </b-list-group-item>
      </b-list-group>
      <hr>
      <h4>Permissions: </h4>
      <b-list-group class="mb-2">
        <b-list-group-item v-for="(permission, index) in detail.permissions" :key="`permission-${index}`">
          <b-badge variant="primary" pill>{{ index + 1 }}</b-badge>
          . {{ permission | removeHyphen }}
        </b-list-group-item>
      </b-list-group>

      <b-card-footer footer-border-variant="primary">
        <b-button type="button" variant="primary" class="mr-1" :disabled="$errors.busy" :to="getEditRoute(detail.id)">
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
      id: {
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
      ...mapGetters({ 'detail': 'role/detail' })
    },
    data () {
      return {
        //
      }
    },
    methods: {
      goBack () {
        this.$router.push({ name: 'role.index' })
      },
      /**
       * Method used to get the role route.
       *
       * @param {Number} id The role identifier.
       *
       * @returns {Object} The role route.
       */
      getEditRoute (id) {
        return {
          name: 'role.edit',
          params: { id: id }
        }
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    async mounted () {
      const vm = this
      await vm.$store.watch((state) => {
        if (state.auth.authenticated) {
          vm.$store.dispatch('role/detail', vm.id)
        }
      })
    }
  }
</script>
