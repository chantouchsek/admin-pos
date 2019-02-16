<template>
  <div class="animated fadeIn">
    <b-form @submit="onSubmit" @reset="onReset" @keydown="$errors.onKeydown($event)">
      <b-card border-variant="info"
              header="Secondary"
              header-border-variant="info"
              align="left"
      >
        <div slot="header">
          <strong>User Create </strong>
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

        <b-form-group label-cols-sm="2"
                      label="Gender:"
                      label-align-sm="left"
                      class="mb-2"
                      :invalid-feedback="$errors.first('gender')"
                      label-for="gender"
                      :state="!$errors.has('gender')"
        >
          <b-form-radio-group class="pt-2"
                              :options="gender"
                              v-model="form.gender"
                              :state="!$errors.has('gender')"
          />
        </b-form-group>

        <b-form-group label="Date Of Birth:"
                      label-for="dateOfBirth"
                      :invalid-feedback="$errors.first('date_of_birth')"
        >
          <date-time-picker v-model="form.dateOfBirth"
                            clearable
                            name="date_of_birth"
                            :disabled-date="disabledDate"
          ></date-time-picker>
        </b-form-group>

        <b-form-group label="Start working date:"
                      label-for="startWorkingDate"
                      :invalid-feedback="$errors.first('start_working_date')"
        >
          <date-time-picker v-model="form.startWorkingDate"
                            clearable
                            name="start_working_date"
                            :disabled-date="disabledDate"
          ></date-time-picker>
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

        <b-form-group label="Roles:"
                      :invalid-feedback="$errors.first('roles')"
                      label-for="roles"
                      :state="!$errors.has('roles')"
        >
          <b-form-checkbox-group id="roles"
                                 name="roles"
                                 v-model="form.roles"
                                 :state="!$errors.has('roles')"
          >
            <b-form-checkbox v-for="(roles,index) in role.all"
                             :key="`role-index-${index}`"
                             :value="roles.name"
                             class="mb-2"
            >
              {{ roles.name }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-form-group label="Permissions:"
                      :invalid-feedback="$errors.first('permissions')"
                      label-for="permissions"
                      :state="!$errors.has('permissions')"
        >
          <b-form-checkbox-group id="permissions"
                                 name="permissions"
                                 v-model="form.permissions"
                                 :state="!$errors.has('permissions')"
          >
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
        ]
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
    destroyed () {
      this.$errors.flush()
    }
  }
</script>
