/* ============
 * Category Actions
 * ============
 *
 * The actions available for the category module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/CategoryProxy'
import CategoryTransformer from '@/transformers/CategoryTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all categories will be fetched.
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
        categories: CategoryTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an category will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   category  The category that will be created.
 */
const create = ({ commit }, category) => {
  const transformedCategory = CategoryTransformer.send(category)

  proxy.create(transformedCategory)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Category has been created!'
      })

      Vue.router.push({
        name: 'category.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The category could not be created'
      })
    })
}

/**
 * Action fired when an category has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   category  The category that has been created.
 */
const created = ({ commit }, category) => {
  commit(types.CREATED, CategoryTransformer.fetch(category))
}

/**
 * Action fired when an category will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   category  The category that will be updated.
 */
const update = ({ commit }, category) => {
  const transformedCategory = CategoryTransformer.send(category)

  proxy.update(category.uuid, transformedCategory)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Category has been updated!'
      })

      Vue.router.push({
        name: 'category.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The category could not be updated'
      })
    })
}

/**
 * Action fired when an category has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   category  The category that has been updated.
 */
const updated = ({ commit }, category) => {
  commit(types.UPDATED, CategoryTransformer.fetch(category))
}

/**
 * Action fired when an category will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   categoryId  The category that will be destroyed.
 */
const destroy = ({ commit }, categoryId) => {
  proxy.destroy(categoryId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Category has been destroyed!'
      })

      Vue.router.push({
        name: 'category.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The category could not be destroyed'
      })
    })
}

/**
 * Action fired when an category has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   category  The category that has been destroyed.
 */
const destroyed = ({ commit }, category) => {
  commit(types.DESTROYED, CategoryTransformer.fetch(category))
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
