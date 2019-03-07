/* ============
 * Sale Actions
 * ============
 *
 * The actions available for the sale module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/SaleProxy'
import SaleTransformer from '@/transformers/SaleTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all sales will be fetched.
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
        sales: SaleTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an sale will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   sale  The sale that will be created.
 */
const create = ({ commit }, sale) => {
  const transformedSale = SaleTransformer.send(sale)

  proxy.create(transformedSale)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: sale.message
      })
      store.dispatch('sale/created', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The sale could not be created'
      })
    })
}

/**
 * Action fired when an sale has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   sale  The sale that has been created.
 */
const created = ({ commit }, sale) => {
  commit(types.CREATED, SaleTransformer.fetch(sale))
}

/**
 * Action fired when an sale will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   sale  The sale that will be updated.
 */
const update = ({ commit }, sale) => {
  const transformedSale = SaleTransformer.send(sale)

  proxy.update(sale.uuid, transformedSale)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: sale.message
      })
      store.dispatch('sale/updated', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The sale could not be updated'
      })
    })
}

/**
 * Action fired when an sale has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   sale  The sale that has been updated.
 */
const updated = ({ commit }, sale) => {
  commit(types.UPDATED, SaleTransformer.fetch(sale))
}

/**
 * Action fired when an sale will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   saleId  The sale that will be destroyed.
 */
const destroy = ({ commit }, saleId) => {
  proxy.destroy(saleId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Sale has been destroyed!'
      })

      Vue.router.push({
        name: 'sale.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The sale could not be destroyed'
      })
    })
}

/**
 * Action fired when an sale has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   sale  The sale that has been destroyed.
 */
const destroyed = ({ commit }, sale) => {
  commit(types.DESTROYED, SaleTransformer.fetch(sale))
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
