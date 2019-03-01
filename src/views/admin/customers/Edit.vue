<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>Customer Edit </strong>
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
  import CustomerProxy from '@/proxies/CustomerProxy'
  import CustomerTransformer from '@/transformers/CustomerTransformer'

  const proxy = new CustomerProxy()

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
    name: 'CustomerEdit',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    data () {
      return {
        form: {
          name: '',
          description: '',
          active: true
        },
        show: true
      }
    },
    mounted () {
      this.fetchCustomer(this.uuid)
    },
    methods: {
      async onSubmit (evt) {
        evt.preventDefault()
        await this.$store.dispatch('customer/update', this.form)
      },
      onReset (evt) {
        evt.preventDefault();
        this.form.email = ''
        this.form.description = ''
        this.form.active = true
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      /**
       * Method used to fetch an customer.
       *
       * @param {id|{type, required}} id The id of the customer.
       */
      fetchCustomer (id) {
        proxy.find(id)
          .then((data) => {
            this.form = CustomerTransformer.fetch(data)
            this.show = true
          })
      },
      goBack () {
        this.$router.push({ name: 'customer.index' })
      }
    },
    destroyed () {
      this.$errors.flush()
    }
  }
</script>
