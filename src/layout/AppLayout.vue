<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import Content from './Content.vue';
import ProfileCard from '../components/ProfileCard.vue';
import MainButton from '../components/MainButton.vue';
import Overlay from '../components/Overlay.vue';
import NavigationMenu from '../components/NavigationMenu.vue';
import { useAuthStore } from '../store/auth';
import { useLoadingStore } from '../store/loading';
import { useAutomaticModalStore } from '../store/automaticModal';
import { useCreateListTitleModalStore } from '../store/createListTitleModal';
import horizontalLogo from '../assets/img/comprasapp-horizontal-logo.png'

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const automaticModal = useAutomaticModalStore();
const createListTitleModal = useCreateListTitleModalStore();
const router = useRouter();

const userProfileCard = ref<typeof ProfileCard | null>(null);
const navigationMenu = ref<typeof NavigationMenu | null>(null);

const showMobileMenu = ref(false);

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

// function toCategories() {
//   localStorage.removeItem('purchase-list-title');
//   router.push('/app/categories')
// }

// function openCreateListModal() {
//   modalActions?.open();
// }

function toggleNavigationMenuMobile() {
  showMobileMenu.value = !showMobileMenu.value;
}

function closeNavigationMenuMobile() {
  showMobileMenu.value = false;
}

function handleCreateNewList() {
  createListTitleModal.openListTitleModal();
}

function toggleProfileCard() {
  userProfileCard.value?.toggleCardVisibility();
}

function openCTALoginModal() {
  automaticModal.open();
}

onMounted(async () => {
  loadingStore.startLoading();
  try {
    authStore.initializeStore();
    await new Promise(resolve => setTimeout(resolve, 1000));
  } finally {
    loadingStore.stopLoading();
  }
});
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
    <div v-else>
      <div
        v-if="isLoading"
        class="w-[160px] sm:w-[250px] h-14 sm:h-10 rounded-2xl animate-pulse flex items-center justify-center" style="animation-duration: 1.5s;">
        <div class="w-full h-full bg-gray-200 rounded-lg"></div>
      </div>
      <MainButton
        v-else
        @click="openCTALoginModal"
        class="flex text-gray-500 bg-gray-200 w-fit text-sm py-[8px] sm:py-2 px-4 rounded-2xl cursor-pointer items-center"
      >
        <Icon
          icon="fa7-regular:user"
          width="20"
          height="20"
          class="mr-3 sm:mb-0"
        />
        <span class="text-[14px]">modo visitante</span>
      </MainButton>
    </div>
  </header>

  <div class="min-h-[90dvh] flex flex-col">
    <div
      class="w-full flex-1 flex flex-col"
      :class="!isLoggedIn ? 'max-w-[1100px] mx-auto' : 'max-w-[1280px] mx-auto'"
    >
      <div class="sm:mx-6 mx-0 flex-1 flex flex-col">
        <div class="flex shadow-sm/5 bg-white flex-1 pr-4 overflow-hidden">
          <div
            v-if="isLoggedIn"
            class="w-60 border-r-2 border-gray-100 bg-gray-50 pr-4 hidden sm:block"
          >
            <nav class="py-4">
              <ul class="flex flex-col gap-2">
                <li
                  @click="router.push('/app/lists')"
                  class="flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors bg-gray-900 rounded-sm text-amber-50"
                  role="button"
                  tabindex="0"
                >
                  <Icon
                    icon="tabler:list"
                    width="18"
                    height="18"
                  />
                  <span>Minhas Listas</span>
                </li>

                <!-- <li
                  @click="toCategories"
                  :class="[
                    'flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors',
                    router.currentRoute.path === '/app/categories'
                      ? 'bg-white text-red-600 font-semibold shadow-sm rounded-md'
                      : 'text-gray-600 hover:bg-white hover:shadow rounded-md'
                  ]"
                  role="button"
                  tabindex="0"
                >
                  <Icon
                    icon="tabler:category"
                    width="18"
                    height="18"
                  />
                  <span>Categorias</span>
                </li> -->
              </ul>
            </nav>
          </div>
          <main class="w-full pl-4 flex max-h-[85dvh]">
            <Content />
          </main>
        </div>
      </div>
    </div>
    <div class="relative">
      <Overlay v-if="showMobileMenu" class="absolute z-20" @click="closeNavigationMenuMobile">
        <NavigationMenu
          ref="navigationMenu"
          :is-open="showMobileMenu"
          @close="closeNavigationMenuMobile"
          @create-new-list="handleCreateNewList"
        />
      </Overlay>
      <div
        class="fixed bottom-6 z-40 bg-red-600 shadow-md/5 w-14 h-14 rounded-full flex items-center justify-center sm:hidden border-2 border-white cursor-pointer transition-all duration-300 ease-in-out"
        :class="showMobileMenu ? 'right-[272px]' : 'right-4'"
        @click="toggleNavigationMenuMobile"
      >
        <Icon
          icon="solar:menu-dots-bold"
          class="text-white rotate-90"
          width="26"
          height="26"
        />
      </div>
    </div>
  </div>
</template>


