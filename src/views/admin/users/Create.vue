<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>Category Create </strong>
        <small>Form</small>
      </div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" @keydown="$errors.onKeydown($event)">
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
      },
      goBack () {
        this.$router.push({ name: 'category.index' })
      }
    },
    destroyed () {
      this.$errors.flush()
    }
  }
</script>
