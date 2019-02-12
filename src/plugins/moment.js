import Vue from 'vue'
import moment from 'moment'
import store from '@/store'

// Bind moment to Vue.
Vue.$moment = moment
moment.locale(store.getters['lang/locale'])
Object.defineProperty(Vue.prototype, '$moment', {
  get () {
    return moment
  }
})
