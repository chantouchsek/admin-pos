/* ============
 * Purchase Actions
 * ============
 *
 * The actions available for the purchase module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/PurchaseProxy'
import PurchaseTransformer from '@/transformers/PurchaseTransformer'
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
        categories: PurchaseTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an purchase will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   purchase  The purchase that will be created.
 */
const create = ({ commit }, purchase) => {
  const transformedPurchase = PurchaseTransformer.send(purchase)

  proxy.create(transformedPurchase)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Purchase has been created!'
      })

      Vue.router.push({
        name: 'purchase.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The purchase could not be created'
      })
    })
}

/**
 * Action fired when an purchase has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   purchase  The purchase that has been created.
 */
const created = ({ commit }, purchase) => {
  commit(types.CREATED, PurchaseTransformer.fetch(purchase))
}

/**
 * Action fired when an purchase will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   purchase  The purchase that will be updated.
 */
const update = ({ commit }, purchase) => {
  const transformedPurchase = PurchaseTransformer.send(purchase)

  proxy.update(purchase.uuid, transformedPurchase)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Purchase has been updated!'
      })

      Vue.router.push({
        name: 'purchase.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The purchase could not be updated'
      })
    })
}

/**
 * Action fired when an purchase has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   purchase  The purchase that has been updated.
 */
const updated = ({ commit }, purchase) => {
  commit(types.UPDATED, PurchaseTransformer.fetch(purchase))
}

/**
 * Action fired when an purchase will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   purchaseId  The purchase that will be destroyed.
 */
const destroy = ({ commit }, purchaseId) => {
  proxy.destroy(purchaseId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Purchase has been destroyed!'
      })

      Vue.router.push({
        name: 'purchase.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The purchase could not be destroyed'
      })
    })
}

/**
 * Action fired when an purchase has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   purchase  The purchase that has been destroyed.
 */
const destroyed = ({ commit }, purchase) => {
  commit(types.DESTROYED, PurchaseTransformer.fetch(purchase))
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
