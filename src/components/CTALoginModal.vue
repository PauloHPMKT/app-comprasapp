<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import ModalLayout from './ModalLayout.vue';
import MainButton from './MainButton.vue';

const router = useRouter();
const emit = defineEmits<{(e: 'close'): void}>();

function closeCTALoginModal() {
  emit('close');
}

function goToRegistrationPage() {
  router.push({ path: '/account', query: { action: 'register' } });
  closeCTALoginModal();
}

function goToLoginPage() {
  router.push({ path: '/account', query: { action: 'login' } });
  closeCTALoginModal();
}

</script>

<template>
  <ModalLayout
    @close="closeCTALoginModal"
    class="absolute bottom-0 left-1/2 -translate-x-1/2 mb-10"
  >
    <template #body>
      <div class="flex flex-col items-center justify-center p-6 gap-4">
        <div class="flex justify-center">
          <Icon icon="lineicons:cart-1" width="36" height="36" class="mr-2"/>
          <div class="flex justify-center w-[280px]">
            <h2 class="text-3xl font-bold text-center">
              Salve e acompanhe suas listas!
            </h2>
          </div>
        </div>
        <div class="flex flex-col gap-1 items-center">
          <p class="text-center text-gray-400">
            Crie uma conta gratuita e tenha acesso a:
          </p>
          <ul>
            <li class="flex items-center gap-2">
              <Icon icon="mdi:check" width="20" height="20" class="text-green-600"/>
              <span>Salvamento de listas</span>
            </li>
            <li class="flex items-center gap-2">
              <Icon icon="mdi:check" width="20" height="20" class="text-green-600"/>
              <span>Acesso em qualquer dispositivo</span>
            </li>
            <li class="flex items-center gap-2">
              <Icon icon="mdi:check" width="20" height="20" class="text-green-600"/>
              <span>Histórico de compras</span>
            </li>
            <li class="flex items-center gap-2">
              <Icon icon="mdi:check" width="20" height="20" class="text-green-600"/>
              <span>Compatilhamento com amigos</span>
            </li>
          </ul>
        </div>
        <div class="mt-2 w-full flex justify-center">
          <MainButton
            class="bg-red-500 text-white px-6 py-2 rounded-md"
            @click="goToRegistrationPage"
          >
            Criar minha conta
          </MainButton>
          <MainButton
            class="ml-4 bg-gray-200 text-gray-700 px-6 py-2 rounded-md"
            @click="goToLoginPage"
          >
            Entrar
          </MainButton>
        </div>
        <footer class="mt-4 text-center text-gray-500 text-sm">
          <p>Leva menos de 1 minuto e suas listas <br/>ficam salvas para sempre.</p>
        </footer>
      </div>
    </template>
  </ModalLayout>
</template>
