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
            <b-link href="#" class="card-header-action btn-close" :to="{ name: 'permission.create' }"
                    v-b-tooltip.hover
                    title="New Permission"
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
                 :items="permission.all"
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
          <template slot="name" slot-scope="row">
            {{ row.item.name | removeHyphen }}
          </template>
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
              :total-rows="permission.pagination.totalCount"
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
      ...mapState(['permission']),
      limit: {
        get () {
          return this.permission.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.permission.pagination.currentPage
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
       * Method used to get the permission route.
       *
       * @param {Number} id The permission identifier.
       *
       * @returns {Object} The permission route.
       */
      getEditRoute (id) {
        return {
          name: 'permission.edit',
          params: { id: id }
        }
      },
      /**
       * Method used to get the permission route.
       *
       * @param {Number} id The permission identifier.
       *
       * @returns {Object} The permission route.
       */
      getDetailRoute (id) {
        return {
          name: 'permission.show',
          params: { id: id }
        }
      },
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('permission/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('permission/all', (proxy) => {
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
        vm.$store.dispatch('permission/all', (proxy) => {
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
        this.$store.dispatch('permission/all', (proxy) => {
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
          vm.$store.dispatch('permission/all', (proxy) => {
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
