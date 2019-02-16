/* ============
 * Application Mutations
 * ============
 *
 * The mutations available for the application module.
 */

import {
  ADD_ALERT,
  REMOVE_ALERT,
  COUNT_DOWN_CHANGED
} from './mutation-types'

export default {
  /**
   * Mutation which will add a new alert.
   *
   * @param {Object} state The current state of the store.
   * @param {Object} alert The newly added alert.
   */
  [ADD_ALERT] (state, alert) {
    state.alert = alert
    state.alert.dismissCountDown = 3
  },


  /**
   * Mutation which will remove a alert.
   *
   * @param {Object} state The current state of the store.
   * @param dismissCountDown
   */
  [COUNT_DOWN_CHANGED] (state, dismissCountDown) {
    state.alert.dismissCountDown = dismissCountDown
  },


  /**
   * Mutation which will remove a alert.
   *
   * @param {Object} state The current state of the store.
   */
  [REMOVE_ALERT] (state) {
    state.alert = {}
  }
}
