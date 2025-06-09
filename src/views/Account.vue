<script setup lang="ts">
import { computed, ref } from 'vue';
import FormLogin from '../components/FormLogin.vue';
import FormRegisteer from '../components/FormRegisteer.vue';
import verticalLogo from '@/assets/img/Logo-vertical.png';

const showFormLogin = ref(true);

const greetingTitle = computed(() =>
  showFormLogin.value ? 'Bem-vindo de volta!' : 'Crie sua conta!'
);

const greetingMessage = computed(() =>
  showFormLogin.value
    ? 'Acesse sua conta para continuar organizando suas compras'
    : 'Preencha os campos abaixo para criar sua conta e começar a organizar suas compras.'
);

const ctaAccount = computed(() =>
  showFormLogin.value ? 'Não tem uma conta?' : 'Já tem uma conta?'
);

function toggleForm() {
  showFormLogin.value = !showFormLogin.value;
};
</script>

<template>
  <div class="flex justify-center items-center h-screen w-full">
    <div class="w-[90%] flex justify-center items-center">
      <div class="flex flex-col items-center justify-center w-full max-w-md">
        <div class="w-28 h-22 p-4 bg-white flex justify-center items-center rounded-lg shadow-sm/5">
          <img :src="verticalLogo" alt="Logo principal vertical" class="w-full" />
        </div>

        <div class="w-full mt-8 flex flex-col items-center justify-center">
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">{{ greetingTitle }}</h1>
            <p class="text-gray-600 mt-2">{{ greetingMessage }}</p>
          </div>
          <div class="w-full">
            <transition name="fade" mode="out-in">
              <FormLogin v-if="showFormLogin" />
              <FormRegisteer v-else />
            </transition>
            <div>
              <p class="text-gray-600 mt-4 text-center" @click="toggleForm">
                {{ ctaAccount }}
              <span class="text-red-600 hover:underline cursor-pointer">
                {{ showFormLogin ? 'Crie uma agora' : 'Entrar' }}
              </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
