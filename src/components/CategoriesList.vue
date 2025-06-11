<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface CategoryProps {
  id: string | number;
  name: string;
  emoji: string;
  isSelected?: boolean;
  omitArrow?: boolean;
}

defineProps<CategoryProps>();
const emits = defineEmits(['select-category']);

function categorySelected(id: string | number) {
  emits('select-category', id);
}
</script>

<template>
  <li
    @click="categorySelected(id)"
    class="flex items-center justify-between bg-white shadow-md/3 rounded-lg p-3"
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
