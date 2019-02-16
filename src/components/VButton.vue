<template>
  <b-card-footer footer-border-variant="primary">

    <b-button variant="primary" class="mr-1" type="submit" :disabled="$errors.busy">
      <i class="fa" :class="{'fa-paper-plane' : !$errors.busy }"></i>
      <b-spinner small type="grow" v-if="$errors.busy"/>
      {{ $errors.busy ? 'Saving...' : 'Submit' }}
    </b-button>

    <b-button type="reset" variant="danger" class="mr-1" :disabled="$errors.busy">
      <i class="fa fa-undo"></i> Reset
    </b-button>

    <b-button type="button" variant="warning" @click="goBack" :disabled="$errors.busy">
      <i class="fa fa-arrow-circle-left"></i> Back
    </b-button>

  </b-card-footer>
</template>

<script>
  export default {
    name: 'VButton',
    methods: {
      goBack () {
        this.$emit('click')
      }
    },
  }
</script>
