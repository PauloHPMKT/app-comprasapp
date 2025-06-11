<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import Input from './Input.vue';
import CategoriesList from './CategoriesList.vue';
import MainButton from './MainButton.vue';
import { useStyles } from '../composables/useStyles';

interface CategorySelectorProps {
  modelValue: { name: string; icon: string };
  categories: any[];
  isNotReponsiveMode?: boolean;
}

const { mergeStyles, attrs } = useStyles();
const props = defineProps<CategorySelectorProps>();
const emit = defineEmits(['update:modelValue', 'create-new-category']);

const isDropdownOpen = ref(false);

const renderCategoryPreview = computed(() => {
  if (props.modelValue.icon && props.modelValue.name) {
    // ver possibilidade de separar em uma composable
    const truncate = props.modelValue.name.length > 10
      ? props.modelValue.name.substring(0, 10) + '...'
      : props.modelValue.name;
    return `<p class="text-gray-800">${props.modelValue.icon} ${truncate}</p>`;
  }
  return `<p class="text-gray-400">😀 Categoria</p>`;
});

function handleSelectCategory(categoryId: number) {
  const selectedCategory = props.categories.find((c) => c.id === categoryId);
  if (selectedCategory) {
    emit("update:modelValue", {
      name: selectedCategory.name,
      icon: selectedCategory.emoji
    });
  }
  isDropdownOpen.value = false;
}

function handleCreateNewCategory() {
  emit("create-new-category");
}
</script>

<template>
  <div class="relative w-full">
    <div
      @click="isDropdownOpen = !isDropdownOpen"
      v-html="renderCategoryPreview"
      class="w-full h-11 border-2 border-gray-300 rounded-lg flex items-center pl-2 cursor-pointer"
    ></div>

    <div
      v-if="isDropdownOpen"
      v-bind="attrs"
      :class="mergeStyles(`absolute z-10 bg-white shadow-md rounded-lg mt-1 p-4 w-full`)"
    >
      <Input
        placeholder="Nome da categoria"
        class="w-full h-11 border-2"
        :has-icon="true"
      >
        <Icon
          icon="material-symbols:search-rounded"
          width="24"
          height="24"
          class="flex items-center w-10 text-gray-500 cursor-pointer"
        />
      </Input>
      <div class="max-h-48 overflow-y-auto mt-2">
        <CategoriesList
          v-for="category in categories"
          :key="category.id"
          :omit-arrow="true"
          v-bind="category"
          class="cursor-pointer"
          @select-category="handleSelectCategory"
        />
      </div>
      <MainButton
        v-if="isNotReponsiveMode"
        @click="handleCreateNewCategory"
        class="bg-red-600 h-11 w-full mt-3"
      >
        Criar Categoria
      </MainButton>
    </div>
  </div>
</template>
