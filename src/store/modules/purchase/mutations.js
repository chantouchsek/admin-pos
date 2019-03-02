/* ============
 * Purchase Mutations
 * ============
 *
 * The mutations available for the purchase module.
 */

import store from '@/store'
import {
  ALL,
  CREATED,
  UPDATED,
  DESTROYED
} from './mutation-types'

export default {
  /**
   * Mutation to update the store with the fetched categories.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  categories    The fetched categories.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { categories, pagination }) {
    state.all = categories
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an purchase has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} purchase  The purchase that has been created.
   */
  [CREATED] (state, purchase) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(purchase)
    }
  },

  /**
   * Mutation to respond to the action when an purchase has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} purchase The purchase that has been updated.
   */
  [UPDATED] (state, purchase) {
    state.all = state.all.map((item) => {
      if (item.id === purchase.id) {
        return purchase
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an purchase has been destroyed.
   *
   * @param {Object} state The current state of the store.
   */
  [DESTROYED] (state) {
    const {
      currentPage,
      totalCount,
      limit,
      totalPages
    } = state.pagination

    let page = currentPage

    // Check if the purchase is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('purchase/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
