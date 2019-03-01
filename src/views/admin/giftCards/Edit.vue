<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>GiftCard Edit </strong>
        <small>Form</small>
      </div>
      <b-form @submit="onSubmit"
              @reset="onReset"
              v-if="show"
              @keydown="$errors.onKeydown($event)"
      >
        <b-form-group label="Card Number:"
                      label-for="cardNumber"
                      :invalid-feedback="$errors.first('card_number')"
                      :state="!$errors.has('card_number')"
        >
          <b-input-group>
            <masked-input type="text"
                          name="card_number"
                          class="form-control"
                          :class="[$errors.has('card_number') ? 'is-invalid' : 'is-valid']"
                          v-model="form.cardNumber"
                          :mask="mask"
                          :guide="true"
                          placeholderChar="#"
            >
            </masked-input>
            <b-input-group-append @click="randomNumber">
              <b-button variant="outline-secondary"><i class="fa fa-cogs"></i></b-button>
            </b-input-group-append>
          </b-input-group>

        </b-form-group>

        <b-form-group label="Value:"
                      label-for="value"
                      :invalid-feedback="$errors.first('value')"
                      :state="!$errors.has('value')"
        >
          <b-form-input id="value"
                        type="number"
                        v-model="form.value"
                        :state="!$errors.has('value')"
                        step=".01"
                        placeholder="Enter value"
                        name="value"
          >
          </b-form-input>

        </b-form-group>

        <b-form-group label="Expiry Date:"
                      label-for="expiryDate"
                      :invalid-feedback="$errors.first('expiry_date')"
                      :state="!$errors.has('expiry_date')"
        >
          <date-time-picker v-model="form.expiryDate"
                            clearable
                            name="expiry_date"
                            format="DD-MM-YYYY HH:mm:ss"
          ></date-time-picker>

        </b-form-group>

        <b-form-group id="activeGroup"
                      label="Active:"
                      :invalid-feedback="$errors.first('active')"
                      :state="!$errors.has('active')"
        >
          <b-form-checkbox v-model="form.active"
                           switch
                           :state="!$errors.has('active')"
          >
            Active
          </b-form-checkbox>
        </b-form-group>

        <v-button @click="goBack"></v-button>

      </b-form>
    </b-card>
  </div>
</template>

<script>
  import GiftCardProxy from '@/proxies/GiftCardProxy'
  import GiftCardTransformer from '@/transformers/GiftCardTransformer'

  const proxy = new GiftCardProxy()

  export default {
    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given group identifier.
       */
      uuid: {
        type: [String, Number],
        required: true
      }
    },
    name: 'GiftCardEdit',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    data () {
      return {
        form: {
          name: '',
          description: '',
          active: true
        },
        show: true,
        mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
      }
    },
    mounted () {
      this.fetchGiftCard(this.uuid)
    },
    methods: {
      async onSubmit (evt) {
        evt.preventDefault()
        await this.$store.dispatch('giftCard/update', this.form)
      },
      onReset (evt) {
        evt.preventDefault();
        this.form.email = ''
        this.form.description = ''
        this.form.active = true
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      /**
       * Method used to fetch an giftCard.
       *
       * @param {groupId|{type, required}} id The id of the giftCard.
       */
      fetchGiftCard (id) {
        proxy.find(id)
          .then((data) => {
            this.form = GiftCardTransformer.fetch(data)
            this.show = true
          })
      },
      goBack () {
        this.$router.push({ name: 'giftCard.index' })
      },
      randomNumber () {
        let math = Math.floor(Math.random() * 1000)
        this.form.cardNumber = (math + 1234) + ' ' + (math + 4321) + ' ' + (math + 5678) + ' ' + (math + 1000)
      }
    },
    destroyed () {
      this.$errors.flush()
    }
  }
</script>
