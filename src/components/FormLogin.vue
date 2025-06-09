<script setup lang="ts">
import Input from './Input.vue';
</script>

<template>
  <form class="w-full max-w-md flex flex-col gap-3">
    <Input placeholder="Insira seu e-mail"/>
    <Input placeholder="Sua senha" :is-password="true" />
    <div class="flex items-center justify-between mt-4">
      <label class="inline-flex items-center">
        <input type="checkbox" class="form-checkbox text-blue-600" />
        <span class="ml-2 text-gray-700">Lembrar-me</span>
      </label>
      <span class="text-red-600 hover:underline">Esqueci minha senha</span>
    </div>
    <button type="submit" class="bg-red-600 text-white px-4 py-2 h-11 rounded-md mt-4">
      Login
    </button>
  </form>
</template>
