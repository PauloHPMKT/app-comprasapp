<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import Input from './Input.vue';
import CategoriesList from './CategoriesList.vue';
import MainButton from './MainButton.vue';
import { useStyles } from '../composables/useStyles';
import { useCategories } from '../composables/useCategories';

interface CategorySelectorProps {
  modelValue: { id?: string | number; name: string; emoji: string, color?: string };
  isNotReponsiveMode?: boolean;
}

const { mergeStyles, attrs } = useStyles();
const { categories } = useCategories();
const props = defineProps<CategorySelectorProps>();
const emit = defineEmits(['update:modelValue', 'create-new-category']);

const isDropdownOpen = ref(false);

const renderCategoryPreview = computed(() => {
  if (props.modelValue.name && props.modelValue.emoji) {
    const truncate = props.modelValue.name.length > 10
      ? props.modelValue.name.substring(0, 10) + '...'
      : props.modelValue.name;
    return `${props.modelValue.emoji} ${truncate}`;
  }
  return '😀 Categoria';
});

function handleSelectCategory(categoryId: string | number) {
  const selectedCategory = categories.find((category) => category.id === categoryId);
  if (selectedCategory) {
    const category = {
      id: selectedCategory.id,
      name: selectedCategory.name,
      emoji: selectedCategory.emoji,
      color: selectedCategory.color
    }
    emit("update:modelValue", category);
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
      class="sm:w-[150px] h-11 border-2 border-gray-300 rounded-lg flex items-center pl-2 cursor-pointer"
    >
      <p class="text-gray-800">{{ renderCategoryPreview }}</p>
      <Icon
        icon="mdi:chevron-down"
        width="24"
        height="24"
        class="ml-auto text-gray-600 transition-transform duration-200"
        :class="{ 'rotate-180': isDropdownOpen }"
      />
    </div>

    <div
      v-if="isDropdownOpen"
      v-bind="attrs"
      :class="mergeStyles(`absolute bottom-0 sm:right-0 z-10 bg-white shadow-md rounded-sm mt-1 w-[350px]`)"
    >
      <div class="p-3 border-b border-gray-200">
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
      </div>
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
