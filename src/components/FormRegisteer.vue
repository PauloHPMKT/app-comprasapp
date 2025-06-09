<script setup lang="ts">
import Input from './Input.vue';
</script>

<template>
  <form class="w-full max-w-md flex flex-col gap-3">
    <Input placeholder="Insira seu nome"/>
    <Input placeholder="Insira seu e-mail"/>
    <Input placeholder="Sua senha" :is-password="true" />
    <Input placeholder="Confirme sua senha" :is-password="true" />
    <button type="submit" class="bg-red-600 text-white px-4 py-2 h-11 rounded-md mt-4">
      Criar conta
    </button>
  </form>
</template>
