<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import ToastContainer from './components/ToastContainer.vue';
import CTALoginModal from './components/CTALoginModal.vue';
import { useAuthStore } from './store/auth';
import { useAutomaticModalStore } from './store/automaticModal';

const router = useRouter();
const authStore = useAuthStore();
const automaticModal = useAutomaticModalStore();

const isLoggedIn = computed(() => {
  return authStore.isAuthenticated;
});

watch(
  () => router.currentRoute.value,
  (newRoute) => {
    const isCTAModalInStorage = localStorage.getItem('cta-modal-temporally-closed');
    if (newRoute.path === '/create-list' && !isCTAModalInStorage) {
      setTimeout(() => {
        automaticModal.open();
      }, 2000);
    }
  },
  { immediate: true }
);

function closeTemporallyModal() {
  if (automaticModal.isModalOpen) {
    localStorage.setItem('cta-modal-temporally-closed', 'true');
    automaticModal.close();
  }
}

onMounted(() => {
  authStore.initializeStore();
});
</script>

<template>
  <RouterView />
  <ToastContainer />
  <CTALoginModal
    v-if="automaticModal.isModalOpen && !isLoggedIn"
    @close="closeTemporallyModal"
  />
</template>
