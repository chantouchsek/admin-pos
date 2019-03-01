/* ============
 * GiftCard Actions
 * ============
 *
 * The actions available for the giftCard module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/GiftCardProxy'
import GiftCardTransformer from '@/transformers/GiftCardTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all giftCards will be fetched.
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
        giftCards: GiftCardTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an giftCard will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   giftCard  The giftCard that will be created.
 */
const create = ({ commit }, giftCard) => {
  const transformedGiftCard = GiftCardTransformer.send(giftCard)

  proxy.create(transformedGiftCard)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'GiftCard has been created!'
      })

      Vue.router.push({
        name: 'giftCard.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The giftCard could not be created'
      })
    })
}

/**
 * Action fired when an giftCard has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   giftCard  The giftCard that has been created.
 */
const created = ({ commit }, giftCard) => {
  commit(types.CREATED, GiftCardTransformer.fetch(giftCard))
}

/**
 * Action fired when an giftCard will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   giftCard  The giftCard that will be updated.
 */
const update = ({ commit }, giftCard) => {
  const transformedGiftCard = GiftCardTransformer.send(giftCard)

  proxy.update(giftCard.uuid, transformedGiftCard)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'GiftCard has been updated!'
      })

      Vue.router.push({
        name: 'giftCard.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The giftCard could not be updated'
      })
    })
}

/**
 * Action fired when an giftCard has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   giftCard  The giftCard that has been updated.
 */
const updated = ({ commit }, giftCard) => {
  commit(types.UPDATED, GiftCardTransformer.fetch(giftCard))
}

/**
 * Action fired when an giftCard will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   categoryId  The giftCard that will be destroyed.
 */
const destroy = ({ commit }, categoryId) => {
  proxy.destroy(categoryId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'GiftCard has been destroyed!'
      })

      Vue.router.push({
        name: 'giftCard.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The giftCard could not be destroyed'
      })
    })
}

/**
 * Action fired when an giftCard has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   giftCard  The giftCard that has been destroyed.
 */
const destroyed = ({ commit }, giftCard) => {
  commit(types.DESTROYED, GiftCardTransformer.fetch(giftCard))
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
