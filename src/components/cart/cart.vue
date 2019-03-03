<template>
  <div class="cart-list">
    <div class="cart">
      <span class="cart-size" @click="showCart = !showCart"> {{ cart | cartSize }} </span>
      <i class="fa fa-shopping-cart" @click="showCart = !showCart"></i>
      <div class="cart-items" v-show="showCart">
        <table class="table cartTable">
          <tbody>
          <tr class="product" v-for="(product,index) in cart" :key="`cart-${index}`">
            <td class="align-left">
              <div class="cartImage" @click="removeProduct(product)"
                   :style="{ 'background-image': 'url(' + product.image + ')' }"
                   style="background-size: cover; background-position: center;">
                <i class="close fa fa-times"></i>
              </div>
            </td>
            <td class="align-center">
              <button @click="quantityChange(product, 'decrement')"><i class="close fa fa-minus"></i></button>
            </td>
            <td class="align-center">{{ cart[index].quantity }}</td>
            <td class="align-center">
              <button @click="quantityChange(product, 'increment')"><i class="close fa fa-plus"></i></button>
            </td>
            <td class="align-center">{{ cart[index] | customPluralize }}</td>
            <td>{{ product.price | currency }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <h4 class="cartSubTotal" v-show="showCart"> {{ cartSubTotal | currency }} </h4>
    </div>
    <button class="clearCart" v-show="checkoutBool" @click="clearCart()"> Clear Cart</button>
    <button class="checkoutCart" v-show="checkoutBool" @click="propagateCheckout()"> Checkout</button>
  </div>
</template>

<script>
  export default {
    name: 'cart',
    props: ['checkoutBool', 'cart', 'cartSize', 'cartSubTotal', 'tax', 'cartTotal'],
    data () {
      return {
        showCart: false
      }
    },
    filters: {
      customPluralize (cart) {
        let newName;
        if (cart.quantity > 1) {
          if (cart.product === "Peach") {
            newName = cart.product + "es";
          } else if (cart.product === "Puppy") {
            newName = cart.product + "ies";
            newName = newName.replace("y", "");
          } else {
            newName = cart.product + "s";
          }
          return newName;
        }
        return cart.product;
      },

      cartSize (cart) {
        let cartSize = 0;
        for (let i = 0; i < cart.length; i++) {
          cartSize += cart[i].quantity;
        }
        return cartSize;
      }
    },

    methods: {
      removeProduct (product) {
        this.cart.$remove(product);
        this.cartSubTotal = this.cartSubTotal - (product.price * product.quantity);
        this.cartTotal = this.cartSubTotal + (this.tax * this.cartSubTotal);
        if (this.cart.length <= 0) {
          this.checkoutBool = false;
        }
      },

      clearCart () {
        this.cart = [];
        this.cartSubTotal = 0;
        this.cartTotal = 0;
        this.checkoutBool = false;
        this.showCart = false;
      },

      quantityChange (product, direction) {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].sku === product.sku) {
            let newProduct = this.cart[i];
            if (direction === "increment") {
              newProduct.quantity = newProduct.quantity + 1;
              this.cart.$set(i, newProduct);
            } else {
              newProduct.quantity = newProduct.quantity - 1;
              if (newProduct.quantity === 0) {
                this.cart.$remove(newProduct);
              } else {
                this.cart.$set(i, newProduct);
              }
            }
          }
        }
        if (direction === "increment") {
          this.cartSubTotal = this.cartSubTotal + product.price;
        } else {
          this.cartSubTotal = this.cartSubTotal - product.price;
        }
        this.cartTotal = this.cartSubTotal + (this.tax * this.cartSubTotal);
        if (this.cart.length <= 0) {
          this.checkoutBool = false;
        }
      },
      //send our request up the chain, to our parent
      //our parent catches the event, and sends the request back down
      propagateCheckout () {
        this.$dispatch("checkoutRequest");
      }
    }
  }
</script>
