<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>Category Create </strong>
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
        <b-form-group label="Description:"
                      label-for="description"
                      :invalid-feedback="$errors.first('description')"
                      :state="!$errors.has('description')"
        >
          <textarea-autosize v-model="form.description"
                             input-name="description"
                             placeholder="Enter description"
          ></textarea-autosize>
        </b-form-group>

        <v-button @click="goBack"></v-button>

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
