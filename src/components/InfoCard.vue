<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  infoCategory?: 'info' | 'warning' | 'error' | 'success';
}

const props = defineProps<Props>();

const borderColorClass = computed(() => {
  const colorMap = {
  info: 'border-l-[#3498db]',
  warning: 'border-l-[#f1c40f]',
  error: 'border-l-[#e74c3c]',
  success: 'border-l-[#2ecc71]',
} as const;
  return colorMap[props.infoCategory ?? 'info'];
});

</script>

<template>
  <div
    class="w-full flex items-center p-2 rounded border-l-6 bg-gray-200"
    :class="borderColorClass"
  >
    <span class="text-gray-700 text-[14px] leading-5">
      <slot></slot>
    </span>
  </div>
</template>
