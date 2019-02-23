<template>
  <div class="animated fadeIn">
    <b-form @submit="onSubmit" @reset="onReset" @keydown="$errors.onKeydown($event)">
      <b-card border-variant="info"
              header="Secondary"
              header-border-variant="info"
              align="left"
      >
        <div slot="header">
          <strong>Role Edit </strong>
          <small>Form</small>
        </div>
        <b-form-group label="Name:"
                      label-for="name"
                      :invalid-feedback="$errors.first('name')"
        >
          <b-form-input type="text"
                        v-model="form.name"
                        placeholder="Enter name"
                        :state="!$errors.has('name')"
                        name="name"
          >
          </b-form-input>
        </b-form-group>

        <v-button @click="goBack"></v-button>

      </b-card>
    </b-form>
  </div>
</template>

<script>
  import RoleProxy from '@/proxies/RoleProxy'
  import RoleTransformer from '@/transformers/RoleTransformer'

  const proxy = new RoleProxy()

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
    name: 'RoleEdit',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    data () {
      return {
        form: {},
        show: true
      }
    },
    methods: {
      async onSubmit (evt) {
        evt.preventDefault()
        await this.$store.dispatch('role/update', this.form)
      },
      onReset (evt) {
        const vm = this
        evt.preventDefault()
        vm.show = false
        vm.$nextTick(() => {
          vm.show = true
          vm.fetchRole(vm.id)
        })
      },
      /**
       * Method used to fetch an role.
       *
       * @param {id|{type, required}} id The id of the role.
       */
      async fetchRole (id) {
        const vm = this
        await proxy.find(id)
          .then((data) => {
            vm.form = RoleTransformer.fetch(data)
            vm.show = true
          })
      },
      goBack () {
        this.$router.push({ name: 'role.index' })
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    async mounted () {
      const vm = this
      await vm.$store.watch((state) => {
        if (state.auth.authenticated) {
          vm.fetchRole(vm.id)
        }
      })
    },
    destroyed () {
      this.$errors.flush()
    }
  }
</script>
