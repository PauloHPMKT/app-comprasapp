<script setup lang="ts">
import { reactive } from 'vue';
import Input from './Input.vue';
import type { Account } from 'types/account';
import MainButton from './MainButton.vue';

const emit = defineEmits(['login']);

const loginData = reactive<Account.ToLogin>({
  email: '',
  password: '',
})

function handleLogin() {
  emit('login', loginData as Account.ToLogin);
}
</script>

<template>
  <form
    @submit.prevent="handleLogin"
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
      <span class="text-red-600 hover:underline">Esqueci minha senha</span>
    </div>
    <MainButton
      type="submit"
      class="bg-red-600 text-white px-4 py-2 h-11 rounded-md mt-4"
    >
      Login
    </MainButton>
  </form>
</template>
