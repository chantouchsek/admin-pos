<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>Purchase Create </strong>
        <small>Form</small>
      </div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" @keydown="$errors.onKeydown($event)">
        <b-row>
          <b-col>
            <b-form-group label="Date:"
                          label-for="date"
                          :invalid-feedback="$errors.first('date')"
                          :state="!$errors.has('date')"
            >
              <date-time-picker v-model="form.date"
                                clearable
                                name="date"
                                format="DD-MM-YYYY HH:mm:ss"
              ></date-time-picker>

            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Reference:"
                          label-for="reference"
                          :invalid-feedback="$errors.first('reference')"
                          :state="!$errors.has('reference')"
            >
              <b-form-input id="reference"
                            type="text"
                            v-model="form.reference"
                            :state="!$errors.has('reference')"
                            placeholder="Enter reference"
              >
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group label="Search Product:"
                      label-for="searchProduct"
                      :invalid-feedback="$errors.first('products')"
                      :state="!$errors.has('products')"
        >
          <vue-select v-model="supplier"
                      :items="products"
                      :loading="$errors.busy"
                      item-text="name"
                      placeholder="Search product by code or name and can scan by barcode"
                      disable-filtering-by-search
                      @select="selectedItem"
          > // @search="setQuery"
            <template slot="no-data">
              We need at least 2 letters to search.
            </template>
            <template slot="item" slot-scope="{ item }">
              <div style="display: flex; align-items: center;">
                <img v-if="item.file" :src="item.file" class="logo" width="100px"/>
                <div class="product-detail">
                  <span class="item-name">Name: {{ item.name }} </span><br/>
                  <span class="item-name">Engine: {{ item.code }} </span><br/>
                  <span class="item-domain">Frame {{ item.expiredAt }} </span><br>
                  <span class="item-domain">Price {{ item.price }} </span>
                </div>
              </div>
            </template>
          </vue-select>

        </b-form-group>

        <b-row>
          <b-col>
            <b-form-group label="Supplier:"
                          label-for="supplier"
                          :invalid-feedback="$errors.first('supplier_id')"
                          :state="!$errors.has('supplier_id')"
            >
              <b-form-select :state="!$errors.has('supplier_id')" v-model="form.supplierId">
                <option v-for="(supplier,index) in suppliers" :value="supplier.id" :key="`supplier-${index}`">
                  {{ supplier.name }}
                </option>
              </b-form-select>

            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Received:"
                          label-for="received"
                          :invalid-feedback="$errors.first('received')"
                          :state="!$errors.has('received')"
            >
              <b-form-select :state="!$errors.has('received')" v-model="form.received">
                <option value="1">Received</option>
                <option value="0">Not Received</option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"></th>
              <th scope="col">Product</th>
              <th scope="col">Qty</th>
              <th scope="col">Cost</th>
              <th scope="col">Sub total</th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(product,index) in form.products" :key="`product-${index}`">
              <th scope="row">{{ index + 1 }}</th>
              <th>
                <b-img-lazy :src="product.file" width="30" height="30" :alt="product.name" responsive></b-img-lazy>
              </th>
              <td>{{ product.name }}</td>
              <td>
                <b-form-input id="product-qty"
                              type="number"
                              v-model="form.products[index].qty"
                              :state="!$errors.has('form.products[index].qty')"
                              placeholder="Enter product qty"
                              step=".01"
                >
                </b-form-input>
              </td>
              <td>
                <b-form-input id="product-cost"
                              type="number"
                              v-model="form.products[index].cost"
                              :state="!$errors.has('form.products[index].cost')"
                              placeholder="Enter product cost"
                              step=".01"
                >
                </b-form-input>
              </td>
              <td>{{ form.products[index].sub_total = subTotal(product) }}</td>
              <td>
                <b-button type="button" variant="danger" @click="removeItem(index)" size="sm">
                  <i class="fa fa-trash-o"></i>
                </b-button>
              </td>
            </tr>
            <tr>
              <th colspan="4">Total</th>
              <td colspan="3">{{ total }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <b-form-group label="Attachments:"
                      label-for="attachments"
                      :invalid-feedback="$errors.first('attachments')"
                      :state="!$errors.has('attachments')"
        >
          <b-form-file @change="handleFileSelect"
                       placeholder="Choose a file..."
                       drop-placeholder="Drop file here..."
                       :state="!$errors.has('attachments')"
                       multiple
                       name="attachments"
          />
        </b-form-group>

        <b-form-group label="Notes:"
                      label-for="notes"
                      :invalid-feedback="$errors.first('notes')"
                      :state="!$errors.has('notes')"
        >
          <textarea-autosize v-model="form.notes"
                             input-name="notes"
                             placeholder="Enter notes"
          ></textarea-autosize>
        </b-form-group>

        <v-button @click="goBack"></v-button>

      </b-form>
    </b-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'PurchaseCreate',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    computed: {
      ...mapGetters({
        'suppliers': 'supplier/all',
        'products': 'product/all'
      }),
      total () {
        return this.form.products.reduce((total, item) => {
          return total + item.qty * item.cost
        }, 0)
      }
    },
    data () {
      return {
        form: { attachments: [], products: [] },
        show: true,
        supplier: {}
      }
    },
    methods: {
      async onSubmit (evt) {
        evt.preventDefault()
        this.form.date = this.form.date ? this.$moment(this.form.date).format('YYYY-MM-DD HH:mm:ss') : ''
        await this.$store.dispatch('purchase/create', this.form)
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
        this.$router.push({ name: 'purchase.index' })
      },
      handleFileSelect (event) {
        /*
          Get the uploaded files from the input.
        */
        let uploadedFiles = event.target.files;

        /*
          Adds the uploaded file to the files array
        */
        for (let i = 0; i < uploadedFiles.length; i++) {
          this.form.attachments.push(uploadedFiles[i]);
        }
      },
      /**
       * The method used to push select product
       */
      selectedItem (item) {
        let vm = this
        vm.form.products.push({
          qty: 1,
          cost: item.cost,
          name: item.name,
          file: item.file,
          product_id: item.id
        })
      },
      subTotal (item) {
        return (parseInt(item.qty) * parseFloat(item.cost)).toFixed(2)
      },
      removeItem (index) {
        this.form.products.splice(index, 1)
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    async mounted () {
      const vm = this
      await vm.$store.watch((state) => {
        if (state.auth.authenticated) {
          vm.$store.dispatch('supplier/all', (proxy) => {
            proxy.setParameters({ 'all': true })
          })
          vm.$store.dispatch('product/all', (proxy) => {
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
