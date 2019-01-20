<template>
  <div class="animated fadeIn">
    <b-card header-tag="header">
      <div slot="header">
        <i class="icon-drop"></i> Categories
        <div class="pull-right btn-sm"
             @click.prevent="reloadCategory"
             v-b-tooltip
             title="Reload"
        >
          <i class="icon-refresh"></i>
        </div>
        <div @click.prevent="redirectToCreatePage"
             class="pull-right mr-1 btn-sm"
             v-b-tooltip
             title="Create Category"
        >
          <i class="icon-plus"></i>
        </div>
      </div>

      <b-row>
        <b-col md="6" class="mb-2">
          <b-form-group horizontal label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="query" placeholder="Type to search..."></b-form-input>
              <b-input-group-append>
                <b-btn :disabled="!query" @click="query = ''">Search</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        show-empty
        responsive
        :items="category.all"
        :fields="fields"
        :current-page="currentPage"
        :per-page="category.pagination.perPage"
        :filter="query"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        @sort-changed="sortingChanged"
        :busy.sync="busy"
        no-local-sorting
      >
        <template slot="actions" slot-scope="row">
          <b-button size="sm"
                    class="mr-1"
                    :to="getCategoryRoute(row.item.uuid)"
                    variant="primary"
                    v-b-tooltip
                    title="Edit"
          >
            <i class="fa fa-edit"></i>
          </b-button>
        </template>
        <template slot="active" slot-scope="row">
          <b-badge v-if="row.item.active" variant="success">Active</b-badge>
          <b-badge v-else variant="warning">InActive</b-badge>
        </template>
      </b-table>
      <b-row>
        <b-col md="6" class="my-1">
          <b-pagination
            :total-rows="category.pagination.totalCount"
            :per-page="limit"
            v-model="currentPage"
            class="my-0"
          ></b-pagination>
        </b-col>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="Per page" class="mb-0">
            <b-form-select
              v-model="limit"
              :options="pageNumbers"
              class="mb-3"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import debounce from 'lodash.debounce'

  export default {
    name: 'categories-index',
    middleware: ['auth'],
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    data: () => {
      return {
        fields: [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'description', label: 'Description', sortable: true },
          { key: 'active', label: 'Active', sortable: true },
          { key: 'actions', label: 'Action' }
        ],
        sortable: {
          name: 'name',
          description: 'description',
          active: 'active'
        },
        query: null,
        pageNumbers: [5, 10, 20, 30, 50, 500],
        sortBy: 'name',
        sortDesc: false,
        busy: false
      }
    },

    /**
     * The computed properties the page can use.
     */
    computed: {
      ...mapState(['category']),
      limit: {
        get () {
          return this.category.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.category.pagination.currentPage
        },
        set (page) {
          this.setPage(page)
        }
      },
      sortOptions () {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
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
       * Method used to redirect the budget to the budget create page.
       */
      redirectToCreatePage () {
        this.$router.push({
          name: 'category.create'
        })
      },
      /**
       * Method used to get the category route.
       *
       * @param {Number} uuid The category identifier.
       *
       * @returns {Object} The category route.
       */
      getCategoryRoute (uuid) {
        return {
          name: 'category.edit',
          params: { uuid: uuid }
        }
      },
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('category/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('category/all', (proxy) => {
          proxy.setParameter('limit', limit)
            .removeParameter('page')
        })
      },
      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      setQuery: debounce(function (query) {
        this.busy = true
        this.$store.dispatch('category/all', (proxy) => {
          proxy.setParameters({
            'q': query,
            'order': this.sortDesc ? 'desc' : 'asc',
            'sort': this.sortable[this.sortBy]
          })
            .removeParameter('page')
        })
        setTimeout(function () {
          this.busy = false
        }.bind(this), 1000)
      }, 500),
      /**
       * Reload the resource
       */
      reloadCategory: debounce(function () {
        this.busy = true
        this.$store.dispatch('category/all', (proxy) => {
          proxy.removeParameters(['page', 'q', 'order', 'sort'])
        })
        setTimeout(function () {
          this.busy = false
        }.bind(this), 1000)
      }, 500),
      /**
       * Delete the resource
       */
      destroyCategory (category) {
        this.$store.dispatch('category/destroy', category)
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    mounted () {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          this.$store.dispatch('category/all')
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
