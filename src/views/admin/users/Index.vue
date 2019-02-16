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
            <b-link href="#" class="card-header-action btn-close" :to="{ name: 'user.create' }"
                    v-b-tooltip.hover
                    title="New User"
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
          <b-col md="6" class="mb-2 mt-2">
            <b-form-checkbox
              id="active"
              v-model="active"
              value="0"
              unchecked-value="1"
              switch
              @input="setQuery(query)"
              :disabled="$errors.busy"
            >
              InActive
            </b-form-checkbox>
          </b-col>
        </b-row>
        <b-table :show-empty="true"
                 :responsive="true"
                 :items="user.all"
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
              <b-dropdown-item :to="getEditRoute(row.item.uuid)">
                <i class="fa fa-edit"></i> Edit
              </b-dropdown-item>
              <b-dropdown-item :to="getDetailRoute(row.item.uuid)">
                <i class="fa fa-info"></i> Detail
              </b-dropdown-item>
              <b-dropdown-item href="#" @click="destroy(row.item.uuid)">
                <i class="fa fa-trash"></i> Delete
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template slot="active" slot-scope="row">
            <b-badge v-if="row.item.active" variant="success">Active</b-badge>
            <b-badge v-else variant="warning">InActive</b-badge>
          </template>
          <template slot="dateOfBirth" slot-scope="row">
            {{ $moment(row.item.dateOfBirth).format('Do-MMM-YYYY') }}
          </template>
        </b-table>
        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination
              :total-rows="user.pagination.totalCount"
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
          { key: 'staffId', label: 'ID', sortable: true },
          { key: 'name', label: 'Name', sortable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'dateOfBirth', label: 'Date Of Birth', sortable: true },
          { key: 'phoneNumber', label: 'Phone Number', sortable: true },
          { key: 'active', label: 'Active', sortable: true },
          { key: 'actions', label: 'Action' }
        ],
        sortable: {
          name: 'name',
          staffId: 'staff_id',
          email: 'email',
          phone_number: 'phoneNumber',
          active: 'active'
        },
        query: null,
        pageNumbers: [5, 10, 20, 30, 50, 500],
        sortBy: 'name',
        sortDesc: false,
        active: 1
      }
    },

    /**
     * The computed properties the page can use.
     */
    computed: {
      ...mapState(['user']),
      limit: {
        get () {
          return this.user.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.user.pagination.currentPage
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
       * Method used to get the user route.
       *
       * @param {Number} uuid The user identifier.
       *
       * @returns {Object} The user route.
       */
      getEditRoute (uuid) {
        return {
          name: 'user.edit',
          params: { uuid: uuid }
        }
      },
      /**
       * Method used to get the user route.
       *
       * @param {Number} uuid The user identifier.
       *
       * @returns {Object} The user route.
       */
      getDetailRoute (uuid) {
        return {
          name: 'user.detail',
          params: { uuid: uuid }
        }
      },
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('user/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('user/all', (proxy) => {
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
        vm.$store.dispatch('user/all', (proxy) => {
          proxy.setParameters({
            q: query,
            direction: vm.sortDesc ? 'desc' : 'asc',
            sort: vm.sortable[vm.sortBy],
            active: vm.active
          }).removeParameter('page')
        })
      }, 500),
      /**
       * Reload the resource
       */
      reloadResource: debounce(function () {
        this.$store.dispatch('user/all', (proxy) => {
          proxy.removeParameters(['page', 'q', 'direction', 'sort'])
        })
      }, 500),
      /**
       * Delete the resource
       */
      destroy (uuid) {
        const vm = this
        vm.$swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            vm.$store.dispatch('user/destroy', uuid)
          }
        })
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    async mounted () {
      const vm = this
      await vm.$store.watch((state) => {
        if (state.auth.authenticated) {
          vm.$store.dispatch('user/all', (proxy) => {
            proxy.removeParameters(['page', 'q', 'direction', 'sort'])
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
