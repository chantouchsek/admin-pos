<template>
  <b-row>
    <b-col md="6" class="my-1">
      <b-pagination
        :total-rows="data.pagination.totalCount"
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

</template>

<script>
  export default {
    props: {
      data: {
        type: [Object, Array],
        default: () => {
          //
        }
      }
    },
    data () {
      return {
        pageNumbers: [5, 10, 20, 30, 50, 500]
      }
    },
    name: "Pagination",
    /**
     * The computed properties the page can use.
     */
    computed: {
      limit: {
        get () {
          return this.data.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.data.pagination.currentPage
        },
        set (page) {
          this.setPage(page)
        }
      }
    },
    methods: {
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch(`${this.data}/all`, (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch(`${this.data}/all`, (proxy) => {
          proxy.setParameter('limit', limit)
            .removeParameter('page')
        })
      }
    }
  }
</script>
