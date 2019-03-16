import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes',
    'left=0',
    'top=0',
    'toolbar=0',
    'status=0'
  ],
  styles: [
    '//unpkg.com/bootstrap/dist/css/bootstrap.min.css',
    '//unpkg.com/kidlat-css/css/kidlat.css',
    '//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css'
  ]
}

Vue.use(VueHtmlToPaper, options)
