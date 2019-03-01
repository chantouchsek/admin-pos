<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>Supplier Create </strong>
        <small>Form</small>
      </div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" @keydown="$errors.onKeydown($event)">

        <b-form-group label="Name:"
                      label-for="name"
                      :invalid-feedback="$errors.first('name')"
                      :state="!$errors.has('name')"
        >
          <b-form-input id="name"
                        type="text"
                        v-model="form.name"
                        :state="!$errors.has('name')"
                        placeholder="Enter name"
                        name="name"
          >
          </b-form-input>

        </b-form-group>

        <b-form-group label="Email:"
                      label-for="email"
                      :invalid-feedback="$errors.first('email')"
                      :state="!$errors.has('email')"
        >
          <b-form-input id="email"
                        type="email"
                        v-model="form.email"
                        :state="!$errors.has('email')"
                        placeholder="Enter email"
                        name="email"
          >
          </b-form-input>

        </b-form-group>

        <b-form-group label="Phone number:"
                      label-for="phoneNumber"
                      :invalid-feedback="$errors.first('phone_number')"
                      :state="!$errors.has('phone_number')"
        >
          <b-form-input id="phoneNumber"
                        type="tel"
                        v-model="form.phoneNumber"
                        :state="!$errors.has('phone_number')"
                        placeholder="Enter phone number"
                        name="phone_number"
          >
          </b-form-input>

        </b-form-group>

        <b-form-group label="Address:"
                      label-for="address"
                      :invalid-feedback="$errors.first('address')"
                      :state="!$errors.has('address')"
        >
          <textarea-autosize v-model="form.address"
                             input-name="address"
                             placeholder="Enter address"
          ></textarea-autosize>
        </b-form-group>

        <v-button @click="goBack"></v-button>

      </b-form>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'SupplierCreate',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    data () {
      return {
        form: {
          name: '',
          address: '',
          phoneNumber: ''
        },
        show: true
      }
    },
    methods: {
      async onSubmit (evt) {
        evt.preventDefault()
        await this.$store.dispatch('supplier/create', this.form)
      },
      onReset (evt) {
        evt.preventDefault();
        this.form.email = ''
        this.form.address = ''
        this.form.name = ''
        this.form.phoneNumber = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      goBack () {
        this.$router.push({ name: 'supplier.index' })
      }
    },
    destroyed () {
      this.$errors.flush()
    }
  }
</script>
