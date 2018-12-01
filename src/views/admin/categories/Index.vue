<template>
  <div class="animated fadeIn">
    <b-card header-tag="header">
      <div slot="header">
        <i class="icon-drop"></i> Categories
      </div>
      <b-card-body>
        <b-row>
          <color-theme color="bg-primary">
            <h6>Brand Primary Color</h6>
          </color-theme>
          <color-theme color="bg-secondary"><h6>Brand Secondary Color</h6></color-theme>
          <color-theme color="bg-success"><h6>Brand Success Color</h6></color-theme>
          <color-theme color="bg-danger"><h6>Brand Danger Color</h6></color-theme>
          <color-theme color="bg-warning"><h6>Brand Warning Color</h6></color-theme>
          <color-theme color="bg-info"><h6>Brand Info Color</h6></color-theme>
          <color-theme color="bg-light"><h6>Brand Light Color</h6></color-theme>
          <color-theme color="bg-dark"><h6>Brand Dark Color</h6></color-theme>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import ColorTheme from '@/views/theme/ColorTheme'

  export default {
    name: 'categories-index',
    components: { ColorTheme }
  }
</script>
