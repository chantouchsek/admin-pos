/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */
import Axios from 'axios'
import Vue from 'vue'
import store from '@/store'
import swal from 'sweetalert2'
import i18n from '@/plugins/i18n'

Axios.defaults.baseURL = process.env.VUE_APP_API_LOCATION;
Axios.defaults.headers.common.Accept = 'application/json';

// Request interceptor
Axios.interceptors.request.use(request => {

  const locale = store.getters['lang/locale']

  if (locale) {
    request.headers.common['Accept-Language'] = locale
  }

  // request.headers['X-Socket-Id'] = Echo.socketId()

  return request
})

// Response interceptor
Axios.interceptors.response.use(response => response, error => {
  const { status } = error.response
  if (status >= 500) {
    swal({
      type: 'error',
      title: i18n.t('error_alert_title'),
      text: i18n.t('error_alert_text'),
      reverseButtons: true,
      confirmButtonText: i18n.t('ok'),
      cancelButtonText: i18n.t('cancel')
    })
  }

  if (status === 401 && store.getters['auth/check']) {
    swal({
      type: 'warning',
      title: i18n.t('token_expired_alert_title'),
      text: i18n.t('token_expired_alert_text'),
      reverseButtons: true,
      confirmButtonText: i18n.t('ok'),
      cancelButtonText: i18n.t('cancel')
    }).then(() => {
      store.dispatch('auth/logout')
    })
  }

  return Promise.reject(error)
})

// Bind Axios to Vue.
Vue.$http = Axios;
Object.defineProperty(Vue.prototype, '$http', {
  get () {
    return Axios;
  }
})
