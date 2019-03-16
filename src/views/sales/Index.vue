<template>
  <div class="animated fadeIn">
    <transition name="fade">
      <b-card header-tag="header" class="card-accent-success">
        <div slot="header">
          <i class="icon-list"></i> Sales
          <div class="card-header-actions">
            <b-link href="#" class="card-header-action btn-setting mr-1" @click.prevent="reloadResource"
                    v-b-tooltip.hover
                    title="Reload"
            >
              <i class="icon-refresh"></i>
            </b-link>
          </div>
        </div>

        <b-row>
          <b-col md="6" class="mb-2">
            <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
              <b-input-group>
                <b-form-input v-model="query" placeholder="Type to search..."></b-form-input>
                <b-input-group-append>
                  <b-btn :disabled="!query" @click="query = ''">Search</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-table :show-empty="true"
                 bordered
                 :responsive="true"
                 :items="sale.all"
                 :fields="fields"
                 :current-page="currentPage"
                 :filter="query"
                 :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 @sort-changed="sortingChanged"
                 :busy.sync="$errors.busy"
                 :no-local-sorting="true"
                 :no-provider-sorting="true"
                 :no-provider-filtering="true"
        >
          <template slot="actions" slot-scope="row">
            <b-button size="sm"
                      class="mr-1"
                      variant="primary"
                      v-b-tooltip
                      title="Show"
                      :to="getShowRoute(row.item.uuid)"
            >
              <i class="fa fa-eye"></i>
            </b-button>
          </template>
          <template slot="active" slot-scope="row">
            <b-badge v-if="row.item.active" variant="success">Active</b-badge>
            <b-badge v-else variant="warning">InActive</b-badge>
          </template>
          <template slot="customer" slot-scope="row">
            {{ row.item.customer.name }}
          </template>
          <template slot="date" slot-scope="row">
            {{ $moment(row.item.date).format('dddd, Do MMMM YYYY, h:mm:ss a') }}
          </template>
        </b-table>
        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination
              :total-rows="sale.pagination.totalCount"
              :per-page="limit"
              v-model="currentPage"
              class="my-0"
              :disabled="$errors.busy"
            ></b-pagination>
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
              <b-form-select
                v-model="limit"
                :options="pageNumbers"
                class="mb-3"
                :disabled="$errors.busy"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import debounce from 'lodash.debounce'

  export default {
    name: 'sales-index',
    middleware: ['auth'],
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    data: () => {
      return {
        fields: [
          { key: 'date', label: 'Date', sortable: true },
          { key: 'customer', label: 'Customer', sortable: true },
          { key: 'total', label: 'Total', sortable: true },
          { key: 'tax', label: 'Tax', sortable: true },
          { key: 'discount', label: 'Discount', sortable: true },
          { key: 'grandTotal', label: 'Grand Total', sortable: true },
          { key: 'paid', label: 'Paid', sortable: true },
          { key: 'status', label: 'status', sortable: true },
          { key: 'actions', label: 'Action' }
        ],
        sortable: {
          date: 'date',
          customer: 'customer.name',
          total: 'total',
          tax: 'tax',
          discount: 'discount',
          grandTotal: 'grand_total',
          paid: 'paid',
          status: 'status'
        },
        query: null,
        pageNumbers: [5, 10, 20, 30, 50, 500],
        sortBy: 'name',
        sortDesc: false,
        show: true,
        active: 1
      }
    },

    /**
     * The computed properties the page can use.
     */
    computed: {
      ...mapState(['sale']),
      limit: {
        get () {
          return this.sale.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.sale.pagination.currentPage
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
       * The method use track the table sort changed.
       */
      sortingChanged (ctx) {
        this.sortBy = ctx.sortBy
        this.sortDesc = ctx.sortDesc
        this.setQuery(this.query)
      },
      /**
       * Method used to get the sale route.
       *
       * @param {Number} uuid The sale identifier.
       *
       * @returns {Object} The sale route.
       */
      getShowRoute (uuid) {
        return {
          name: 'sale.show',
          params: { uuid: uuid }
        }
      },
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('sale/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('sale/all', (proxy) => {
          proxy.setParameter('limit', limit)
            .removeParameter('page')
        })
      },
      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      setQuery: debounce(async function (query) {
        const vm = this
        await vm.$store.dispatch('sale/all', (proxy) => {
          proxy.setParameters({
            'q': query,
            'direction': vm.sortDesc ? 'desc' : 'asc',
            'sort': vm.sortable[vm.sortBy],
            active: vm.active
          })
            .removeParameter('page')
        })
      }, 500),
      /**
       * Reload the resource
       */
      reloadResource: debounce(function () {
        this.$store.dispatch('sale/all', (proxy) => {
          proxy.removeParameters(['page', 'q', 'direction', 'sort', 'active'])
        })
      }, 500),
      /**
       * Delete the resource
       */
      destroy (sale) {
        this.$store.dispatch('sale/destroy', sale)
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    async mounted () {
      const vm = this
      await vm.$store.watch((state) => {
        if (state.auth.authenticated) {
          vm.$store.dispatch('sale/all', (proxy) => {
            proxy.removeParameters(['page', 'q', 'direction', 'sort', 'all'])
              .setParameters({ 'active': vm.active })
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
      }
    }
  }
</script>
