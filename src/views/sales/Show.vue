<template>
  <div class="animated fadeIn" id="printArea">
    <div class="card">
      <div class="card-header">
        Invoice
        <strong>#{{ sale.saleNumber }}</strong>
        <span class="float-right"> <strong>Status:</strong> {{ sale.status }}</span>
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-sm-6">
            <h6 class="mb-3">From:</h6>
            <div>
              <strong>Webz Poland</strong>
            </div>
            <div>Madalinskiego 8</div>
            <div>71-101 Szczecin, Poland</div>
            <div>Email: info@webz.com.pl</div>
            <div>Phone: +48 444 666 3333</div>
          </div>
          <div class="col-sm-6">
            <h6 class="mb-3">To:</h6>
            <div>
              <strong>Bob Mart</strong>
            </div>
            <div>Attn: Daniel Marek</div>
            <div>43-190 Mikolow, Poland</div>
            <div>Email: marek@daniel.com</div>
            <div>Phone: +48 123 456 789</div>
          </div>
        </div>
        <table class="table table-striped table-bordered table-responsive-sm">
          <thead>
          <tr>
            <th class="text-center">#</th>
            <th>Item</th>
            <th>Description</th>
            <th class="text-right">Unit Cost</th>
            <th class="text-center">Qty</th>
            <th class="text-right">Total</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(product,index) in  sale.products" :key="`product-${index}`">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-left strong">{{ product.name }}</td>
            <td class="text-left">
              <div v-html="product.description"></div>
            </td>
            <td class="text-right">{{ product.pivot ? product.pivot.price : 0 }}</td>
            <td class="text-center">{{ product.pivot ? product.pivot.qty : 0 }}</td>
            <td class="text-right">{{ product.pivot ? product.pivot.price * product.pivot.qty : 0 }}</td>
          </tr>
          </tbody>
        </table>
        <div class="row">
          <div class="col-lg-4 col-sm-5"></div>
          <div class="col-lg-4 col-sm-5 ml-auto">
            <table class="table table-clear">
              <tbody>
              <tr>
                <td class="left">
                  <strong>Subtotal</strong>
                </td>
                <td class="right">$8.497,00</td>
              </tr>
              <tr>
                <td class="left">
                  <strong>Discount ({{ sale.discount }})</strong>
                </td>
                <td class="right">$1,699,40</td>
              </tr>
              <tr>
                <td class="left">
                  <strong>VAT ({{ sale.tax }})</strong>
                </td>
                <td class="right">$679,76</td>
              </tr>
              <tr>
                <td class="left">
                  <strong>Total</strong>
                </td>
                <td class="right">
                  <strong>$7.477,36</strong>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <table class="table table-striped">
          <tbody>
          <tr v-for="(payment,index) in sale.payments" :key="`payment-${index}`" class="border-bottom">
            <td class="text-right">Paid by :</td>
            <td>{{ payment.paid_by }}</td>
            <td class="text-right">Amount :</td>
            <td>{{ payment.amount }}</td>
            <td class="text-right">Change :</td>
            <td>0</td>
          </tr>
          </tbody>
        </table>
        <div class="well well-sm mt-1 text-center">
          This is receipt footer for store
        </div>
      </div>
      <div class="card-footer text-right d-print-none">
        <b-button variant="success" class="mr-1" @click="printSale">Print <i class="fa fa-print"></i></b-button>
        <b-button variant="primary">Back <i class="fa fa-backward"></i></b-button>
      </div>
    </div>
    <b-card class="d-print-none"
            header="Comment"
            header-tag="header"
    >
      <b-form>
        <b-form-group>
          <b-input-group>
            <b-form-textarea
              id="textarea"
              v-model="form.body"
              placeholder="Enter something..."
              rows="1"
              max-rows="8"
            />
            <b-input-group-append>
              <b-button variant="success"><i class="fa fa-telegram"></i> Send</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-form>
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
    name: 'SaleDetail',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    computed: {
      ...mapGetters({ 'sale': 'sale/show' })
    },
    data () {
      return {
        form: {}
      }
    },
    methods: {
      goBack () {
        this.$router.push({ name: 'sale.index' })
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
          name: 'sale.edit',
          params: { uuid: uuid }
        }
      },
      printSale () {
        this.$htmlToPaper('printArea')
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    async mounted () {
      const vm = this
      await vm.$store.watch((state) => {
        if (state.auth.authenticated) {
          vm.$store.dispatch('sale/show', vm.uuid)
        }
      })
    }
  }
</script>
<style>
  .table p {
    margin-bottom: 0 !important;
  }

  @media print {
    .table p {
      margin-bottom: 0 !important;
    }
  }

  @page {
    size: auto;
    margin: 0;
  }
</style>
