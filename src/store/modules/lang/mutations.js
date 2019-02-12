/* ============
 * Locale Mutations
 * ============
 *
 * The mutations available for the locale module.
 */

import {
  SET_LOCALE
} from './mutation-types'

export default {
  /**
   * Mutation to set the locale.
   *
   * @param {Object} state The current state of the store.
   * @param locale
   */
  [SET_LOCALE] (state, { locale }) {
    state.locale = locale
  }
}
