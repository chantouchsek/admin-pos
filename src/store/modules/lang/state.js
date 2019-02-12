/* ============
 * Lang State
 * ============
 *
 * The state of the lang module.
 */

import Cookies from 'js-cookie'

const { locale, locales } = {
  'appName': 'POS System',
  'locale': 'en',
  'locales': { 'en': 'English', 'km': 'Khmer' }
}

export default {
  locale: Cookies.get('locale') || locale,
  locales: locales
}
