/* ============
 * GiftCard Mutations
 * ============
 *
 * The mutations available for the giftCard module.
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
   * Mutation to update the store with the fetched giftCards.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  giftCards    The fetched giftCards.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { giftCards, pagination }) {
    state.all = giftCards
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an giftCard has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} giftCard  The giftCard that has been created.
   */
  [CREATED] (state, giftCard) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(giftCard)
    }
  },

  /**
   * Mutation to respond to the action when an giftCard has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} giftCard The giftCard that has been updated.
   */
  [UPDATED] (state, giftCard) {
    state.all = state.all.map((item) => {
      if (item.id === giftCard.id) {
        return giftCard
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an giftCard has been destroyed.
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

    // Check if the giftCard is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('giftCard/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
