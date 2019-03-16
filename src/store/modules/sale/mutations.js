/* ============
 * Sale Mutations
 * ============
 *
 * The mutations available for the sale module.
 */

import store from '@/store'
import {
  ALL,
  CREATED,
  UPDATED,
  DESTROYED,
  CLEAR_CART,
  QTY_CHANGED,
  ADD_TO_CART,
  REMOVE_PRODUCT,
  SHOW
} from './mutation-types'

export default {
  /**
   * Mutation to update the store with the fetched sales.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  sales    The fetched sales.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { sales, pagination }) {
    state.all = sales
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an sale has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} sale  The sale that has been created.
   */
  [CREATED] (state, sale) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(sale)
    }
  },

  /**
   * Mutation to respond to the action when an sale has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} sale The sale that has been updated.
   */
  [UPDATED] (state, sale) {
    state.all = state.all.map((item) => {
      if (item.id === sale.id) {
        return sale
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an sale has been destroyed.
   *
   * @param {Object} state The current state of the store.
   */
  [DESTROYED] (state) {
    const {
      currentPage,
      totalCount,
      limit,
      totalPages
    } = state.pagination

    let page = currentPage

    // Check if the sale is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('sale/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  },

  /**
   * Mutation to respond to the action when product added to cart.
   *
   * @param {Object} state The current state of the store.
   * @param {Object} product The Product get from product list
   */
  [ADD_TO_CART] (state, { product }) {
    let found = false
    for (let i = 0; i < state.cart.products.length; i++) {
      if (state.cart.products[i].id === product.id) {
        let newProduct = state.cart.products[i]
        newProduct.qty = newProduct.qty + 1
        found = true
        break
      }
    }
    if (!found) {
      state.cart.products.push({
        id: product.id,
        qty: 1,
        price: product.price,
        name: product.name,
        sku: product.sku,
        file: product.file
      })
    }
    state.cart.grandTotal = state.cart.grandTotal + product.price
    state.cart.total = state.cart.grandTotal + (state.cart.tax * state.cart.grandTotal)
    state.checkoutBool = true
  },
  [REMOVE_PRODUCT] (state, { product, index }) {
    state.cart.products.splice(index, 1)
    state.cart.grandTotal = state.cart.grandTotal - (product.price * product.qty)
    state.cart.total = state.cart.grandTotal + (state.cart.tax * state.cart.grandTotal)
    if (state.cart.products.length < 1) {
      state.checkoutBool = false
    }
  },
  [CLEAR_CART] (state) {
    state.cart.products = []
    state.cart.grandTotal = 0
    state.cart.total = 0
    state.checkoutBool = false
  },
  [QTY_CHANGED] (state, { product, direction, index }) {
    for (let i = 0; i < state.cart.products.length; i++) {
      if (state.cart.products[i].id === product.id) {
        let newProduct = state.cart.products[i]
        if (direction === "increment") {
          newProduct.qty = parseInt(newProduct.qty) + 1
          // state.cart.products.$set(i, newProduct)
        } else {
          newProduct.qty = parseInt(newProduct.qty) - 1
          if (parseInt(newProduct.qty) === 0) {
            state.cart.products.splice(index, 1)
          } else {
            // state.cart.products.$set(i, newProduct)
          }
        }
      }
    }
    if (direction === "increment") {
      state.cart.grandTotal = state.cart.grandTotal + parseFloat(product.price)
    } else {
      state.cart.grandTotal = state.cart.grandTotal - parseFloat(product.price)
    }
    state.cart.total = state.cart.grandTotal + (state.cart.tax * state.cart.grandTotal)
    if (state.cart.products.length <= 0) {
      state.checkoutBool = false
    }
  },
  [SHOW] (state, sale) {
    state.show = sale
  }
}
