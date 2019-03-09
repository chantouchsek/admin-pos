<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="5">
        <b-card>
          <b-form-group>
            <b-input-group>
              <b-form-select v-model="sale.customerId">
                <option value="" disabled>Customer</option>
                <option :value="customer.id" v-for="(customer,index) in customers" :key="`customer-${index}`">
                  {{ customer.name }}
                </option>
              </b-form-select>
              <b-input-group-append v-b-modal.modal-center>
                <b-button><i class="fa fa-plus"></i></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>

          <b-form-group>
            <b-form-input type="text" v-model="sale.reference" placeholder="Reference note"/>
          </b-form-group>

          <b-form-group>
            <b-form-input type="text" v-model="query"
                          placeholder="Search product by code or name and can scan by barcode"
            />
            <!--<vue-select :items="product.all"-->
            <!--:loading="$errors.busy"-->
            <!--item-text="name"-->
            <!--placeholder="Search product by code or name and can scan by barcode"-->
            <!--disable-filtering-by-search-->
            <!--@select="selectedItem"-->
            <!--@search="setQuery"-->
            <!--&gt;-->
            <!--<template slot="no-data">-->
            <!--Nothing watch with your query.-->
            <!--</template>-->
            <!--<template slot="item" slot-scope="{ item }">-->
            <!--<div style="display: flex; align-items: center;">-->
            <!--<img v-if="item.file" :src="item.file" class="logo" width="100px" :alt="item.name"/>-->
            <!--<div class="product-detail">-->
            <!--<span class="item-name">Name: {{ item.name }} </span><br/>-->
            <!--<span class="item-name">SKU: {{ item.sku }} </span><br/>-->
            <!--<span class="item-domain">Expired At {{ item.expiredAt }} </span><br>-->
            <!--<span class="item-domain">Price {{ item.price }} </span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</template>-->
            <!--</vue-select>-->
          </b-form-group>
          <vue-perfect-scrollbar class="scroll-area__cart">
            <table class="table table-fixed table-hover table-borderless">
              <thead class="bg-gray-100">
              <tr>
                <th>Product</th>
                <th class="text-center">Price</th>
                <th class="text-center">Qty</th>
                <th class="text-left">Subtotal</th>
                <th class="text-center">
                  <i class="fa fa-trash-o cursor-pointer" @click="clearCart" v-if="sale.products.length"></i>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(product,index) in sale.products" :key="`product-${index}`">
                <th class="text-left">{{ product.name }}</th>
                <th>{{ product.price | currency }}</th>
                <th>
                  <b-input-group>
                    <b-input-group-prepend @click="quantityChange(product, 'decrement', index)">
                      <b-button variant="outline-info" size="sm"><i class="fa fa-minus"></i></b-button>
                    </b-input-group-prepend>
                    <b-form-input type="number" min="0"
                                  v-model="sale.products[index].qty"
                                  size="sm"
                    />
                    <b-input-group-append @click="quantityChange(product, 'increment', index)">
                      <b-button variant="outline-secondary" size="sm"><i class="fa fa-plus"></i></b-button>
                    </b-input-group-append>
                  </b-input-group>
                </th>
                <th>
                  {{ sale.products[index].sub_total = parseInt(product.qty) * parseFloat(product.price) | currency}}
                </th>
                <th class="text-right">
                  <b-button type="button" size="sm" variant="danger" @click="removeProduct(product, index)">
                    <i class="fa fa-trash-o cursor-pointer"></i>
                  </b-button>
                </th>
              </tr>
              </tbody>
            </table>
          </vue-perfect-scrollbar>
          <table class="table table-bordered table-striped table-hover">
            <tbody>
            <tr>
              <th colspan="1">Total Items:</th>
              <th colspan="1" class="text-right">{{ sale.products | cartSize }}</th>
              <th colspan="1">Sub Total:</th>
              <th colspan="1" class="text-right">{{ sale.grandTotal | currency }}</th>
            </tr>
            <tr>
              <th colspan="1">
                <b-link v-b-modal.modal-discount>Discount:</b-link>
              </th>
              <th colspan="1" class="text-right">
                ({{ sale.discountToAllItem | currency }}) {{ sale.discount | currency }}
              </th>
              <th colspan="1">
                <b-link v-b-modal.modal-tax>Order tax:</b-link>
              </th>
              <th colspan="1" class="text-right">{{ sale.total - sale.grandTotal | currency }}</th>
            </tr>
            <tr>
              <th colspan="2">
                Total payable
                <b-link v-b-modal.modal-notes>
                  <i class="fa fa-commenting-o"></i>
                </b-link>
              </th>
              <th colspan="2" class="text-right">{{ sale.total | currency }}</th>
            </tr>
            </tbody>
          </table>

          <div slot="footer" class="w-100 text-center">
            <b-row>
              <b-col>
                <b-button-toolbar key-nav aria-label="Toolbar with button groups">
                  <b-button-group class="mx-1 w-100" vertical>
                    <b-button variant="success">Hold</b-button>
                    <b-button variant="info">Cancel</b-button>
                  </b-button-group>
                </b-button-toolbar>
              </b-col>
              <b-col>
                <b-button-toolbar key-nav aria-label="Toolbar with button groups">
                  <b-button-group class="mx-1 w-100" vertical>
                    <b-button variant="primary">Print Order</b-button>
                    <b-button variant="warning">Print Bill</b-button>
                  </b-button-group>
                </b-button-toolbar>
              </b-col>
              <b-col>
                <b-button-toolbar key-nav aria-label="Toolbar with button groups">
                  <b-button-group class="mx-1 w-100" vertical>
                    <b-button variant="success" @click="showPayment">Payment</b-button>
                    <b-button variant="danger" @click="clearCart">Clear</b-button>
                  </b-button-group>
                </b-button-toolbar>
              </b-col>
            </b-row>
          </div>

        </b-card>
      </b-col>
      <b-col cols="7">
        <b-card>
          <vue-perfect-scrollbar class="scroll-area" @ps-y-reach-end="setQueryScroll">
            <b-card-group columns>
              <b-card v-for="(pro,index) in product.all"
                      :key="`product-${index}`"
                      :title="pro.name"
                      :img-src="pro.file"
                      :img-alt="pro.name"
                      img-top
                      class="cursor-pointer"
                      @click="addToCart(pro)"
              >
                <b-card-text v-html="pro.description"/>
                <div slot="footer">
                  <small class="text-muted">Last updated at {{ $moment(pro.updatedAt).fromNow() }}</small>
                </div>
              </b-card>
            </b-card-group>
            <div class="text-center" v-if="currentPage !== product.pagination.totalPages">
              <b-spinner variant="primary" type="grow" label="Spinning"/>
            </div>
          </vue-perfect-scrollbar>

          <div slot="footer">
            <b-button-group class="w-100">
              <b-button variant="warning"><i class="fa fa-caret-left"></i></b-button>
              <b-button variant="success" v-b-modal.modal-gift-card>
                <i class="fa fa-credit-card"></i> Sell Gift Card
              </b-button>
              <b-button variant="warning"><i class="fa fa-caret-right"></i></b-button>
            </b-button-group>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-modal id="modal-center" centered title="Add Customer" scrollable @ok="onSubmit" @hidden="hiddenModal" lazy>
      <b-form @@submit.stop.prevent="onSubmit" @reset="onReset" @keydown="$errors.onKeydown($event)">
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

        <b-form-group label="Email:"
                      label-for="email"
                      :invalid-feedback="$errors.first('email')"
                      :state="!$errors.has('email')"
        >
          <b-form-input id="email"
                        type="email"
                        v-model="form.email"
                        :state="!$errors.has('email')"
                        placeholder="Enter email"
                        name="email"
          >
          </b-form-input>

        </b-form-group>

        <b-form-group label="Phone number:"
                      label-for="phoneNumber"
                      :invalid-feedback="$errors.first('phone_number')"
                      :state="!$errors.has('phone_number')"
        >
          <b-form-input id="phoneNumber"
                        type="tel"
                        v-model="form.phoneNumber"
                        :state="!$errors.has('phone_number')"
                        placeholder="Enter phone number"
                        name="phone_number"
          >
          </b-form-input>

        </b-form-group>

        <b-form-group label="Address:"
                      label-for="address"
                      :invalid-feedback="$errors.first('address')"
                      :state="!$errors.has('address')"
        >
          <textarea-autosize v-model="form.address"
                             input-name="address"
                             placeholder="Enter address"
          ></textarea-autosize>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal id="modal-discount" centered title="Discount 5 or 5%"
             @ok="onSubmitDiscount"
             @cancel="onCancelDiscount"
             lazy
    >
      <b-form-group>
        <b-form-input type="text" v-model="sale.discount" placeholder="You can discount by 5 or 5%"/>
      </b-form-group>

      <b-form-group>
        <b-form-radio value="orderTotal" v-model="sale.applyTo" name="some-radios">
          Apply to order total
        </b-form-radio>
        <b-form-radio value="orderItems" v-model="sale.applyTo" name="some-radios">
          Apply to all order items
        </b-form-radio>
      </b-form-group>
    </b-modal>

    <b-modal id="modal-payment"
             centered
             title="Payment"
             scrollable
             size="lg"
             ref="payment"
             @ok="onSubmitSale"
    >
      <b-form @submit.prevent="onSubmitSale" @keydown="$errors.onKeydown($event)">
        <b-row>
          <b-col cols="9">
            <table class="table table-info">
              <tbody>
              <tr>
                <td>Total Items</td>
                <td class="border-right text-right">{{ sale.products | cartSize }}</td>
                <td>Total Payable</td>
                <td class="text-right">{{ sale.payment.total | currency }}</td>
              </tr>
              <tr>
                <td>Total Paying</td>
                <td class="border-right text-right">{{ sale.payment.amount | currency }}</td>
                <td>Balance</td>
                <td class="text-right">
                  {{ sale.paid = sale.payment.amount - sale.payment.total | currency }}
                </td>
              </tr>
              </tbody>
            </table>

            <b-form-group
              id="notes"
              label="Notes"
              label-for="notes"
              :invalid-feedback="$errors.first('notes')"
              :state="!$errors.has('notes')"
            >
              <b-form-textarea
                rows="2"
                max-rows="4"
                :state="!$errors.has('notes')"
                v-model="sale.notes"
                name="notes"
              />
            </b-form-group>

            <b-row>
              <b-col>
                <b-form-group
                  id="amount"
                  label="Amount"
                  label-for="amount"
                  :invalid-feedback="$errors.first('amount')"
                  :state="!$errors.has('amount')"
                >
                  <b-form-input type="text"
                                placeholder="Enter payment amount"
                                :state="!$errors.has('amount')"
                                v-model="sale.payment.amount"
                                name="amount"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  id="payingBy"
                  label="Paying By"
                  label-for="payingBy"
                  :invalid-feedback="$errors.first('paid_by')"
                  :state="!$errors.has('paid_by')"
                >
                  <b-form-select :options="options"
                                 :state="!$errors.has('paid_by')"
                                 v-model="sale.payment.paid_by"
                                 name="paid_id"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-group
              id="paymentReference"
              label="Payment Reference"
              label-for="reference"
              :invalid-feedback="$errors.first('reference')"
              :state="!$errors.has('reference')"
            >
              <b-form-textarea
                rows="2"
                max-rows="4"
                :state="!$errors.has('reference')"
                v-model="sale.payment.reference"
                name="notes"
              />
            </b-form-group>

          </b-col>
          <b-col cols="3">
            <b-button-group vertical class="w-100">
              <b-button variant="info">{{ sale.payment.total | currency }}</b-button>
              <b-button variant="warning">1</b-button>
              <b-button variant="warning">5</b-button>
              <b-button variant="warning">10</b-button>
              <b-button variant="warning">20</b-button>
              <b-button variant="warning">50</b-button>
              <b-button variant="warning">100</b-button>
              <b-button variant="danger">Clear</b-button>
            </b-button-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>

    <b-modal id="modal-tax" centered title="Tax 5 or 5%" lazy>
      <b-form-input type="text" v-model="sale.tax" placeholder="You can set tax by 5 or 5%" required/>
    </b-modal>

    <b-modal id="modal-notes" centered title="Notes" lazy>
      <b-form-group label="Notes:"
                    label-for="notes"
                    :invalid-feedback="$errors.first('notes')"
      >
        <textarea-autosize v-model="sale.payment.notes"
                           input-name="notes"
                           placeholder="Enter payment notes"
        ></textarea-autosize>
      </b-form-group>
    </b-modal>

    <b-modal id="modal-gift-card" centered title="Sell Gift Card" lazy>
      <b-form @keydown="$errors.onKeydown($event)">
        <b-form-group label="Card Number:"
                      label-for="cardNumber"
                      :invalid-feedback="$errors.first('card_number')"
                      :state="!$errors.has('card_number')"
        >
          <b-input-group>
            <masked-input type="text"
                          name="card_number"
                          class="form-control"
                          :class="[$errors.has('card_number') ? 'is-invalid' : 'is-valid']"
                          v-model="giftCard.cardNumber"
                          :mask="mask"
                          :guide="true"
                          placeholderChar="#"
            >
            </masked-input>
            <b-input-group-append @click="randomNumber(giftCard)">
              <b-button variant="outline-secondary"><i class="fa fa-cogs"></i></b-button>
            </b-input-group-append>
          </b-input-group>

        </b-form-group>

        <b-form-group label="Value:"
                      label-for="value"
                      :invalid-feedback="$errors.first('value')"
                      :state="!$errors.has('value')"
        >
          <b-form-input id="value"
                        type="number"
                        v-model="giftCard.value"
                        :state="!$errors.has('value')"
                        step=".01"
                        placeholder="Enter value"
                        name="value"
          >
          </b-form-input>

        </b-form-group>

        <b-form-group label="Expiry Date:"
                      label-for="expiryDate"
                      :invalid-feedback="$errors.first('expiry_date')"
                      :state="!$errors.has('expiry_date')"
        >
          <date-time-picker v-model="giftCard.expiryDate"
                            clearable
                            name="expiry_date"
                            format="DD-MM-YYYY HH:mm:ss"
          ></date-time-picker>

        </b-form-group>

        <b-form-group id="activeGroup"
                      label="Active:"
                      :invalid-feedback="$errors.first('active')"
                      :state="!$errors.has('active')"
        >
          <b-form-checkbox v-model="giftCard.active"
                           switch
                           :state="!$errors.has('active')"
          >
            Active
          </b-form-checkbox>
        </b-form-group>
      </b-form>
    </b-modal>

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import debounce from 'lodash.debounce'
  import mask from '@/utilities/mask/credit-card'
  import random from '@/utilities/random/number'

  export default {
    name: 'point-of-sales',
    middleware: ['auth'],
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    data: () => {
      return {
        form: { inLine: true },
        sale: {
          customerId: 1,
          applyTo: 'orderTotal',
          discount: 10,
          products: [],
          tax: 0.065,
          grandTotal: 0,
          total: 0,
          paid: 0,
          discountToAllItem: 0,
          payment: {
            paid_by: 1,
            amount: 0
          }
        },
        query: null,
        checkoutBool: false,
        giftCard: { cardNumber: '', active: true },
        mask: mask,
        options: [
          { value: 1, text: 'Cash' },
          { value: 2, text: 'Credit Card' },
          { value: 3, text: 'Gift Card' },
          { value: 4, text: 'Strip' },
          { value: 5, text: 'Other' }
        ]
      }
    },
    /**
     * The computed properties the page can use.
     */
    computed: {
      ...mapState(['product']),
      ...mapGetters({ 'customers': 'customer/all' }),
      currentPage: {
        get () {
          return this.product.pagination.currentPage
        },
        set (page) {
          this.setPage(page)
        }
      }
    },
    /**
     * The methods which the page can use.
     */
    methods: {
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('product/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      setQueryScroll: debounce(async function () {
        const self = this
        if (self.currentPage < self.product.pagination.totalPages) {
          await self.currentPage++
        }
      }, 1000),
      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      setQuery: debounce(async function (query) {
        const vm = this
        await vm.$store.dispatch('product/reload', (proxy) => {
          proxy.setParameters({
            'q': query,
            active: true
          }).removeParameter('page')
        })
      }, 500),
      async onSubmit (evt) {
        const vm = this
        evt.preventDefault()
        await vm.$store.dispatch('customer/create', vm.form)
      },
      async onSubmitSale (evt) {
        const vm = this
        evt.preventDefault()
        await vm.$store.dispatch('sale/create', vm.sale)
      },
      onReset (evt) {
        evt.preventDefault()
        this.form = { inLine: true }
      },
      hiddenModal () {
        this.form = { inLine: true }
        this.$errors.flush()
      },
      addToCart (product) {
        let found = false
        let vm = this
        for (let i = 0; i < vm.sale.products.length; i++) {
          if (vm.sale.products[i].sku === product.sku) {
            let newProduct = vm.sale.products[i]
            newProduct.qty = newProduct.qty + 1
            found = true
            break
          }
        }
        if (!found) {
          vm.sale.products.push({
            id: product.id,
            qty: 1,
            price: product.price,
            name: product.name,
            sku: product.sku,
            file: product.file
          })
        }
        vm.sale.grandTotal = vm.sale.grandTotal + product.price
        vm.sale.total = vm.sale.grandTotal + (vm.sale.tax * vm.sale.grandTotal)
        vm.checkoutBool = true
      },
      removeProduct (product, index) {
        let vm = this
        vm.sale.products.splice(index, 1)
        vm.sale.grandTotal = vm.sale.grandTotal - (product.price * product.qty)
        vm.sale.total = vm.sale.grandTotal + (vm.sale.tax * vm.sale.grandTotal)
        if (vm.sale.products.length <= 0) {
          vm.checkoutBool = false
        }
      },
      clearCart () {
        let vm = this
        vm.sale.products = []
        vm.sale.grandTotal = 0
        vm.sale.total = 0
        vm.checkoutBool = false
      },
      quantityChange (product, direction, index) {
        let vm = this
        for (let i = 0; i < vm.sale.products.length; i++) {
          if (vm.sale.products[i].sku === product.sku) {
            let newProduct = vm.sale.products[i]
            if (direction === "increment") {
              newProduct.qty = parseInt(newProduct.qty) + 1
              // vm.sale.products.$set(i, newProduct)
            } else {
              newProduct.qty = parseInt(newProduct.qty) - 1
              if (parseInt(newProduct.qty) === 0) {
                vm.sale.products.splice(index, 1)
              } else {
                // vm.sale.products.$set(i, newProduct)
              }
            }
          }
        }
        if (direction === "increment") {
          vm.sale.grandTotal = vm.sale.grandTotal + parseFloat(product.price)
        } else {
          vm.sale.grandTotal = vm.sale.grandTotal - parseFloat(product.price)
        }
        vm.sale.total = vm.sale.grandTotal + (vm.sale.tax * vm.sale.grandTotal)
        if (vm.sale.products.length <= 0) {
          vm.checkoutBool = false
        }
      },
      /**
       * The method used to push select product
       */
      selectedItem (item) {
        this.addToCart(item)
      },
      onSubmitDiscount (evt) {
        let vm = this
        evt.preventDefault()
        if (!vm.sale.discount) {
          return
        }
        if (vm.sale.applyTo === 'orderTotal') {
          vm.sale.total = vm.sale.total - vm.sale.discount
          vm.sale.discountToAllItem = 0
        }
        if (vm.sale.applyTo === 'orderItems') {
          vm.sale.products.map((product) => {
            return product.price - vm.sale.discount
          })
          let cartSize = 0;
          for (let i = 0; i < vm.sale.products.length; i++) {
            cartSize += vm.sale.products[i].qty
          }
          vm.sale.discountToAllItem = vm.sale.discount * cartSize
          vm.sale.total = vm.sale.total - vm.sale.discountToAllItem
        }
        vm.$nextTick(() => {
          vm.$root.$emit('bv::hide::modal', 'modal-discount')
        })
      },
      onCancelDiscount () {
        this.sale.discount = 0
      },
      ...random,
      showPayment (bvEvt) {
        let vm = this
        bvEvt.preventDefault()
        if (vm.checkoutBool) {
          vm.sale.payment.amount = vm.sale.total
          vm.sale.payment.total = vm.sale.total
          vm.sale.payment.totalPaying = vm.sale.total
          vm.$refs.payment.show()
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
          vm.$store.dispatch('product/reload', (proxy) => {
            proxy.removeParameters(['page', 'q', 'direction', 'sort', 'all'])
              .setParameters({ 'active': true })
          })
          vm.$store.dispatch('customer/all', (proxy) => {
            proxy.removeParameters(['page', 'q', 'direction', 'sort', 'all'])
              .setParameters({ 'all': true })
          })
        }
      })
    },
    /**
     * Available watchers for this page.
     */
    watch: {
      query (query) {
        this.setQuery(query)
      },
      '$errors.success': {
        deep: true,
        immediate: true,
        handler (success) {
          if (success) {
            this.$nextTick(() => {
              this.$root.$emit('bv::hide::modal', 'modal-center')
              this.$refs.payment.hide()
              this.$errors.flush()
            })
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .scroll-area {
    position: relative;
    margin: auto;
    height: calc(100vh - 70px);
    min-height: 40vh;
  }

  .scroll-area__cart {
    position: relative;
    margin: auto;
    height: calc(100vh - 29.4em);
    min-height: 20vh;
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>
