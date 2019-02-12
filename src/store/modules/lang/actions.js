/* ============
 * Lang Actions
 * ============
 *
 * The actions available for the lang module.
 */

import * as types from './mutation-types'
import Cookies from 'js-cookie'
import moment from 'moment'

/**
 * Action which will set the locale.
 *
 * @param {function} commit Commit function to update the store.
 * @param locale
 */
export const setLocale = ({ commit }, { locale }) => {
  commit(types.SET_LOCALE, { locale })
  moment.updateLocale(locale, {})
  Cookies.set('locale', locale, { expires: 365 })
}

export default {
  setLocale
}
