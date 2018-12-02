<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>Category Create </strong>
        <small>Form</small>
      </div>
      <alert-error :form="form" message="There were some problems with your input."></alert-error>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" @keydown="form.onKeydown($event)">
        <b-form-group id="nameGroup"
                      label="Name:"
                      label-for="name">
          <b-form-input id="name"
                        type="text"
                        v-model="form.name"
                        :class="{ 'is-invalid': form.errors.has('name') }"
                        placeholder="Enter name">
          </b-form-input>
          <has-error :form="form" field="name"></has-error>
        </b-form-group>
        <b-form-group id="descriptionGroup"
                      label="Description:"
                      label-for="description">
          <b-form-textarea id="description"
                           v-model="form.description"
                           placeholder="Enter description"
                           :rows="4"
                           :class="{ 'is-invalid': form.errors.has('description') }"
                           :max-rows="6">
          </b-form-textarea>
          <has-error :form="form" field="description"></has-error>
        </b-form-group>
        <b-form-group id="activeGroup">
          <b-form-checkbox v-model="form.active">Active</b-form-checkbox>
        </b-form-group>
        <b-button type="submit" variant="primary" class="mr-1" :disabled="form.busy">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
  import Form from 'vform'

  export default {
    name: 'CategoryCreate',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    data () {
      return {
        form: new Form({
          name: '',
          description: '',
          active: true
        }),
        show: true
      }
    },
    methods: {
      async onSubmit (evt) {
        evt.preventDefault()
        await this.form.post('/categories')
        this.$router.push({ name: 'category.index' })
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
