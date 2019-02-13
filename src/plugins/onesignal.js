import Vue from 'vue'

let OneSignal = window.OneSignal || []
OneSignal.push(() => {
  OneSignal.init({
    appId: "5d24bf8d-eb5b-4240-ba0f-4facb4854c14"
  })
})

// Bind OneSignal to Vue.
Vue.$OneSignal = OneSignal
Object.defineProperty(Vue.prototype, '$OneSignal', {
  get () {
    return OneSignal
  }
})
