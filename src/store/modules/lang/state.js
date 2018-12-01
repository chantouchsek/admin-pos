/* ============
 * Lang State
 * ============
 *
 * The state of the lang module.
 */

import Cookies from 'js-cookie'

const { locale, locales } = {
  "appName": "Point Of Sales",
  "locale": "en",
  "locales": { "en": "EN", "kh": "KH" }
}

export default {
  locale: Cookies.get('locale') || locale,
  locales: locales
}
