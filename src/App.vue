<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './store/auth';

const authStore = useAuthStore();

onMounted(() => {
  authStore.initializeStore();
})
</script>

<template>
  <RouterView />
</template>
