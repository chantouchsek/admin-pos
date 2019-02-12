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
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'User has been created!'
      })

      Vue.router.push({
        name: 'user.index'
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
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'User has been updated!'
      })

      Vue.router.push({
        name: 'user.index'
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
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'User has been destroyed!'
      })

      Vue.router.push({
        name: 'user.index'
      })
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

export default {
  all,
  create,
  created,
  update,
  updated,
  destroy,
  destroyed
}
