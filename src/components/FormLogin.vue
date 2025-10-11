<script setup lang="ts">
import Input from './Input.vue';
import MainButton from './MainButton.vue';
import { useAuth } from '../composables/useAuth';

const { loginData, onLogin } = useAuth();

</script>

<template>
  <form
    @submit.prevent="onLogin(loginData)"
    class="w-full max-w-md flex flex-col gap-3"
  >
    <Input
      v-model="loginData.email"
      placeholder="Insira seu e-mail"
      class="border-2"
    />
    <Input
      v-model="loginData.password"
      placeholder="Sua senha"
      :is-password="true"
      class="border-2"
    />
    <div class="flex items-center justify-between mt-4">
      <label class="inline-flex items-center">
        <input type="checkbox" class="form-checkbox text-blue-600" />
        <span class="ml-2 text-gray-700">Lembrar-me</span>
      </label>
      <span class="text-red-500 hover:underline">Esqueci minha senha</span>
    </div>
    <MainButton
      type="submit"
      class="bg-red-500 text-white px-4 py-2 h-11 rounded-md mt-4"
    >
      Entrar
    </MainButton>
  </form>
</template>
