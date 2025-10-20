<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './store/auth';
import ToastContainer from './components/ToastContainer.vue';
import CTALoginModal from './components/CTALoginModal.vue';

const authStore = useAuthStore();

onMounted(() => {
  authStore.initializeStore();
  // if (!authStore.isAuthenticated) {
  //   setTimeout(() => {
  //     open();
  //     alert(isOpen.value);
  //   }, 2000);
  // }

  /**
   * Ao clicar no botao de modo visitante deve abrir o modal de CTA de login
   * para incentivar o usuario a criar uma conta ou fazer login.
   */
})
</script>

<template>
  <RouterView />
  <ToastContainer />
  <CTALoginModal />
</template>
