/* ============
 * Notification Actions
 * ============
 *
 * The actions available for the notification module.
 */

import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/NotificationProxy'
import NotificationTransformer from '@/transformers/NotificationTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all notifications will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn Callback to edit the parameters on the proxy.
 */
const all = async ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  await proxy.all()
    .then((response) => {
      const data = {
        notifications: NotificationTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when all notifications will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const reload = async ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  await proxy.all()
    .then((response) => {
      const data = {
        notifications: NotificationTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.RELOAD, data)
    })
}

/**
 * Action fired when all notifications will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn Callback to edit the parameters on the proxy.
 */
const unReads = async ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  await proxy.unReads()
    .then((response) => {
      const data = {
        notifications: NotificationTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.UNREAD, data)
    })
}

/**
 * Action fired when an notification will be read.
 * @param {function} commit  Commit function to update the store.
 *
 */
const markAsRead = async ({ commit }) => {
  await proxy.markAsRead()
    .then(() => {
      commit(types.MARK_AS_READ)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The notification could not be read'
      })
    })
}

/**
 * Action fired when an notification will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   notification  The notification that will be created.
 */
const create = ({ commit }, notification) => {
  const transformedNotification = NotificationTransformer.send(notification)

  proxy.create(transformedNotification)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Notification has been created!'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The notification could not be created'
      })
    })
}

/**
 * Action fired when an notification has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   notification  The notification that has been created.
 */
const created = ({ commit }, notification) => {
  commit(types.CREATED, NotificationTransformer.fetch(notification))
}

/**
 * Action fired when an notification will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   notification  The notification that will be updated.
 */
const update = ({ commit }, notification) => {
  const transformedNotification = NotificationTransformer.send(notification)

  proxy.update(notification.id, transformedNotification)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Notification has been updated'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'Notification can not be updated.'
      })
    })
}

/**
 * Action fired when an notification has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   notification  The notification that has been updated.
 */
const updated = ({ commit }, notification) => {
  commit(types.UPDATED, NotificationTransformer.fetch(notification))
}

/**
 * Action fired when an notification will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   notificationId  The notification that will be destroyed.
 */
const destroy = ({ commit }, notificationId) => {
  proxy.destroy(notificationId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Notification has been deleted'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'Notification could not be deleted.'
      })
    })
}

/**
 * Action fired when an notification has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   notification  The notification that has been destroyed.
 */
const destroyed = ({ commit }, notification) => {
  commit(types.DESTROYED, NotificationTransformer.fetch(notification))
}

export default {
  all,
  reload,
  create,
  created,
  update,
  updated,
  destroy,
  destroyed,
  markAsRead,
  unReads
}
