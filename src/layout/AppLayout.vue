<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import Content from './Content.vue';
import ProfileCard from '../components/ProfileCard.vue';
import horizontalLogo from '../assets/img/comprasapp-horizontal-logo.png'
import { useAuthStore } from '../store/auth';
import { useLoadingStore } from '../store/loading';

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const router = useRouter();

const userProfileCard = ref<typeof ProfileCard | null>(null);

const isLoading = computed(() => loadingStore.isLoading);

const isLoggedIn = computed(() => {
  return authStore.isAuthenticated;
});

const currentUser = computed(() => {
  return authStore.$state?.currentUser;
});

const firstNameUpperLatter = computed(() => {
  return currentUser.value?.name?.charAt(0)?.toUpperCase() ?? '';
});

const username = computed(() => {
  return currentUser.value?.name ?? '';
});

function toCategories() {
  localStorage.removeItem('purchase-list-title');
  router.push('/app/categories')
}

function toggleProfileCard() {
  userProfileCard.value?.toggleCardVisibility();
}
</script>

<template>
  <!-- Esse header pode virar um componente -->
  <header class="flex justify-between items-center font-bold sm:px-32 py-3 px-3 border-b border-gray-100 bg-white">
    <div>
      <div
        v-if="isLoading"
        class="w-44 h-14 rounded-lg animate-pulse flex items-center justify-center" style="animation-duration: 1.5s;">
        <div class="w-full h-full bg-gray-200 rounded-lg"></div>
      </div>
      <div v-else class="bg-white p-2 w-36 sm:w-44">
        <img :src="horizontalLogo" alt="Logo Comprasapp horizonta" class="w-full" />
      </div>
    </div>
    <div
      v-if="isLoggedIn"
      class="flex items-center justify-center gap-4"
    >
      <div class="flex items-center gap-2 cursor-pointer relative" @click="toggleProfileCard">
        <span
          v-if="isLoggedIn"
          class="bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center text-white cursor-pointer">
          {{ firstNameUpperLatter }}
        </span>
        <strong class="hidden sm:block">{{ username }}</strong>
        <ProfileCard ref="userProfileCard" />
      </div>
    </div>
  </header>

  <div class="min-h-[90dvh] flex flex-col">
    <div class="w-full max-w-[1280px] mx-auto flex-1 flex flex-col">
      <div class="sm:mx-6 mx-0 flex-1 flex flex-col">
        <div class="flex shadow-sm/5 bg-white flex-1 pr-4 overflow-hidden">
          <div
            v-if="isLoggedIn"
            class="w-60 border-r-2 border-gray-100 bg-gray-50 pr-4 hidden sm:block"
          >
            <ul class="flex flex-col items-start justify-start p-4">
              <li class="flex items-center justify-between mb-4">
                <span class="text-gray-500">Minhas Listas</span>
              </li>
              <li @click="toCategories" class="flex items-center justify-between mb-4">
                <span class="text-gray-500">Categorias</span>
              </li>
            </ul>
          </div>
          <main class="w-full my-4 pl-4 flex max-h-[85dvh]">
            <Content />
          </main>
        </div>
      </div>
    </div>
    <div class="fixed bottom-6 right-4 bg-red-600 shadow-md/5 w-14 h-14 rounded-full flex items-center justify-center sm:hidden">
      <Icon icon="tabler:menu-4" width="32" height="32" class="text-white" />
    </div>
  </div>
</template>


