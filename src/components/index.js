import Vue from 'vue'
import VButton from './VButton'
import Datepicker from 'vuejs-datepicker'
import { en } from 'vuejs-datepicker/dist/locale'
import BLoading from './BLoading'
import TextareaAutosize from './TextareaAutosize'
import DateTimePicker from './datetimepicker/Index'
import ImageCropper from './cropper'
import { VueEditor } from 'vue2-editor'
import MaskedInput from 'vue-text-mask'
import VueSelect from './cool-select'

let km = {
  dow: 7, // Sunday is the first day of the week
  hourTip: 'ជ្រើសម៉ោង', // tip of select hour
  minuteTip: 'ជ្រើសនាទី', // tip of select minute
  secondTip: 'ជ្រើសវិនាទី', // tip of select second
  yearSuffix: '', // suffix of head
  monthsHead: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'), // months of head
  months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'), // months of panel
  weeks: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'), // weeks,
  cancelTip: 'បោះបង់', // text for cancel button for daterange picker
  submitTip: 'រក្សាទុក' // text for submit button for daterange picker
};

// Components that are registered globally.

[
  VButton,
  BLoading,
  TextareaAutosize,
  ImageCropper,
  MaskedInput,
  VueSelect
].forEach(Component => {
  Vue.component(Component.name, Component)
})

Vue.component('VueEditor', VueEditor)

Vue.component('date-time-picker', {
  extends: DateTimePicker,
  props: {
    local: {
      type: Object,
      default: () => km
    }
  }
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
