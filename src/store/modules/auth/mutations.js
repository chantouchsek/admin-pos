/* ============
 * Auth Mutations
 * ============
 *
 * The mutations available for the auth module.
 */

import Vue from 'vue'
import {
  CHECK,
  LOGIN,
  LOGOUT,
  SAVE_TOKEN,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS
} from './mutation-types'

export default {
  /**
   * Mutation to check if the user is authenticated.
   *
   * @param {Object} state The current state of the store.
   */
  [CHECK] (state) {
    state.authenticated = !!localStorage.getItem('access_token')
    if (state.authenticated) {
      Vue.$http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    }
  },

  /**
   * Mutation to log the user in.
   *
   * @param {Object} state       The current state of the store.
   * @param {String} accessToken The access token.
   */
  [LOGIN] (state, { accessToken }) {
    state.authenticated = true
    state.token = accessToken
    localStorage.setItem('access_token', accessToken)
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    Vue.$echo.connector.pusher.config.auth.headers['Authorization'] = `Bearer ${accessToken}`
  },

  /**
   * Mutation to log the user out.
   *
   * @param {Object} state The current state of the store.
   */
  [LOGOUT] (state) {
    state.authenticated = false
    state.user = null
    state.token = null
    localStorage.removeItem('access_token')
    Vue.$http.defaults.headers.common.Authorization = ''
    Vue.$echo.connector.pusher.config.auth.headers['Authorization'] = ''
  },

  /**
   * Mutation to save token to state
   * @param state
   * @param token
   */
  [SAVE_TOKEN] (state, { token }) {
    state.token = token
    // Cookies.set('token', token, { expires: remember ? 365 : null })
    localStorage.setItem('access_token', token)
  },

  /**
   * Mutation fetch user success
   * @param state
   * @param user
   */
  [FETCH_USER_SUCCESS] (state, { user }) {
    state.user = user
  },

  /**
   * Mutation fetch user failure
   * @param state
   */
  [FETCH_USER_FAILURE] (state) {
    state.token = null
    state.user = null
    state.authenticated = false
    localStorage.removeItem('access_token')
    Vue.$http.defaults.headers.common.Authorization = ''
    Vue.$echo.connector.pusher.config.auth.headers['Authorization'] = ''
  }
}
