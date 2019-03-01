<template>
  <div class="animated fadeIn">
    <b-form @submit.prevent="importProduct" @keydown="$errors.onKeydown($event)">
      <b-card border-variant="info"
              header="Secondary"
              header-border-variant="info"
              align="left"
      >
        <div slot="header">
          <strong>Product Import </strong>
          <small>Form</small>
        </div>

        <b-alert show variant="danger" dismissible @dismissed="$errors.flush()" v-if="$errors.errors.length">
          <ul>
            <li v-for="(error,index) in $errors.errors" :key="`error-${index}`">
              {{ error }}
            </li>
          </ul>
        </b-alert>

        <b-alert variant="success" show>
          The first line in downloaded csv file should remain as it is. Please do not change the order of columns.
          The correct column order is (Product Code, Product Name, Purchase Price, Product Tax, Product Price, Category
          Code) & you must follow this. If you are using any other language then English, please make sure the csv file
          is UTF-8 encoded and not saved with byte order mark (BOM)
          <b-button variant="info" size="sm" :href="url"><i class="fa fa-download"></i> Download sample file</b-button>
        </b-alert>

        <b-form-group label="File:"
                      label-for="File"
                      :invalid-feedback="$errors.first('file')"
                      :state="!$errors.has('file')"
        >
          <b-form-file
            @change="handleFileSelect"
            placeholder="Choose a file..."
            drop-placeholder="Drop file here..."
            accept="application/*"
            :state="!$errors.has('file')"
          />
        </b-form-group>

        <v-button @click="goBack"></v-button>

      </b-card>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: "ImportProduct",
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    data () {
      return {
        file: '',
        url: process.env.VUE_APP_API_LOCATION + 'download-sample'
      }
    },
    methods: {
      goBack () {
        this.$router.push({ name: 'product.index' })
      },
      handleFileSelect (event) {
        /*
         * Set the local file variable to what the user has selected.
        */
        const self = this
        self.file = event.target.files[0]
      },
      /**
       * Method to import new product
       * It'll dispatch the create action on the product module.
       */
      importProduct () {
        const self = this
        self.$store.dispatch('product/imports', self.file)
      },
    }
  }
</script>
