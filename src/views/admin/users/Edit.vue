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
        <div class="avatar-upload">
          <div class="avatar-edit" id="pick-avatar">
            <label for="pick-avatar"></label>
          </div>
          <div class="avatar-preview">
            <div id="imagePreview" :style="{ 'background-image': 'url(' + form.avatarUrl + ')' }">
            </div>
          </div>
          <image-cropper
            trigger="#pick-avatar"
            :upload-handler="submitFile"
            ref="avatarPicker"
          ></image-cropper>
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

        <b-form-group :invalid-feedback="$errors.first('permissions')"
                      :state="!$errors.has('permissions')"
        >
          <template slot="label">
            <h6>Choose Your Permissions:</h6>
            <b-form-checkbox
              v-model="allSelected"
              switch
              :indeterminate="indeterminate"
              aria-describedby="permissions"
              aria-controls="permissions"
              @change="toggleAll"
            >
              {{ allSelected ? 'Un-select All' : 'Select All' }}
            </b-form-checkbox>
          </template>

          <b-form-checkbox-group id="permissions"
                                 switches
                                 v-model="form.permissions"
                                 name="permissions"
                                 class="ml-3"
                                 aria-label="Individual Permissions"
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
        ],
        allSelected: false,
        indeterminate: false
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
