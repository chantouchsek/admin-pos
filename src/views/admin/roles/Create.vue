<template>
  <div class="animated fadeIn">
    <b-form @submit="onSubmit" @reset="onReset" @keydown="$errors.onKeydown($event)">
      <b-card border-variant="info"
              header="Secondary"
              header-border-variant="info"
              align="left"
      >
        <div slot="header">
          <strong>Role Create </strong>
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
  import { mapState } from 'vuex'

  export default {
    /**
     * The properties that can be used.
     */
    name: 'UserCreate',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    computed: {
      ...mapState(['role', 'permission'])
    },
    data () {
      return {
        form: {},
        show: true,
        gender: [
          { value: 1, text: 'Male' },
          { value: 2, text: 'Female' }
        ],
        allSelected: false,
        indeterminate: false
      }
    },
    methods: {
      async onSubmit (evt) {
        evt.preventDefault()
        await this.$store.dispatch('user/create', this.form)
      },
      onReset (evt) {
        const vm = this
        evt.preventDefault()
        vm.show = false
        vm.$nextTick(() => {
          vm.show = true
          vm.form = {}
        })
      },
      goBack () {
        this.$router.push({ name: 'user.index' })
      },
      disabledDate (time) {
        return time > this.$moment()
      },
      /*
      *  Submits the avatar to the server
      */
      submitFile (cropper) {
        this.form.avatarUrl = cropper.getCroppedCanvas().toDataURL('image/png')
      },
      toggleAll (checked) {
        const vm = this
        if (checked) {
          vm.form.permissions = vm.permission.all.map(p => p.name)
          return
        }
        vm.form.permissions = []
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    async mounted () {
      const vm = this
      await vm.$store.watch((state) => {
        if (state.auth.authenticated) {
          vm.$store.dispatch('role/all', (proxy) => {
            proxy.removeParameters(['page', 'q', 'direction', 'sort'])
          })
          vm.$store.dispatch('permission/all', (proxy) => {
            proxy.removeParameters(['page', 'q', 'direction', 'sort'])
          })
        }
      })
    },
    watch: {
      'form.permissions' (newVal, oldVal) {
        if (newVal.length === 0) {
          this.indeterminate = false
          this.allSelected = false
        } else if (newVal.length === this.permission.all.length) {
          this.indeterminate = false
          this.allSelected = true
        } else {
          this.indeterminate = true
          this.allSelected = false
        }
      }
    },
    destroyed () {
      this.$errors.flush()
    }
  }
</script>
