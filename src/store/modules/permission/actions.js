/* ============
 * Permission Actions
 * ============
 *
 * The actions available for the permission module.
 */

import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/PermissionProxy'
import PermissionTransformer from '@/transformers/PermissionTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'
import Vue from 'vue'

const proxy = new Proxy()

/**
 * Action fired when all permissions will be fetched.
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
        permissions: PermissionTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an permission will be created.
 *
 * @param {function} commit Commit function to update the store.
 * @param {Object}   permission  The permission that will be created.
 */
const create = ({ commit }, permission) => {
  const transformedPermission = PermissionTransformer.send(permission)

  proxy.create(transformedPermission)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Permission has been created!'
      })
      store.dispatch('permission/created', response.data)

      Vue.router.push({
        name: 'permission.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The permission could not be created'
      })
    })
}

/**
 * Action fired when an permissions has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Array}   permissions  The permissions that has been created.
 */
const created = ({ commit }, permissions) => {
  commit(types.CREATED, PermissionTransformer.fetchCollection(permissions))
}

/**
 * Action fired when an permission will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   permission  The permission that will be updated.
 */
const update = ({ commit }, permission) => {
  const transformedPermission = PermissionTransformer.send(permission)

  proxy.update(permission.id, transformedPermission)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message
      })
      store.dispatch('permission/updated', response.data)

      Vue.router.push({
        name: 'permission.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The permission could not be updated'
      })
    })
}

/**
 * Action fired when an permission has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   permission  The permission that has been updated.
 */
const updated = ({ commit }, permission) => {
  commit(types.UPDATED, PermissionTransformer.fetch(permission))
}

/**
 * Action fired when an permission will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   permission  The permission that will be destroyed.
 */
const destroy = ({ commit }, permission) => {
  proxy.destroy(permission.id)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Permission has been destroyed!'
      })
      store.dispatch('permission/destroyed', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The permission could not be destroyed'
      })
    })
}

/**
 * Action fired when an permission has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   permission  The permission that has been destroyed.
 */
const destroyed = ({ commit }, permission) => {
  commit(types.DESTROYED, PermissionTransformer.fetch(permission))
}

/**
 * Action fired when a permission will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {string} id     Callback to edit the parameters on the proxy.
 */
const detail = ({ commit }, id) => {
  proxy.find(id)
    .then((response) => {
      const data = {
        permission: PermissionTransformer.fetch(response)
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
