import Vue from 'vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'

let settings = {
  name: 'vue-perfect-scrollbar',
  options: {
    maxScrollbarLength: 60,
    wheelPropagation: true,
    suppressScrollX: true,
    minScrollbarLength: 30
  }
}

Vue.use(PerfectScrollbar, settings)
