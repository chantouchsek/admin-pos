/* ============
 * Permission Mutations
 * ============
 *
 * The mutations available for the permission module.
 */

import store from '@/store'
import {
  ALL,
  DETAIL,
  CREATED,
  UPDATED,
  DESTROYED
} from './mutation-types'

export default {
  /**
   * Mutation to update the store with the fetched permissions.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  permissions    The fetched permissions.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { permissions, pagination }) {
    state.all = permissions
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched permission.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  permission    The fetched permissions.
   */
  [DETAIL] (state, { permission }) {
    state.detail = permission
  },
  /**
   * Mutation to respond to the action when an permission has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} permissions  The permission that has been created.
   */
  [CREATED] (state, permissions) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += permissions.length

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(permissions)
    }
  },

  /**
   * Mutation to respond to the action when an permission has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} permission The permission that has been updated.
   */
  [UPDATED] (state, permission) {
    state.all = state.all.map((item) => {
      if (item.id === permission.id) {
        return permission
      }
      return item
    })
  },

  /**
   * Mutation to respond to the action when an permission has been destroyed.
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

    // Check if the permission is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('permission/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
