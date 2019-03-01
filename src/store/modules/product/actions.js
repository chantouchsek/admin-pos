/* ============
 * Product Actions
 * ============
 *
 * The actions available for the product module.
 */

import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/ProductProxy'
import ProductTransformer from '@/transformers/ProductTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'
import RevisionTransformer from '@/transformers/RevisionTransformer'
import Vue from 'vue'

const proxy = new Proxy()
/**
 * Action fired when all products will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const inStockAll = async ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  await proxy.inStocks()
    .then((response) => {
      const data = {
        products: ProductTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.IN_STOCK_ALL, data)
    })
}

/**
 * Action fired when all products will be fetched.
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
        products: ProductTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
    .catch(() => {
      const data = {
        empty: true
      }

      commit(types.FETCH_FAILED, data)
    })
}

/**
 * Action fired when all products will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const inStockReload = async ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  await proxy.inStocks()
    .then((response) => {
      const data = {
        products: ProductTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.IN_STOCK_RELOAD, data)
    })
    .catch(() => {
      const data = {
        empty: true
      }

      commit(types.FETCH_FAILED, data)
    })
}

/**
 * Action fired when an product will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   product  The product that will be created.
 */
const create = ({ commit }, product) => {
  const transformedProduct = ProductTransformer.send(product)

  proxy.create(transformedProduct)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message
      })
      store.dispatch('product/created', response.data)

      Vue.router.push({
        name: 'product.index'
      })

    })
    .catch((error) => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: error.message
      })
    })
}

/**
 * Action fired when an product has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   product  The product that has been created.
 */
const created = ({ commit }, product) => {
  commit(types.CREATED, ProductTransformer.fetch(product))
}

/**
 * Action fired when an product will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   product  The product that will be updated.
 */
const update = ({ commit }, product) => {
  const transformedProduct = ProductTransformer.send(product)

  proxy.update(product.uuid, transformedProduct)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message
      })
      store.dispatch('product/updated', response.data)

      Vue.router.push({
        name: 'product.index'
      })

    })
    .catch((error) => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: error.message
      })
    })
}

/**
 * Action fired when an product has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   product  The product that has been updated.
 */
const updated = ({ commit }, product) => {
  const productTransformer = ProductTransformer.fetch(product)
  const data = {
    product: productTransformer
  }
  commit(types.UPDATED, productTransformer)
  commit(types.DETAIL, data)
}

/**
 * Action fired when an product will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   product  The product that will be destroyed.
 */
const destroy = ({ commit }, product) => {
  proxy.destroy(product.uuid)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message
      })
      store.dispatch('product/destroyed', response.data)
    })
    .catch((error) => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: error.message
      })
    })
}

/**
 * Action fired when an product has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   product  The product that has been destroyed.
 */
const destroyed = ({ commit }, product) => {
  commit(types.DESTROYED, ProductTransformer.fetch(product))
}

/**
 * Action fired when a product will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {string} uuid     Callback to edit the parameters on the proxy.
 */
const detail = ({ commit }, uuid) => {
  proxy.find(uuid)
    .then((response) => {
      const data = {
        product: ProductTransformer.fetch(response)
      }
      commit(types.DETAIL, data)
    })
    .catch((error) => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: error.message
      })
      const data = {
        empty: true
      }

      commit(types.FETCH_FAILED, data)
    })
}

/**
 * Action fired when a product will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const search = ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  proxy.findBy().then((response) => {
    const data = {
      products: ProductTransformer.fetchCollection(response.data),
      pagination: PaginationTransformer.fetch(response.pagination)
    }
    commit(types.SEARCH, data)
  }).catch((error) => {
    store.dispatch('application/addAlert', {
      type: 'danger',
      message: error.message
    })
    const data = {
      empty: true
    }

    commit(types.FETCH_FAILED, data)
  })
}

/**
 * Action fired when all products will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const revision = async ({ commit }, fn = null) => {
  if (fn.length > 1) {
    if (typeof fn[1] === 'function') {
      fn[1](proxy)
    }
  }

  await proxy.revisions(fn[0])
    .then((response) => {
      const data = {
        revisions: RevisionTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.REVISION, data)
    })
}

/**
 * Action fired when all products will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const reloadRevision = async ({ commit }, fn = null) => {
  if (fn.length > 1) {
    if (typeof fn[1] === 'function') {
      fn[1](proxy)
    }
  }

  await proxy.revisions(fn[0])
    .then((response) => {
      const data = {
        revisions: RevisionTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.RELOAD_REVISION, data)
    })
    .catch(() => {
      const data = {
        empty: true
      }

      commit(types.FETCH_FAILED, data)
    })
}

/**
 * Action fired when a product will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   file  The product that will be created.
 */
const imports = ({ commit }, file) => {
  proxy.imports(file)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message
      })
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
  search,
  imports,
  detail,
  create,
  created,
  update,
  updated,
  destroy,
  revision,
  destroyed,
  inStockAll,
  inStockReload,
  reloadRevision
}
