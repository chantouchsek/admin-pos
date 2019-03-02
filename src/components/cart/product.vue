<template>
  <div>
    <h1>Products</h1>
    <div class='products'>
      <div v-for='(product,index) in productsData' track-by='$index' :key="`product-${index}`">
        <div class='image' @click='viewProduct(product)' :style='{ backgroundImage: url(  product.image  ) }'
             style='background-size: cover; background-position: center;'></div>
        <div class='name'>{{ product.product }}</div>
        <div class='description'>{{ product.description }}</div>
        <div class='price'>{{ product.price | currency }}</div>
        <button @click='addToCart(product)'>Add to Cart</button>
        <br><br>
      </div>
    </div>
    <div class='modalWrapper' v-show='showModal'>
      <div class='prevProduct' @click='changeProductInModal("prev")'><i class='fa fa-angle-left'></i></div>
      <div class='nextProduct' @click='changeProductInModal("next")'><i class='fa fa-angle-right'></i></div>
      <div class='overlay' @click='hideModal()'></div>
      <div class='modal'>
        <i class='close fa fa-times' @click='hideModal()'></i>
        <div class='imageWrapper'>
          <div class='image' :style='{ backgroundImage: url(modalData.image) }'
               style='background-size: cover; background-position: center;' v-on:mouseover='imageMouseOver($event)'
               v-on:mousemove='imageMouseMove($event)' v-on:mouseout='imageMouseOut($event)'></div>
        </div>
        <div class='additionalImages' v-if='modalData.images'>
          <div v-for='(image,index) in modalData.images' class='additionalImage' :key="`image-${index}`"
               :style='{ backgroundImage: url(  image.image  ) }'
               style='background-size: cover; background-position: center;' @click='changeImage(image.image)'></div>
        </div>
        <div class='name'>{{ modalData.product }}</div>
        <div class='description'>{{ modalData.description }}</div>
        <div class='details'>{{ modalData.details }}</div>
        <h3 class='price'>{{ modalData.price | currency }}</h3>
        <label for='modalAmount'>QTY</label>
        <input id='modalAmount' v-model='modalAmount' class='amount'
               @keyup.enter='modalAddToCart(modalData)'/>
        <button @click='modalAddToCart(modalData)'>Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'products',
    props: ['productsData', 'cart', 'tax', 'cartSubTotal', 'cartTotal'],
    data () {
      return {
        showModal: false,
        modalData: {},
        modalAmount: 1,
        timeout: "",
        mousestop: ""
      }
    },

    methods: {
      addToCart (product) {
        let found = false;

        for (let i = 0; i < this.cart.length; i++) {

          if (this.cart[i].sku === product.sku) {
            let newProduct = this.cart[i];
            newProduct.quantity = newProduct.quantity + 1;
            // this.cart.$set(i, newProduct);
            //console.log("DUPLICATE",  this.cart[i].product + "'s quantity is now: " + this.cart[i].quantity);
            found = true;
            break;
          }
        }

        if (!found) {
          product.quantity = 1;
          this.cart.push(product);
        }

        this.cartSubTotal = this.cartSubTotal + product.price;
        this.cartTotal = this.cartSubTotal + (this.tax * this.cartSubTotal);
        this.checkoutBool = true;
      },

      modalAddToCart (modalData) {
        let self = this;

        for (let i = 0; i < self.modalAmount; i++) {
          self.addToCart(modalData);
        }

        self.modalAmount = 1;
      },

      viewProduct (product) {
        let self = this;
        //self.modalData = product;
        self.modalData = (JSON.parse(JSON.stringify(product)));
        self.showModal = true;
      },

      changeProductInModal (direction) {
        let self = this,
          productsLength = this.productsData.length,
          currentProduct = self.modalData.sku,
          newProductId;

        if (direction === "next") {
          newProductId = currentProduct + 1;

          if (currentProduct >= productsLength) {
            newProductId = 1;
          }

        } else if (direction === "prev") {
          newProductId = currentProduct - 1;

          if (newProductId === 0) {
            newProductId = productsLength;
          }
        }

        //console.log(direction, newProductId);

        for (let i = 0; i < productsLength; i++) {
          if (this.productsData[i].sku === newProductId) {
            self.viewProduct(this.productsData[i]);
          }
        }
      },

      hideModal () {
        //hide modal and empty modal data
        let self = this;
        self.modalData = {};
        self.showModal = false;
      },

      changeImage (image) {
        let self = this;
        self.modalData.image = image;
      },

      imageMouseOver (event) {
        event.target.style.transform = "scale(2)";
      },

      imageMouseMove (event) {
        let self = this;

        event.target.style.transform = "scale(2)";

        self.timeout = setTimeout(function () {
          event.target.style.transformOrigin = ((event.pageX - event.target.getBoundingClientRect().left) / event.target.getBoundingClientRect().width) * 100 + '% ' + ((event.pageY - event.target.getBoundingClientRect().top - window.pageYOffset) / event.target.getBoundingClientRect().height) * 100 + "%";
        }, 50);

        self.mouseStop = setTimeout(function () {
          event.target.style.transformOrigin = ((event.pageX - event.target.getBoundingClientRect().left) / event.target.getBoundingClientRect().width) * 100 + '% ' + ((event.pageY - event.target.getBoundingClientRect().top - window.pageYOffset) / event.target.getBoundingClientRect().height) * 100 + "%";
        }, 100);
      },

      imageMouseOut (event) {
        event.target.style.transform = "scale(1)";
      }
    },
    mounted () {
      let self = this;
      document.addEventListener('keydown', function (e) {
        if (self.showModal && e.keyCode === 37) {
          self.changeProductInModal('prev');
        } else if (self.showModal && e.keyCode === 39) {
          self.changeProductInModal('next');
        } else if (self.showModal && e.keyCode === 27) {
          self.hideModal();
        }
      });
    }
  }
</script>

