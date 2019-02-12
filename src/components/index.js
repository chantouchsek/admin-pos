import Vue from 'vue'
import VButton from './VButton'
import Datepicker from 'vuejs-datepicker'
import { en } from 'vuejs-datepicker/dist/locale'
import BLoading from './BLoading'
import TextareaAutosize from './TextareaAutosize'

// Components that are registered globally.

[
  VButton,
  BLoading,
  TextareaAutosize
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
