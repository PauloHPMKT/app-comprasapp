<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface CategoryProps {
  id?: string | number;
  name: string;
  emoji: string;
  color?: string;
  isSelected?: boolean;
  omitArrow?: boolean;
}

defineProps<CategoryProps>();
const emits = defineEmits(['select-category']);

function categorySelected(id?: string | number) {
  emits('select-category', id);
}
</script>

<template>
  <li
    @click="categorySelected(id)"
    class="flex items-center justify-between bg-white shadow-md/3 py-3 px-4"
    :style="{ borderLeftColor: color || '#CCCCCC', borderLeftWidth: '6px', borderLeftStyle: 'solid' }"
  >
    <div class="flex items-center gap-2">
      <span class="text-2xl">{{ emoji }}</span>
      <p class="text-gray-800 font-bold">{{ name }}</p>
    </div>
    <Icon
      v-if="!omitArrow"
      icon="mdi:chevron-right"
      width="24"
      height="24"
      class="text-gray-500 cursor-pointer"
    />
  </li>
</template>
