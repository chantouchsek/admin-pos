<template>
  <div class="wrapper">
    <b-card header="Vue Loading Spinner">
      <b-row>
        <b-col cols="2" v-for="variant in variants" :key="variant" class="mb-1">
          <b-loading
            :key="variant"
            :variant="variant"
          >
            {{ variant }}
          </b-loading>
        </b-col>
      </b-row>
    </b-card>
    <b-card header="Cover Size Loading">
      <b-loading
        variant="RotateSquare2"
        cover
      >
        Loading
      </b-loading>
    </b-card>
  </div>
</template>

<script>
  import * as Spinner from 'vue-loading-spinner'
  import _ from 'lodash'

  export default {
    name: 'Loading',
    data () {
      return { variants: _.keys(Spinner) }
    },
  }
</script>
