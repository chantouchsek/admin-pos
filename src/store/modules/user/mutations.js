/* ============
 * User Mutations
 * ============
 *
 * The mutations available for the user module.
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
   * Mutation to update the store with the fetched users.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  users    The fetched users.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { users, pagination }) {
    state.all = users
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an user has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} user  The user that has been created.
   */
  [CREATED] (state, user) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(user)
    }
  },

  /**
   * Mutation to respond to the action when an user has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} user The user that has been updated.
   */
  [UPDATED] (state, user) {
    state.all = state.all.map((item) => {
      if (item.id === user.id) {
        return user
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an user has been destroyed.
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

    // Check if the user is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('user/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
