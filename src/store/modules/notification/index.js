/* ============
 * Notification Module
 * ============
 */

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
}
