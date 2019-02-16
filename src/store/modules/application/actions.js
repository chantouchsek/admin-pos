/* ============
 * Application Actions
 * ============
 *
 * The actions available for the Application module.
 */
import * as types from './mutation-types'

/**
 * Action fired to add a new alert.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   payload The payload.
 */
const countDownChanged = ({ commit }, payload) => {
  commit(types.COUNT_DOWN_CHANGED, payload)
}

/**
 * Action fired to add a new alert.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   payload The payload.
 */
const addAlert = ({ commit }, payload) => {
  commit(types.ADD_ALERT, payload)
}

/**
 * Action fired to remove an alert.
 *
 * @param {function} commit  Commit function to update the store.
 */
const removeAlert = ({ commit }) => {
  commit(types.REMOVE_ALERT)
}

export default {
  addAlert,
  removeAlert,
  countDownChanged
}
