<template>
  <div class="main-layout">
    <transition name="page" mode="out-in">
      <slot>
        <router-view />
      </slot>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "DefaultLayout"
  }
</script>
