<template>
  <div class="animated fadeIn">
    <b-form @submit="onSubmit" @reset="onReset" @keydown="$errors.onKeydown($event)" v-if="show">
      <b-card border-variant="info"
              header="Secondary"
              header-border-variant="info"
              align="left"
      >
        <div slot="header">
          <strong>Product Edit </strong>
          <small>Form</small>
        </div>

        <b-form-group label="Name:"
                      label-for="name"
                      :invalid-feedback="$errors.first('name')"
                      :state="!$errors.has('name')"
        >
          <b-form-input type="text"
                        v-model="form.name"
                        placeholder="Enter name"
                        :state="!$errors.has('name')"
                        name="name"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Code:"
                      label-for="code"
                      :invalid-feedback="$errors.first('code')"
                      :state="!$errors.has('code')"
        >
          <b-form-input type="text"
                        v-model="form.code"
                        placeholder="Enter code"
                        :state="!$errors.has('code')"
                        name="code"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Category:"
                      label-for="category"
                      :invalid-feedback="$errors.first('category_id')"
                      :state="!$errors.has('category_id')"
        >
          <b-form-select v-model="form.categoryId"
                         :state="!$errors.has('category_id')"
          >
            <option value="" disabled>-- Select Category --</option>
            <option v-for="(category,index) in categories" :value="category.id" :key="`category-${index}`">
              {{ category.name }}
            </option>
          </b-form-select>
        </b-form-group>

        <b-form-group label="SKU:"
                      label-for="sku"
                      :invalid-feedback="$errors.first('sku')"
                      :state="!$errors.has('sku')"
        >
          <b-form-input type="text"
                        v-model="form.sku"
                        placeholder="Enter sku"
                        :state="!$errors.has('sku')"
                        name="sku"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Imported Date:"
                      label-for="importedDate"
                      :invalid-feedback="$errors.first('imported_date')"
                      :state="!$errors.has('imported_date')"
        >
          <date-time-picker v-model="form.importedDate"
                            clearable
                            name="expired_at"
          ></date-time-picker>
        </b-form-group>

        <b-form-group label="Expired At:"
                      label-for="expiredAte"
                      :invalid-feedback="$errors.first('expired_at')"
                      :state="!$errors.has('expired_at')"
        >
          <date-time-picker v-model="form.expiredAt"
                            clearable
                            name="expired_at"
          ></date-time-picker>
        </b-form-group>


        <b-form-group label="Cost:"
                      label-for="cost"
                      :invalid-feedback="$errors.first('cost')"
                      :state="!$errors.has('cost')"
        >
          <b-form-input type="number"
                        v-model="form.cost"
                        placeholder="Enter cost"
                        :state="!$errors.has('cost')"
                        name="cost"
                        step="0.01"
                        no-wheel
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Price:"
                      label-for="price"
                      :invalid-feedback="$errors.first('price')"
                      :state="!$errors.has('price')"
        >
          <b-form-input type="number"
                        v-model="form.price"
                        placeholder="Enter price"
                        :state="!$errors.has('price')"
                        name="price"
                        step="0.01"
                        no-wheel
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Product Tax:"
                      label-for="ProductTax"
                      :invalid-feedback="$errors.first('tax_rate')"
                      :state="!$errors.has('tax_rate')"
        >
          <b-form-input type="number"
                        v-model="form.taxRate"
                        placeholder="Enter tax rate"
                        :state="!$errors.has('tax_rate')"
                        name="price"
                        step="0.01"
                        no-wheel
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Tax Method:"
                      label-for="TaxMethod"
                      :invalid-feedback="$errors.first('tax_method')"
                      :state="!$errors.has('tax_method')"
        >
          <b-form-select v-model="form.taxMethod"
                         :state="!$errors.has('tax_method')"
          >
            <option value="Inclusive">Inclusive</option>
            <option value="Exclusive">Exclusive</option>
          </b-form-select>
        </b-form-group>

        <b-form-group label="Description:"
                      label-for="description"
                      :invalid-feedback="$errors.first('description')"
                      :state="!$errors.has('description')"
        >
          <vue-editor v-model="form.description"
                      :editorToolbar="defaultToolbar"
                      placeholder="Enter description..."
          ></vue-editor>
        </b-form-group>

        <b-form-group label="Image:"
                      label-for="Image"
                      :invalid-feedback="$errors.first('file')"
                      :state="!$errors.has('file')"
        >
          <b-form-file
            @change="handleFileUpload"
            placeholder="Choose a file..."
            drop-placeholder="Drop file here..."
            accept="image/*"
            :state="!$errors.has('file')"
          />
        </b-form-group>

        <b-img class="mt-2" v-if="form.file" :src="form.file" fluid :alt="form.name"/>

        <v-button @click="goBack"></v-button>

      </b-card>
    </b-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ProductProxy from '@/proxies/ProductProxy'
  import ProductTransformer from '@/transformers/ProductTransformer'
  import Upload from '@/utilities/products/upload'
  import DefaultToolbar from '@/utilities/editor/default-toolbar'

  const proxy = new ProductProxy()

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
    name: 'ProductEdit',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    computed: {
      ...mapGetters({
        'categories': 'category/all'
      })
    },
    data () {
      return {
        form: {},
        show: true,
        'defaultToolbar': DefaultToolbar
      }
    },
    methods: {
      async onSubmit (evt) {
        evt.preventDefault()
        await this.$store.dispatch('product/update', this.form)
      },
      onReset (evt) {
        const vm = this
        evt.preventDefault()
        vm.show = false
        vm.$nextTick(() => {
          vm.show = true
          vm.fetchProduct(vm.uuid)
        })
      },
      /**
       * Method used to fetch an product.
       *
       * @param {uuid|{type, required}} uuid The uuid of the product.
       */
      async fetchProduct (uuid) {
        const vm = this
        await proxy.find(uuid)
          .then((data) => {
            vm.form = ProductTransformer.fetch(data)
            vm.show = true
          })
      },
      goBack () {
        this.$router.push({ name: 'product.index' })
      },
      ...Upload
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    async mounted () {
      const vm = this
      await vm.$store.watch((state) => {
        if (state.auth.authenticated) {
          vm.fetchProduct(vm.uuid)
          vm.$store.dispatch('category/all', (proxy) => {
            proxy.setParameters({ 'all': true })
          })
        }
      })
    },
    destroyed () {
      this.$errors.flush()
    }
  }
</script>
