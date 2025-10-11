<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useStyles } from '../composables/useStyles';

const emits = defineEmits(['close']);
const { mergeStyles } = useStyles();

function handleClose() {
  emits('close');
}
</script>

<template>
  <div
    :class="mergeStyles('bg-white rounded-sm shadow-md p-4 relative w-[95%] sm:w-[450px]')"
  >
    <Icon
      icon="material-symbols-light:close-small-rounded"
      @click="handleClose"
      class="absolute top-2 right-2 w-10 h-10 cursor-pointer"
    />
    <slot name="body"></slot>
  </div>
</template>
