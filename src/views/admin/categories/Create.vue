<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>Category Create </strong>
        <small>Form</small>
      </div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="nameGroup"
                      label="Name:"
                      label-for="name">
          <b-form-input id="name"
                        type="text"
                        v-model="form.name"
                        aria-describedby="inputNameFeedback"
                        :state="!$errors.has('name')"
                        placeholder="Enter name">
          </b-form-input>
          <b-form-invalid-feedback id="inputNameFeedback">
            <error input="name"/>
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="descriptionGroup"
                      label="Description:"
                      label-for="description">
          <b-form-textarea id="description"
                           v-model="form.description"
                           placeholder="Enter description"
                           :rows="4"
                           :state="!$errors.has('description')"
                           aria-describedby="inputDescriptionFeedback"
                           :max-rows="6">
          </b-form-textarea>
          <b-form-invalid-feedback id="inputDescriptionFeedback">
            <error input="description"/>
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="activeGroup">
          <b-form-checkbox v-model="form.active">Active</b-form-checkbox>
        </b-form-group>
        <b-button type="submit" variant="primary" class="mr-1">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'CategoryCreate',
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
    methods: {
      async onSubmit (evt) {
        evt.preventDefault()
        await this.$store.dispatch('category/create', this.form)
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
      }
    }
  }
</script>
