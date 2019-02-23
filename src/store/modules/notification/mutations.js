/* ============
 * Notification Mutations
 * ============
 *
 * The mutations available for the notification module.
 */

import store from '@/store'
import {
  ALL,
  RELOAD,
  CREATED,
  UPDATED,
  DESTROYED,
  MARK_AS_READ,
  UNREAD
} from './mutation-types'

export default {
  /**
   * Mutation to update the store with the fetched notifications.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  notifications    The fetched notifications.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { notifications, pagination }) {
    notifications.map((model) => state.all.push(model))
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched notifications.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  notifications    The fetched notifications.
   * @param {Object} pagination The fetched pagination.
   */
  [RELOAD] (state, { notifications, pagination }) {
    state.all = notifications
    state.pagination = pagination
  },
  /**
   * Mutation to update the notification with the fetched notifications.
   *
   * @param {Object} state      The current state of the notification.
   * @param {Array}  notifications    The fetched notifications.
   * @param {Object} pagination The fetched pagination.
   */
  [UNREAD] (state, { notifications, pagination }) {
    state.unreads = notifications
    state.pagination = pagination
  },

  /**
   * Mutation to update the notification with the fetched notifications.
   *
   * @param {Object} state      The current state of the notification.
   */
  [MARK_AS_READ] (state) {
    state.unreads = []
  },

  /**
   * Mutation to respond to the action when an notification has been created.
   *
   * @param {Object} state   The current state of the notification.
   * @param {Object} notification  The notification that has been created.
   */
  [CREATED] (state, notification) {
    const { totalCount, limit } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.unreads.length) {
      state.unreads.push(notification)
    }

    if (limit > state.all.length) {
      state.all.splice(0, 0, notification)
    } else {
      state.all.pop()
      state.all.splice(0, 0, notification)
    }
  },

  /**
   * Mutation to respond to the action when an notification has been updated.
   *
   * @param {Object} state  The current state of the notification.
   * @param {Object} notification The notification that has been updated.
   */
  [UPDATED] (state, notification) {
    state.all = state.all.map((item) => {
      if (item.id === notification.id) {
        return notification
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an notification has been destroyed.
   *
   * @param {Object} state The current state of the notification.
   */
  [DESTROYED] (state) {
    const {
      currentPage,
      totalCount,
      limit,
      totalPages
    } = state.pagination

    let page = currentPage

    // Check if the notification is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('notification/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
