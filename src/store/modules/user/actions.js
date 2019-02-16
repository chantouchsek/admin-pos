/* ============
 * User Actions
 * ============
 *
 * The actions available for the user module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/UserProxy'
import UserTransformer from '@/transformers/UserTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all users will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const all = async ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  await proxy.all()
    .then((response) => {
      const data = {
        users: UserTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an user will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   user  The user that will be created.
 */
const create = ({ commit }, user) => {
  const transformedUser = UserTransformer.send(user)

  proxy.create(transformedUser)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message
      })

      Vue.router.push({
        name: 'user.index'
      })

      Vue.$swal.fire({
        position: 'top-end',
        type: 'success',
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
        customClass: 'animated tada'
      })

    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The user could not be created'
      })
    })
}

/**
 * Action fired when an user has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   user  The user that has been created.
 */
const created = ({ commit }, user) => {
  commit(types.CREATED, UserTransformer.fetch(user))
}

/**
 * Action fired when an user will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   user  The user that will be updated.
 */
const update = ({ commit }, user) => {
  const transformedUser = UserTransformer.send(user)

  proxy.update(user.uuid, transformedUser)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message
      })

      Vue.router.push({
        name: 'user.index'
      })

      Vue.$swal.fire({
        position: 'top-end',
        type: 'success',
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
        customClass: 'animated tada'
      })

    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The user could not be updated'
      })
    })
}

/**
 * Action fired when an user has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   user  The user that has been updated.
 */
const updated = ({ commit }, user) => {
  commit(types.UPDATED, UserTransformer.fetch(user))
}

/**
 * Action fired when an user will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   userId  The user that will be destroyed.
 */
const destroy = ({ commit }, userId) => {
  proxy.destroy(userId)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message
      })

      Vue.router.push({
        name: 'user.index'
      })

      Vue.$swal.fire('Deleted!', response.message, 'success')

    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The user could not be destroyed'
      })
    })
}

/**
 * Action fired when an user has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   user  The user that has been destroyed.
 */
const destroyed = ({ commit }, user) => {
  commit(types.DESTROYED, UserTransformer.fetch(user))
}

/**
 * Action fired when a user will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {string} uuid     Callback to edit the parameters on the proxy.
 */
const detail = ({ commit }, uuid) => {
  proxy.find(uuid)
    .then((response) => {
      const data = {
        user: UserTransformer.fetch(response)
      }
      commit(types.DETAIL, data)
    })
    .catch((error) => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: error.message
      })
    })
}

export default {
  all,
  detail,
  create,
  created,
  update,
  updated,
  destroy,
  destroyed
}
