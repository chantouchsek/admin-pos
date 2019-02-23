<template>
  <div class="animated fadeIn">
    <transition name="fade">
      <b-card header-tag="header" class="card-accent-success">
        <div slot="header">
          <i class="icon-list"></i> Users List
          <div class="card-header-actions">
            <b-link href="#" class="card-header-action btn-setting mr-1" @click.prevent="reloadResource"
                    v-b-tooltip.hover
                    title="Reload"
            >
              <i class="icon-refresh"></i>
            </b-link>
            <b-link href="#" class="card-header-action btn-close" :to="{ name: 'role.create' }"
                    v-b-tooltip.hover
                    title="New Role"
            >
              <i class="icon-plus"></i>
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
                 :items="role.all"
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
          <template slot="actions" slot-scope="row">
            <b-dropdown text="Action"
                        variant="primary"
                        class="m-2"
                        size="sm"
            >
              <b-dropdown-item :to="getEditRoute(row.item.id)">
                <i class="fa fa-edit"></i> Edit
              </b-dropdown-item>
              <b-dropdown-item :to="getDetailRoute(row.item.id)">
                <i class="fa fa-info"></i> Detail
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>
        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination
              :total-rows="role.pagination.totalCount"
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
    name: 'users-index',
    middleware: ['auth'],
    metaInfo () {
      return { title: this.$t('users.title') }
    },
    scrollToTop: true,
    data: () => {
      return {
        fields: [
          { key: 'id', label: 'ID', sortable: true },
          { key: 'name', label: 'Name', sortable: true },
          { key: 'guardName', label: 'Guard Name', sortable: true },
          { key: 'actions', label: 'Action' }
        ],
        sortable: {
          name: 'name',
          id: 'id',
          guardName: 'guard_name'
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
      ...mapState(['role']),
      limit: {
        get () {
          return this.role.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.role.pagination.currentPage
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
       * Method used to get the role route.
       *
       * @param {Number} id The role identifier.
       *
       * @returns {Object} The role route.
       */
      getEditRoute (id) {
        return {
          name: 'role.edit',
          params: { id: id }
        }
      },
      /**
       * Method used to get the role route.
       *
       * @param {Number} id The role identifier.
       *
       * @returns {Object} The role route.
       */
      getDetailRoute (id) {
        return {
          name: 'role.detail',
          params: { id: id }
        }
      },
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('role/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('role/all', (proxy) => {
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
        vm.$store.dispatch('role/all', (proxy) => {
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
        this.$store.dispatch('role/all', (proxy) => {
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
          vm.$store.dispatch('role/all', (proxy) => {
            proxy.removeParameters(['page', 'q', 'direction', 'sort'])
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
