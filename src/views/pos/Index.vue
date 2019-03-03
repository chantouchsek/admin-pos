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
          <vue-perfect-scrollbar class="scroll-area__cart" :settings="settings">
            <table class="table table-fixed table-hover table-borderless">
              <thead class="bg-gray-100">
              <tr>
                <th>Product</th>
                <th class="text-center">Price</th>
                <th class="text-center">Qty</th>
                <th class="text-left">Subtotal</th>
                <th class="text-center">
                  <i class="fa fa-trash-o cursor-pointer" @click="clearCart" v-if="cart.length"></i>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(product,index) in cart" :key="`product-${index}`">
                <th class="text-left">{{ product.name }}</th>
                <th>{{ product.price | currency }}</th>
                <th>
                  <b-input-group>
                    <b-input-group-prepend @click="quantityChange(product, 'decrement', index)">
                      <b-button variant="outline-info" size="sm"><i class="fa fa-minus"></i></b-button>
                    </b-input-group-prepend>
                    <b-form-input type="number" min="0"
                                  v-model="cart[index].qty"
                                  size="sm"
                    />
                    <b-input-group-append @click="quantityChange(product, 'increment', index)">
                      <b-button variant="outline-secondary" size="sm"><i class="fa fa-plus"></i></b-button>
                    </b-input-group-append>
                  </b-input-group>
                </th>
                <th>{{ parseInt(product.qty) * parseFloat(product.price) | currency }}</th>
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
              <th colspan="1" class="text-right">{{ cart | cartSize }}</th>
              <th colspan="1">Sub Total:</th>
              <th colspan="1" class="text-right">{{ cartSubTotal | currency }}</th>
            </tr>
            <tr>
              <th colspan="1">
                <b-link v-b-modal.modal-discount>Discount:</b-link>
              </th>
              <th colspan="1" class="text-right">({{ discountToAllItem | currency }}) {{ discount | currency }}</th>
              <th colspan="1">
                <b-link v-b-modal.modal-tax>Order tax:</b-link>
              </th>
              <th colspan="1" class="text-right">{{ cartTotal - cartSubTotal | currency }}</th>
            </tr>
            <tr>
              <th colspan="2">
                Total payable
                <b-link v-b-modal.modal-notes>
                  <i class="fa fa-commenting-o"></i>
                </b-link>
              </th>
              <th colspan="2" class="text-right">{{ cartTotal | currency }}</th>
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
                    <b-button variant="success">Payment</b-button>
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
          <vue-perfect-scrollbar class="scroll-area" :settings="settings" @ps-y-reach-end="setQueryScroll">
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

    <b-modal id="modal-center" centered title="Add Customer" scrollable @ok="onSubmit" @hidden="hiddenModal">
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

    <b-modal id="modal-discount" centered title="Discount 5 or 5%" @ok="onSubmitDiscount" @cancel="onCancelDiscount">
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

    <b-modal id="modal-tax" centered title="Tax 5 or 5%">
      <b-form-input type="text" v-model="tax" placeholder="You can set tax by 5 or 5%" required/>
    </b-modal>

    <b-modal id="modal-notes" centered title="Notes">
      <b-form-group label="Notes:"
                    label-for="notes"
                    :invalid-feedback="$errors.first('notes')"
      >
        <textarea-autosize v-model="sale.notes"
                           input-name="notes"
                           placeholder="Enter payment notes"
        ></textarea-autosize>
      </b-form-group>
    </b-modal>

    <b-modal id="modal-gift-card" centered title="Sell Gift Card">
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
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
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
        items: [],
        form: { inLine: true },
        sale: { customerId: '', applyTo: 'orderTotal', discount: 10 },
        settings: {
          maxScrollbarLength: 60,
          wheelPropagation: true,
          suppressScrollX: true,
          mimScrollbarLength: 30
        },
        query: null,
        checkoutBool: false,
        cart: [],
        cartSubTotal: 0,
        tax: 0.065,
        cartTotal: 0,
        discount: 0,
        discountToAllItem: 0,
        giftCard: { cardNumber: '', active: true },
        mask: mask
      }
    },
    components: {
      VuePerfectScrollbar
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
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].sku === product.sku) {
            let newProduct = this.cart[i]
            newProduct.qty = newProduct.qty + 1
            // console.log("DUPLICATE", this.cart[i].product + "'s qty is now: " + this.cart[i].qty)
            found = true
            break
          }
        }
        if (!found) {
          const vm = this
          vm.cart.push({
            id: product.id,
            qty: 1,
            price: product.price,
            name: product.name,
            sku: product.sku,
            file: product.file
          })
        }
        this.cartSubTotal = this.cartSubTotal + product.price
        this.cartTotal = this.cartSubTotal + (this.tax * this.cartSubTotal)
        this.checkoutBool = true
      },
      removeProduct (product, index) {
        this.cart.splice(index, 1)
        this.cartSubTotal = this.cartSubTotal - (product.price * product.qty)
        this.cartTotal = this.cartSubTotal + (this.tax * this.cartSubTotal)
        if (this.cart.length <= 0) {
          this.checkoutBool = false
        }
      },
      clearCart () {
        this.cart = []
        this.cartSubTotal = 0
        this.cartTotal = 0
        this.checkoutBool = false
      },
      quantityChange (product, direction, index) {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].sku === product.sku) {
            let newProduct = this.cart[i]
            if (direction === "increment") {
              newProduct.qty = parseInt(newProduct.qty) + 1
              // this.cart.$set(i, newProduct)
            } else {
              newProduct.qty = parseInt(newProduct.qty) - 1
              if (parseInt(newProduct.qty) === 0) {
                this.cart.splice(index, 1)
              } else {
                // this.cart.$set(i, newProduct)
              }
            }
          }
        }
        if (direction === "increment") {
          this.cartSubTotal = this.cartSubTotal + parseFloat(product.price)
        } else {
          this.cartSubTotal = this.cartSubTotal - parseFloat(product.price)
        }
        this.cartTotal = this.cartSubTotal + (this.tax * this.cartSubTotal)
        if (this.cart.length <= 0) {
          this.checkoutBool = false
        }
      },
      /**
       * The method used to push select product
       */
      selectedItem (item) {
        this.addToCart(item)
      },
      onSubmitDiscount (evt) {
        evt.preventDefault()
        if (!this.sale.discount) {
          return
        }
        if (this.sale.applyTo === 'orderTotal') {
          this.cartTotal = this.cartTotal - this.sale.discount
          this.discount = this.sale.discount
          this.discountToAllItem = 0
        }
        if (this.sale.applyTo === 'orderItems') {
          this.discount = this.sale.discount
          this.cart.map((product) => {
            return product.price - this.sale.discount
          })
          let cartSize = 0;
          for (let i = 0; i < this.cart.length; i++) {
            cartSize += this.cart[i].qty
          }
          this.discountToAllItem = this.sale.discount * cartSize
          this.cartTotal = this.cartTotal - this.discountToAllItem
        }
        this.$nextTick(() => {
          this.$root.$emit('bv::hide::modal', 'modal-discount')
        })
      },
      onCancelDiscount () {
        this.sale.discount = '0'
      },
      ...random
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
