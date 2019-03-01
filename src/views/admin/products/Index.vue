<template>
  <div class="animated fadeIn">
    <transition name="fade">
      <b-card header-tag="header" class="card-accent-success">
        <div slot="header">
          <i class="icon-list"></i> Products List
          <div class="card-header-actions">
            <b-link href="#" class="card-header-action mr-1" @click.prevent="reloadResource"
                    v-b-tooltip.hover
                    title="Reload"
            >
              <i class="icon-refresh"></i>
            </b-link>
            <b-link href="#" class="card-header-action mr-1" :to="{ name: 'product.create' }"
                    v-b-tooltip.hover
                    title="New Product"
            >
              <i class="icon-plus"></i>
            </b-link>
            <b-link href="#" class="card-header-action" :to="{ name: 'product.import' }"
                    v-b-tooltip.hover
                    title="Import Products"
            >
              <i class="fa fa-file-excel-o"></i>
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
                 :responsive="true"
                 :items="product.all"
                 :fields="fields"
                 bordered
                 outlined
                 striped
                 hover
                 fixed
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
          <!--<template slot="file" slot-scope="row">-->
          <!--<b-img :src="row.item.file" fluid :alt="row.item.name" width="40" height="40"/>-->
          <!--</template>-->
          <template slot="actions" slot-scope="row">
            <b-dropdown split class="m-2" @click="getViewRoute(row.item.uuid)">
              <template slot="button-content">
                <i class="fa fa-search-plus"></i> View
              </template>
              <b-dropdown-item :to="getEditRoute(row.item.uuid)"><i class="fa fa-edit"></i> Edit</b-dropdown-item>
              <b-dropdown-item href="#"><i class="fa fa-trash"></i> Delete</b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>
        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination
              :total-rows="product.pagination.totalCount"
              :per-page="limit"
              v-model.number="currentPage"
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
    name: 'products-index',
    middleware: ['auth'],
    metaInfo () {
      return { title: this.$t('users.title') }
    },
    scrollToTop: true,
    data: () => {
      return {
        fields: [
          { key: 'id', label: 'ID', sortable: true },
          // { key: 'file', label: 'Image', sortable: true },
          { key: 'name', label: 'Name', sortable: true },
          { key: 'price', label: 'Price', sortable: true },
          { key: 'cost', label: 'Cost', sortable: true },
          { key: 'sku', label: 'SKU', sortable: true },
          { key: 'importedDate', label: 'Imported Date', sortable: true },
          { key: 'expiredAt', label: 'Expired At', sortable: true },
          { key: 'actions', label: 'Action' }
        ],
        sortable: {
          name: 'name',
          uuid: 'uuid',
          price: 'price',
          cost: 'cost',
          sku: 'sku',
          importedDate: 'imported_date',
          expiredAt: 'expired_at'
        },
        query: null,
        pageNumbers: [5, 10, 20, 30, 50, 500],
        sortBy: 'name',
        sortDesc: false
      }
    },

    /**
     * The computed properties the page can use.
     */
    computed: {
      ...mapState(['product']),
      limit: {
        get () {
          return this.product.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
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
       * The method use track the table sort changed.
       */
      sortingChanged (ctx) {
        const vm = this
        vm.sortBy = ctx.sortBy
        vm.sortDesc = ctx.sortDesc
        vm.setQuery(vm.query)
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
      },
      /**
       * Method used to get the attribute route.
       *
       * @param {Number} id The attribute identifier.
       *
       * @returns {Object} The attribute route.
       */
      getViewRoute (id) {
        return this.$router.push({
          name: 'product.show',
          params: { uuid: id }
        })
      },
      /**
       * Method used to get the product route.
       *
       * @param {Number} uuid The product identifier.
       *
       * @returns {Object} The product route.
       */
      getDetailRoute (uuid) {
        return {
          name: 'product.show',
          params: { uuid: uuid }
        }
      },
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
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('product/all', (proxy) => {
          proxy.setParameter('limit', limit)
            .removeParameter('page')
        })
      },
      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      setQuery: debounce(function (query) {
        const vm = this
        vm.$store.dispatch('product/all', (proxy) => {
          proxy.setParameters({
            q: query,
            direction: vm.sortDesc ? 'desc' : 'asc',
            sort: vm.sortable[vm.sortBy]
          }).removeParameter('page')
        })
      }, 500),
      /**
       * Reload the resource
       */
      reloadResource: debounce(function () {
        this.$store.dispatch('product/all', (proxy) => {
          proxy.removeParameters(['page', 'q', 'direction', 'sort'])
        })
      }, 500)
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    async mounted () {
      const vm = this
      await vm.$store.watch((state) => {
        if (state.auth.authenticated) {
          vm.$store.dispatch('product/all', (proxy) => {
            proxy.removeParameters(['page', 'q', 'direction', 'sort', 'in_stock'])
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
