/* ============
 * Device Mutations
 * ============
 *
 * The mutations available for the device module.
 */

import store from '@/store'
import {
  CREATED,
  UPDATED,
  DESTROYED
} from './mutation-types'

export default {
  /**
   * Mutation to respond to the action when an device has been created.
   *
   * @param {Object} state   The current state of the device.
   * @param {Object} device  The device that has been created.
   */
  [CREATED] (state, device) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(device)
    }
  },

  /**
   * Mutation to respond to the action when an device has been updated.
   *
   * @param {Object} state  The current state of the device.
   * @param {Object} device The device that has been updated.
   */
  [UPDATED] (state, device) {
    state.all = state.all.map((item) => {
      if (item.id === device.id) {
        return device
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an device has been destroyed.
   *
   * @param {Object} state The current state of the device.
   */
  [DESTROYED] (state) {
    const {
      currentPage,
      totalCount,
      limit,
      totalPages
    } = state.pagination

    let page = currentPage

    // Check if the device is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('device/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
