<template>
  <div class="main-wrapper">
    <div class="header"><h1>Vue Shopping Cart</h1></div>
    <div id="vue">
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
  </div>
</template>

<script>
  export default {
    name: "CartProducts",
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
<style lang="scss" scoped>
  @import url(https://fonts.googleapis.com/css?family=Bitter:400,400italic,700);

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Bitter", sans-serif;
  }

  $mobile: 600px;
  $max-width: 80em;

  @mixin aspect-ratio($width, $height) {
    position: relative;
    &:before {
      display: block;
      content: "";
      width: 100%;
      padding-top: ($height / $width) * 100%;
    }
    > .content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  @keyframes openUp {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
    }

    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  input {
    display: inline-block;
    appearance: none;
    padding: 0.5em;
    margin: 0.5em 0.5em 0.5em 0;
    width: 50px;
    background: white;
    border: 1px solid black;
    transition: all 0.1s;
    font-size: 14px;
  }

  label {
    font-size: 0.75em;
    margin-right: 0.5em;
  }

  .checkout-area table {
    margin: 0 auto;
    padding: 0.5em;
    width: 100%;
    max-width: $max-width * 0.5;
    text-align: left;

    th, td {
      padding: 0 0.25em;
    }

    @media(max-width: $mobile) {
      th:nth-child(3), td:nth-child(3) {
        display: none;
      }
    }
  }

  .align-left {
    text-align: left;
  }

  .align-center {
    text-align: center;
  }

  .align-right {
    text-align: right;
  }

  .vert-bottom {
    vertical-align: bottom;
  }

  .vert-middle {
    vertical-align: middle;
  }

  .main-wrapper {
    .header {
      position: relative;
      background: linear-gradient(to left, #16222A, #3A6073);
      background-size: cover;
      height: 25em;
      box-shadow: inset -1px -3px 5px rgba(0, 0, 0, 0.5), inset 1px 3px 5px rgba(0, 0, 0, 0.5);

      h1 {
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 3em;
        text-shadow: 1px 3px 5px rgba(0, 0, 0, 0.5), -1px -3px 5px rgba(0, 0, 0, 0.5);
      }
    }

    #vue {
      margin: 0 auto;
      padding: 0.5em;
      text-align: center;

      .cart {
        position: fixed;
        right: 2em;
        top: 9em;
        text-align: right;
        background: rgba(0, 0, 0, 0.85);
        color: white;
        z-index: 1;

        .fa-shopping-cart, .cart-size {
          cursor: pointer;
          font-size: 1.25em;
          user-select: none;
        }

        .fa-shopping-cart {
          padding: 1em 1em 1em 0;
        }

        .cart-size {
          padding: 1em 0 1em 1em;
        }


        .cart-items {
          padding: 0 1em 2em 1em;

          .cartTable {
            width: 20em;
          }

          .cartImage {
            width: 4em;
            height: 4em;
            margin: 0.5em auto;
            position: relative;
            cursor: pointer;

            &:after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.25);
              transition: all 0.1s;
            }

            i {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 1.5em;
              z-index: 1;
              transition: all 0.25s;
            }

            &:hover {
              i {
                text-shadow: 1px 2px 5px black;
              }

              &:after {
                background: rgba(0, 0, 0, 0.5);
              }
            }

            &:active {
              i {
                text-shadow: 0px 0px 1px black;
              }
            }
          }

          .cartSubTotal {
            border-top: 1px solid white;
            font-size: 1.25em;
          }

          .clearCart {
            float: left;
            margin-top: 2em;
            margin-bottom: 1.25em;
          }

          .checkoutCart {
            float: right;
            margin-top: 2em;
            margin-bottom: 1.25em;
          }
        }
      }

      .products {
        margin: 0 auto;
        width: 100%;
        max-width: $max-width;

        .product {
          display: inline-block;
          margin: 0.75em;
          width: 100%;
          max-width: 18em;

          .image {
            width: 18em;
            height: 18em;
            margin-bottom: 0.5em;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            transition: box-shadow 0.25s;

            @media(max-width: $mobile) {
              width: 100vw;
              height: 100vw;
            }

            &:before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
              opacity: 0;
              transition: all 0.25s;
            }

            &:after {
              content: "\f00e";
              font-family: "FontAwesome",sans-serif;
              position: absolute;
              top: 250%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 5em;
              color: white;
              pointer-events: none;
              text-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.5);
              transition: all 0.25s;
            }

            &:hover {
              box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);

              &:before {
                opacity: 1;
              }

              &:after {
                top: 50%;
              }
            }
          }

          .name {
            font-weight: bold;
            font-size: 1.25em;
          }

          .description {
            font-style: italic;
          }

          .price {
            font-weight: bold;
          }
        }
      }

      .modalWrapper {
        position: relative;

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          //cursor: pointer;
          z-index: 2;
        }

        .prevProduct, .nextProduct {
          position: fixed;
          color: white;
          font-size: 2em;
          cursor: pointer;
          top: 50%;
          transform: translateY(-50%);
          padding: 1em;
          user-select: none;
          z-index: 5;
        }

        .prevProduct {
          left: calc(50% - 9.5em);
        }

        .nextProduct {
          right: calc(50% - 9.5em);
        }

        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 2em;
          text-align: center;
          max-height: calc(100% - 2em);
          overflow-y: scroll;
          overflow-x: hidden;
          animation: openUp 0.1s;
          z-index: 3;
          backface-visibility: hidden;

          .close {
            position: fixed;
            top: -0.5em;
            right: -0.5em;
            cursor: pointer;
            padding: 1em;
          }

          .imageWrapper {
            width: 25em;
            height: 25em;
            margin: 0.5em auto;
            overflow: hidden;

            .image {
              width: 100%;
              height: 100%;
              transition: transform 0.2s;
              z-index: 4;
              cursor: crosshair;
            }
          }

          .additionalImages {
            display: flex;
            width: 100%;
            margin: 0 auto;
            text-align: center;

            .additionalImage {
              flex-grow: 1;
              margin: 0.5em 1em;
              position: relative;
              overflow: hidden;
              cursor: pointer;
              width: 25%;
              height: auto;
              @include aspect-ratio(16, 12);

              &:nth-of-type(1n) {
                margin-left: 0;
              }

              &:nth-of-type(4n) {
                margin-right: 0;
              }
            }
          }

          .name {
            font-weight: bold;
            font-size: 1.25em;
          }

          .description {
            font-style: italic;
          }

          .details {
            max-width: 25em;
            margin: 0 auto;
            padding: 0.5em 0;
          }

          .price {
            font-weight: bold;
            padding-bottom: 0.5em;
          }
        }
      }

      @media(max-width: $mobile) {
        .cart {
          &, & .cartTable {
            width: 100% !important;
          }
        }

        .products {
          text-align: left;

          .product {
            display: block;

            .image {
              width: calc(100vw - 2.5em);
              height: calc(100vw - 2.5em);
            }
          }
        }

        .modalWrapper {
          .prevProduct, .nextProduct {
            display: none;
          }

          .modal {
            &.checkout {
              width: 100%;
            }

            .imageWrapper {
              width: calc(100vw - 4em);
              height: calc(100vw - 4em);
            }
          }
        }
      }
    }
  }
</style>
