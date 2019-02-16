<template>
  <div class="animated fadeIn">
    <b-form @submit="onSubmit" @reset="onReset" @keydown="$errors.onKeydown($event)">
      <b-card border-variant="info"
              header="Secondary"
              header-border-variant="info"
              align="left"
      >
        <div slot="header">
          <strong>User Edit </strong>
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

        <b-form-group label="Email:"
                      label-for="email"
                      :invalid-feedback="$errors.first('email')"
        >
          <b-form-input type="email"
                        v-model="form.email"
                        placeholder="Enter email"
                        :state="!$errors.has('email')"
                        name="email"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Phone Number:"
                      label-for="phoneNumber"
                      :invalid-feedback="$errors.first('phone_number')"
        >
          <b-form-input type="tel"
                        v-model="form.phoneNumber"
                        placeholder="Enter phone number"
                        :state="!$errors.has('phone_number')"
                        name="phone_number"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label-cols-sm="3" label="Gender:" label-align-sm="left" class="mb-0">
          <b-form-radio-group class="pt-2" :options="gender" v-model="form.gender"/>
        </b-form-group>

        <b-form-group label="Date Of Birth:"
                      label-for="dateOfBirth"
                      :invalid-feedback="$errors.first('date_of_birth')"
        >
          <b-form-input type="date"
                        v-model="form.dateOfBirth"
                        placeholder="Enter date of birth"
                        :state="!$errors.has('date_of_birth')"
                        name="date_of_birth"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Start working date:"
                      label-for="startWorkingDate"
                      :invalid-feedback="$errors.first('start_working_date')"
        >
          <b-form-input type="date"
                        v-model="form.startWorkingDate"
                        placeholder="Enter start working date"
                        :state="!$errors.has('start_working_date')"
                        name="start_working_date"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Address:"
                      label-for="address"
                      :invalid-feedback="$errors.first('address')"
        >
          <textarea-autosize v-model="form.address"
                             input-name="address"
                             placeholder="Enter address"
          ></textarea-autosize>
        </b-form-group>

        <b-form-group label="Roles:">
          <b-form-checkbox-group id="roles" name="roles" v-model="form.roles">
            <b-form-checkbox v-for="(roles,index) in role.all"
                             :key="`role-index-${index}`"
                             :value="roles.name"
                             class="mb-2"
            >
              {{ roles.name }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-form-group label="Permissions:">
          <b-form-checkbox-group id="permissions" name="permissions" v-model="form.permissions">
            <b-form-checkbox v-for="(permissions,index) in permission.all"
                             :key="`permission-index-${index}`"
                             :value="permissions.name"
                             class="mb-2"
            >
              {{ permissions.name | removeHyphen }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-form-group id="activeGroup" label="Active:">
          <b-form-checkbox v-model="form.active" switch>Active</b-form-checkbox>
        </b-form-group>

        <b-card-footer footer-border-variant="primary">

          <b-button variant="primary" class="mr-1" type="submit" :disabled="$errors.busy">
            <i class="fa" :class="[$errors.busy ? 'fa-circle-o-notch fa-spin fa-fw' : 'fa-paper-plane']"></i>
            Submit
          </b-button>

          <b-button type="reset" variant="danger" class="mr-1" :disabled="$errors.busy">
            <i class="fa fa-undo"></i> Reset
          </b-button>

          <b-button type="button" variant="warning" @click="goBack" :disabled="$errors.busy">
            <i class="fa fa-arrow-circle-left"></i> Back
          </b-button>

        </b-card-footer>

      </b-card>
    </b-form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import UserProxy from '@/proxies/UserProxy'
  import UserTransformer from '@/transformers/UserTransformer'

  const proxy = new UserProxy()

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
    name: 'UserEdit',
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
        ]
      }
    },
    methods: {
      async onSubmit (evt) {
        evt.preventDefault()
        await this.$store.dispatch('user/update', this.form)
      },
      onReset (evt) {
        const vm = this
        evt.preventDefault()
        vm.show = false
        vm.$nextTick(() => {
          vm.show = true
          vm.fetchUser(vm.uuid)
        })
      },
      /**
       * Method used to fetch an user.
       *
       * @param {uuid|{type, required}} uuid The id of the user.
       */
      async fetchUser (uuid) {
        const vm = this
        await proxy.find(uuid)
          .then((data) => {
            vm.form = UserTransformer.fetch(data)
            vm.show = true
          })
      },
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
          vm.fetchUser(vm.uuid)
          vm.$store.dispatch('role/all', (proxy) => {
            proxy.removeParameters(['page', 'q', 'direction', 'sort'])
          })
          vm.$store.dispatch('permission/all', (proxy) => {
            proxy.removeParameters(['page', 'q', 'direction', 'sort'])
          })
        }
      })
    },
    destroyed () {
      this.$errors.flush()
    }
  }
</script>
