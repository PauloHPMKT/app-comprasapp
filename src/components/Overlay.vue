<script setup lang="ts">
const emit = defineEmits<{
  click: []
}>();

function handleOverlayClick(event: Event) {
  // Só emite o evento se o clique foi no próprio overlay, não em seus filhos
  if (event.target === event.currentTarget) {
    emit('click');
  }
}
</script>

<template>
  <div 
    class="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center"
    @click="handleOverlayClick"
  >
    <slot></slot>
  </div>
</template>
