<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
    modalValue: boolean
}>()
const emits = defineEmits(['close'])

function closeModal() {
  emits('close')
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 relative w-[95%] sm:w-[450px]">
    <Icon
      icon="material-symbols-light:close-small-rounded"
      @click="closeModal"
      class="absolute top-2 right-2 w-10 h-10 cursor-pointer"
    />
    <slot />
  </div>
</template>
