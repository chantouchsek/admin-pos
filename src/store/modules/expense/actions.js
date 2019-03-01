/* ============
 * Expense Actions
 * ============
 *
 * The actions available for the expense module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/ExpenseProxy'
import ExpenseTransformer from '@/transformers/ExpenseTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all expenses will be fetched.
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
        expenses: ExpenseTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an expense will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   expense  The expense that will be created.
 */
const create = ({ commit }, expense) => {
  const transformedExpense = ExpenseTransformer.send(expense)

  proxy.create(transformedExpense)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Expense has been created!'
      })

      Vue.router.push({
        name: 'expense.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The expense could not be created'
      })
    })
}

/**
 * Action fired when an expense has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   expense  The expense that has been created.
 */
const created = ({ commit }, expense) => {
  commit(types.CREATED, ExpenseTransformer.fetch(expense))
}

/**
 * Action fired when an expense will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   expense  The expense that will be updated.
 */
const update = ({ commit }, expense) => {
  const transformedExpense = ExpenseTransformer.send(expense)

  proxy.update(expense.uuid, transformedExpense)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Expense has been updated!'
      })

      Vue.router.push({
        name: 'expense.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The expense could not be updated'
      })
    })
}

/**
 * Action fired when an expense has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   expense  The expense that has been updated.
 */
const updated = ({ commit }, expense) => {
  commit(types.UPDATED, ExpenseTransformer.fetch(expense))
}

/**
 * Action fired when an expense will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   expenseId  The expense that will be destroyed.
 */
const destroy = ({ commit }, expenseId) => {
  proxy.destroy(expenseId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Expense has been destroyed!'
      })

      Vue.router.push({
        name: 'expense.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The expense could not be destroyed'
      })
    })
}

/**
 * Action fired when an expense has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   expense  The expense that has been destroyed.
 */
const destroyed = ({ commit }, expense) => {
  commit(types.DESTROYED, ExpenseTransformer.fetch(expense))
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
