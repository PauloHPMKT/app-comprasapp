<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import PageHeaderTitle from '../components/PageHeaderTitle.vue';
import MainButton from '../components/MainButton.vue';
import NewCategory from '../components/NewCategory.vue';
import Input from '../components/Input.vue';
import CategoriesList from '../components/CategoriesList.vue';

const showCreateNewCategoryModal = ref<typeof NewCategory | null>(null);
const categories = ref([
  { id: 1, name: 'Alimentos', emoji: '🍎' },
  { id: 2, name: 'Bebidas', emoji: '🥤' },
  { id: 3, name: 'Limpeza', emoji: '🧼' },
  { id: 4, name: 'Higiene', emoji: '🧴' },
  { id: 5, name: 'Padaria', emoji: '🥖' },
  { id: 6, name: 'Carnes', emoji: '🥩' },
  { id: 7, name: 'Frutas', emoji: '🍌' },
  { id: 8, name: 'Verduras', emoji: '🥦' },
  { id: 9, name: 'Laticínios', emoji: '🧀' },
  { id: 10, name: 'Doces', emoji: '🍬' },
  { id: 11, name: 'Congelados', emoji: '🥶' },
  { id: 12, name: 'Grãos', emoji: '🌾' },
  { id: 13, name: 'Bebidas Alcoólicas', emoji: '🍺' },
  { id: 14, name: 'Produtos Naturais', emoji: '🌿' },
  { id: 15, name: 'Produtos Orgânicos', emoji: '🍏' },
  { id: 16, name: 'Produtos de Limpeza', emoji: '🧽' },
  { id: 17, name: 'Produtos de Higiene', emoji: '🧴' },
  { id: 18, name: 'Produtos para Bebês', emoji: '🍼' },
  { id: 19, name: 'Produtos para Animais', emoji: '🐾' },
  { id: 20, name: 'Outros', emoji: '🔄' }
]);

function openNewCategoryModal() {
  showCreateNewCategoryModal.value?.isOpen();
}

function handleSelectCategory(categoryId: string | number) {
  console.log("Selected category ID:", categoryId);
  // Here you can handle the selected category, e.g., navigate to a products page
}

async function addNewCategory(data: any) {
  //const response = await createCategory(data);
  console.log("response", data);
}

</script>

<template>
  <div class="flex flex-col h-[85svh] sm:h-[90svh] w-full">
    <div class="pb-4 border-b-2 border-gray-300 w-full">
      <PageHeaderTitle
        title="Categorias"
        subtitle="Selecione uma categoria para ver os produtos disponíveis."
        class="mb-0"
      />
      <div class="flex items-center gap-2 mt-4 w-full sm:w-3/4">
        <Input
          :has-icon="true"
          placeholder="Pesquisar categorias..."
          class="border-2 border-gray-300 rounded-lg px-2 h-11 w-full"
        >
          <Icon
            icon="material-symbols:search-rounded"
            width="24"
            height="24"
            class="flex items-center w-10 text-gray-500 cursor-pointer"
          />
        </Input>
        <MainButton
          @click="openNewCategoryModal"
          class="bg-red-600 flex items-center justify-center rounded-lg h-11 w-fit sm:w-62"
        >
          <span class="hidden sm:block">Criar categoria</span>✨
        </MainButton>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto mt-4">
      <ul v-if="categories.length" class="flex flex-col gap-2 pb-4">
        <CategoriesList
          v-for="category in categories"
          :key="category.id"
          v-bind="category"
          @select-category="handleSelectCategory"
        />
      </ul>

      <div v-else class="flex flex-col items-center justify-center h-full">
        <Icon
          icon="mdi:category"
          width="64"
          height="64"
          class="text-gray-400 mb-4"
        />
        <h3 class="font-extrabold">Sua lista está vazia!</h3>
        <p class="text-sm text-gray-500">Nenhum item foi adicionado à lista</p>
      </div>
    </div>

    <NewCategory
      @create-category="addNewCategory"
      ref="showCreateNewCategoryModal"
    />
  </div>
</template>


