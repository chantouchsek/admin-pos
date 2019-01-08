import Vue from 'vue'
import VButton from '@/components/VButton'
import Datepicker from 'vuejs-datepicker'
import { en } from 'vuejs-datepicker/dist/locale'

// Components that are registered globally.

[
  VButton
].forEach(Component => {
  Vue.component(Component.name, Component)
})

Vue.component('b-datepicker', {
  extends: Datepicker,
  props: {
    bootstrapStyling: {
      type: Boolean,
      default: true
    },
    language: {
      type: Object,
      default: () => en
    }
  }
})
