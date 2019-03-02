<template>
  <div>
    <h1>Checkout Area</h1>"
    <div class="checkout-area">
      <span> {{ cart | cartSize }} </span><i class="fa fa-shopping-cart"></i>
      <table>
        <thead>
        <tr>
          <th class="align-center">SKU</th>
          <th>Name</th>
          <th>Description</th>
          <th class="align-right">Amount</th>
          <th class="align-right">Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product,index in cart" track-by="$index" :key="`product-${index}`">
          <td class="align-center">{{ product.sku }}</td>
          <td>{{ product.product }}</td>
          <td>{{ product.description }}</td>
          <td class="align-right">{{ cart[$index].quantity }}</td>
          <td class="align-right">{{ product.price | currency }}</td>
        </tr>
        <button @click="removeProduct(product)"> X</button>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td class="align-right">Subtotal:</td>
          <td class="align-right"><h4 v-if="cartSubTotal !== 0"> {{ cartSubTotal | currency }} </h4></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td class="align-right">Tax:</td>
          <td class="align-right"><h4 v-if="cartSubTotal !== 0"> {{ cartTotal - cartSubTotal | currency }} </h4></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td class="align-right vert-bottom">Total:</td>
          <td class="align-right vert-bottom"><h2 v-if="cartSubTotal !== 0"> {{ cartTotal | currency }} </h2></td>
        </tr>
        </tbody>
      </table>
      <button v-show="cartSubTotal" @click="checkoutModal()">Checkout</button>
    </div>
    <div class='modalWrapper' v-show='showModal'>
      <div class='overlay' @click='hideModal()'></div>
      <div class='modal checkout'>
        <i class='close fa fa-times' @click='hideModal()'></i>
        <h1>Checkout</h1>
        <div>We accept: <i class='fa fa-stripe'></i> <i class='fa fa-cc-visa'></i> <i class='fa fa-cc-mastercard'></i>
          <i class='fa fa-cc-amex'></i> <i class='fa fa-cc-discover'></i></div>
        <br>
        <h3> Subtotal: {{ cartSubTotal | currency }} </h3>
        <h3> Tax: {{ cartTotal - cartSubTotal | currency }} </h3>
        <h1> Total: {{ cartTotal | currency }}</h1>
        <br>
        <div>This is where our payment processor goes</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "checkoutArea",
    props: ['cart', 'cartSize', 'cartSubTotal', 'tax', 'cartTotal'],

    data: function () {
      return {
        showModal: false
      }
    },

    filters: {
      customPluralize: function (cart) {
        let newName;

        if (cart.quantity > 1) {
          newName = cart.product + "s";
          return newName;
        }

        return cart.product;
      },

      cartSize: function (cart) {
        let cartSize = 0;

        for (let i = 0; i < cart.length; i++) {
          cartSize += cart[i].quantity;
        }

        return cartSize;
      }
    },

    methods: {
      removeProduct: function (product) {
        this.cart.$remove(product);
        this.cartSubTotal = this.cartSubTotal - (product.price * product.quantity);
        this.cartTotal = this.cartSubTotal + (this.tax * this.cartSubTotal);

        if (this.cart.length <= 0) {
          this.checkoutBool = false;
        }
      },

      checkoutModal: function () {
        let self = this;
        self.showModal = true;

        console.log("CHECKOUT", self.cartTotal);

      },

      hideModal: function () {
        //hide modal and empty modal data
        let self = this;
        self.showModal = false;
      }
    },

    //intercept the checkout request broadcast
    //run our function
    events: {
      "checkoutRequest": function () {
        let self = this;
        self.checkoutModal();
      }
    }
  }
</script>
