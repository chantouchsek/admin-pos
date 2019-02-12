<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>User Edit </strong>
        <small>Form</small>
      </div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="nameGroup"
                      label="Name:"
                      label-for="name">
          <b-form-input id="name"
                        type="text"
                        v-model="form.name"
                        :class="{ 'is-invalid': $errors.has('name') }"
                        placeholder="Enter name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="descriptionGroup"
                      label="Description:"
                      label-for="description">
          <textarea-autosize v-model="form.description"
                             input-name="description"
                             placeholder="Enter description"
          ></textarea-autosize>
          <b-form-invalid-feedback>
            <error input="description"/>
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="activeGroup">
          <b-form-checkbox v-model="form.active">Active</b-form-checkbox>
        </b-form-group>
        <b-button variant="primary" class="mr-1" type="submit" :disabled="$errors.busy">
          <i class="fa" :class="[$errors.busy ? 'fa-circle-o-notch fa-spin fa-fw' : 'fa-paper-plane']"></i>
          Submit
        </b-button>
        <b-button type="reset" variant="danger" class="mr-1">
          <i class="fa fa-undo"></i> Reset
        </b-button>
        <b-button type="button" variant="warning" @click="goBack">
          <i class="fa fa-arrow-circle-left"></i> Back
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
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
      this.fetchUser(this.uuid)
    },
    methods: {
      async onSubmit (evt) {
        evt.preventDefault()
        await this.$store.dispatch('user/update', this.form)
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
       * Method used to fetch an user.
       *
       * @param {groupId|{type, required}} id The id of the user.
       */
      fetchUser (id) {
        proxy.find(id)
          .then((data) => {
            this.form = UserTransformer.fetch(data)
            this.show = true
          })
      },
      goBack () {
        this.$router.push({
          name: 'user.index'
        })
      }
    },
    destroyed () {
      this.$errors.flush()
    }
  }
</script>
