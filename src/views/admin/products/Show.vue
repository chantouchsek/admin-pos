<template>
  <div class="animated fadeIn">
    <b-card
      border-variant="secondary"
      header="Product Detail"
      header-bg-variant="secondary"
      header-text-variant="black"
      align="left"
    >
      <b-row>
        <b-col cols="2" v-if="product.file">
          <b-img thumbnail fluid :src="product.file" :alt="product.name" />
        </b-col>
        <b-col cols="10">
          <div class="table-responsive">
            <table class="table table-borderless table-striped">
              <tbody>
              <tr>
                <td>Product Name</td>
                <td>{{ product.name }}</td>
              </tr>
              <tr>
                <td>Product Code</td>
                <td>{{ product.code }}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{{ product.category ? product.category.name : '' }}</td>
              </tr>
              <tr>
                <td>Cost</td>
                <td>{{ product.cost }}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{{ product.price }}</td>
              </tr>
              <tr>
                <td>Tax Rate</td>
                <td>{{ product.taxRate }}</td>
              </tr>
              <tr>
                <td>Tax Method</td>
                <td>{{ product.taxMethod }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
      <b-card
        border-variant="primary"
        header="Detail"
        header-bg-variant="primary"
        header-text-variant="white"
        align="left"
      >
        <b-card-text v-html="product.description"></b-card-text>
      </b-card>

      <b-card-footer footer-border-variant="primary">
        <b-button type="button" variant="primary" class="mr-1" :disabled="$errors.busy"
                  :to="getEditRoute(product.uuid)">
          <i class="fa fa-pencil-square-o"></i> Edit
        </b-button>
        <b-button type="button" variant="warning" @click="goBack" :disabled="$errors.busy">
          <i class="fa fa-arrow-circle-left"></i> Back
        </b-button>
      </b-card-footer>

    </b-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given group uuid identifier.
       */
      uuid: {
        type: [String, Number],
        required: true
      }
    },
    name: 'ProductDetail',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    computed: {
      ...mapGetters({ 'product': 'product/detail' })
    },
    data () {
      return {
        //
      }
    },
    methods: {
      goBack () {
        this.$router.push({ name: 'product.index' })
      },
      /**
       * Method used to get the product route.
       *
       * @param {Number} uuid The product identifier.
       *
       * @returns {Object} The product route.
       */
      getEditRoute (uuid) {
        return {
          name: 'product.edit',
          params: { uuid: uuid }
        }
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    async mounted () {
      const vm = this
      await vm.$store.watch((state) => {
        if (state.auth.authenticated) {
          vm.$store.dispatch('product/detail', vm.uuid)
        }
      })
    }
  }
</script>
