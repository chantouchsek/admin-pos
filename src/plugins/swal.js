import Vue from 'vue'
import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

// Bind swal to Vue.
Vue.$swal = swal

Object.defineProperty(Vue.prototype, '$swal', {
  get () {
    return swal
  }
})
