<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
//import { useAuthStore } from '../../store/auth';

//const authStore = useAuthStore();

const isCardVisibble = ref(false);

//const user = computed(() => authStore.currentUser);

function toggleCardVisibility() {
  isCardVisibble.value = !isCardVisibble.value;
}

defineExpose({
  toggleCardVisibility
});
</script>

<template>
  <div
    v-if="isCardVisibble"
    class="w-[300px] sm:w-[380px] mx-auto pt-4 bg-[#fdfdfd] rounded-lg shadow-md absolute top-12 right-6 z-10"
  >
    <h3 class="font-semibold mb-4 px-4">Minha conta</h3>
    <div class="flex items-center gap-4 border-b border-gray-300 pb-6 px-4">
      <div class="w-[60px] h-[60px] bg-gray-700 rounded-full flex items-center justify-center">
        <span class="text-[22px] text-white">H</span>
      </div>
      <div class="flex-1">
        <h4 class="text-lg font-semibold">{{ "user.name" }}</h4>
        <p class="text-gray-500">
          {{ "user.email" }}
        </p>
      </div>
    </div>
    <ul>
      <li class="flex items-center gap-2 cursor-pointer py-4 px-4 hover:bg-gray-100 transition duration-200" @click="$router.push('/app/user/profile')">
        <Icon icon="octicon:gear-24" width="24" height="24" />
        <p>Configurações</p>
      </li>
      <li class="flex items-center gap-2 cursor-pointer py-4 px-4 hover:bg-gray-100 transition duration-200" @click="$router.push('/app/user/profile')">
        <Icon icon="mage:light-bulb" width="24" height="24" />
        <p>Sugerir melhorias</p>
      </li>
      <li
        class="flex items-center gap-2 cursor-pointer py-4 px-4 border-t border-gray-300 hover:bg-gray-100 transition duration-200"
        @click="$router.push('/app/user/profile')"
      >
        <Icon icon="mynaui:logout" width="24" height="24" />
        <p>Sair</p>
      </li>
    </ul>
  </div>
</template>
