<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <transition name="fade">
    <RouterView></RouterView>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
