<template>
  <div class="main-wrapper">
    <div class="header"><h1>Vue Shopping Cart</h1></div>
    <cart :cart="cart"
          :cart-sub-total="cartSubTotal"
          :tax="tax"
          :cart-total="cartTotal"
          :checkout-bool="checkoutBool"
    ></cart>
    <products :cart="cart"
              :cart-sub-total="cartSubTotal"
              :tax="tax"
              :cart-total="cartTotal"
              :products-data="productsData"
    ></products>
    <checkout-area v-if="checkoutBool"
                   :cart="cart"
                   :tax="tax"
                   :cart-sub-total="cartSubTotal"
                   :cart-total="cartTotal"
                   :products-data="productsData"
                   :total-with-tax="totalWithTax"
    ></checkout-area>
  </div>
</template>

<script>
  export default {
    name: "Cart",
    data () {
      return {
        productsData: [
          {
            sku: 1,
            product: "Monkey",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/chimpanzee.jpg",
            images: [
              { image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/chimpanzee.jpg" },
              { image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/gorilla.jpg" },
              { image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/red-monkey.jpg" },
              { image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/mandrill-monkey.jpg" }
            ],
            description: "This is a monkey",
            details: "This is where some detailes on monkies would go. This monkey done seent some shit.",
            price: 5.50
          },

          {
            sku: 2,
            product: "Kitten",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/kittens.jpg",
            description: "This is a kitten",
            details: "This is where some detailes on kittens would go. Shout out kittens for being adorable.",
            price: 10
          },

          {
            sku: 3,
            product: "Shark",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/shark.jpg",
            description: "This is a shark",
            details: "This is where some detailes on sharks would go. Damn nature, you scary.",
            price: 15
          },

          {
            sku: 4,
            product: "Puppy",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/dog.jpg",
            description: "This is a puppy",
            details: "This is where some detailes on puppies would go. Shout out puppies for being adorable.",
            price: 5
          },

          {
            sku: 5,
            product: "Apple",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/apple.jpg",
            description: "This is an apple",
            details: "This is where some detailes on apples would go. Shout out apples for being delicious.",
            price: 1
          },

          {
            sku: 6,
            product: "Orange",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/orange.jpg",
            description: "This is an orange",
            details: "This is where some detailes on oranges would go. Shout out oranges for being delicious.",
            price: 1.1
          },

          {
            sku: 7,
            product: "Peach",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/peach.jpg",
            description: "This is a peach",
            details: "This is where some detailes on peaches would go. Shout out peaches for being delicious.",
            price: 1.5
          },

          {
            sku: 8,
            product: "Mango",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/mango.png",
            description: "This is a mango",
            details: "This is where some detailes on mangos would go. Shout out mangos for being delicious.",
            price: 2
          },

          {
            sku: 9,
            product: "Cognac",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/cognac.jpg",
            description: "This is a glass of cognac",
            details: "This is where some detailes on cognac would go. I'm like hey whats up, hello.",
            price: 17.38
          },

          {
            sku: 10,
            product: "Chain",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/chain.jpg",
            description: "This is a chain",
            details: "This is where some details on chains would go. 2Chainz but I got me a few on.",
            price: 17.38
          }
        ],
        checkoutBool: false,
        cart: [],
        cartSubTotal: 0,
        tax: 0.065,
        cartTotal: 0,
        totalWithTax: 0
      }
    },
    //intercept the checkout request dispatch
    //send it back down the chain
    events: {
      "checkoutRequest": function () {
        this.$broadcast("checkoutRequest");
      }
    }
  }
</script>

