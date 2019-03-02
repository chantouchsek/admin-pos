import Vue from 'vue'

Vue.filter('cartSize', function (cart) {
  let cartSize = 0
  for (let i = 0; i < cart.length; i++) {
    cartSize += cart[i].qty
  }
  return cartSize
})
