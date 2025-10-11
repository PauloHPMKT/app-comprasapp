<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './store/auth';
import ToastContainer from './components/ToastContainer.vue';

const authStore = useAuthStore();

onMounted(() => {
  authStore.initializeStore();
})
</script>

<template>
  <RouterView />
  <ToastContainer />
</template>
