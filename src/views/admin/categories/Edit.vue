<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>Category Edit </strong>
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
          <b-form-textarea id="description"
                           v-model="form.description"
                           placeholder="Enter description"
                           :rows="4"
                           :class="{ 'is-invalid': $errors.has('description') }"
                           :max-rows="6">
          </b-form-textarea>
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
  import CategoryProxy from '@/proxies/CategoryProxy'
  import CategoryTransformer from '@/transformers/CategoryTransformer'

  const proxy = new CategoryProxy()

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
    name: 'CategoryEdit',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    data () {
      return {
        category: {
          name: '',
          description: '',
          active: true
        },
        form: {
          name: '',
          description: '',
          active: true
        },
        show: true
      }
    },
    mounted () {
      this.fetchCategory(this.uuid)
    },
    methods: {
      async onSubmit (evt) {
        evt.preventDefault()
        await this.$store.dispatch('category/update', this.form)
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
       * Method used to fetch an category.
       *
       * @param {groupId|{type, required}} id The id of the category.
       */
      fetchCategory (id) {
        proxy.find(id)
          .then((data) => {
            this.category = CategoryTransformer.fetch(data)
            this.show = true
          })
      }
    }
  }
</script>
