<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import PageHeaderTitle from '../components/PageHeaderTitle.vue';
import MainButton from '../components/MainButton.vue';
import NewCategory from '../components/NewCategory.vue';
import Input from '../components/Input.vue';
import emptyListImage from '../assets/img/img-lista-vazia.png';

const showCreateNewCategoryModal = ref<typeof NewCategory | null>(null);
const categories = ref([
  { name: 'Alimentos', emoji: '🍎' },
  { name: 'Bebidas', emoji: '🥤' },
  { name: 'Limpeza', emoji: '🧼' },
  { name: 'Higiene', emoji: '🧴' },
  { name: 'Padaria', emoji: '🥖' },
  { name: 'Carnes', emoji: '🥩' },
  { name: 'Frutas', emoji: '🍌' },
  { name: 'Verduras', emoji: '🥦' },
  { name: 'Laticínios', emoji: '🧀' },
  { name: 'Doces', emoji: '🍬' },
  { name: 'Congelados', emoji: '🥶' },
  { name: 'Grãos', emoji: '🌾' },
  { name: 'Bebidas Alcoólicas', emoji: '🍺' },
  { name: 'Produtos Naturais', emoji: '🌿' },
  { name: 'Produtos Orgânicos', emoji: '🍏' },
  { name: 'Produtos de Limpeza', emoji: '🧽' },
  { name: 'Produtos de Higiene', emoji: '🧴' },
  { name: 'Produtos para Bebês', emoji: '🍼' },
  { name: 'Produtos para Animais', emoji: '🐾' },
  { name: 'Outros', emoji: '🔄' }
]);

function openNewCategoryModal() {
  showCreateNewCategoryModal.value?.isOpen();
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
        <li
          class="flex items-center justify-between bg-white shadow-md/3 rounded-lg p-3"
          v-for="category in categories"
          :key="category.name"
        >
          <div class="flex items-center gap-2">
            <span class="text-2xl">{{ category.emoji }}</span>
            <p class="text-gray-800 font-bold">{{ category.name }}</p>
          </div>
          <Icon
            icon="mdi:chevron-right"
            width="24"
            height="24"
            class="text-gray-500 cursor-pointer"
          />
        </li>
      </ul>

      <!-- LISTA VAZIA -->
      <div v-else class="flex flex-col items-center justify-center h-full">
        <img :src="emptyListImage" alt="Lista vazia" class="w-32 sm:w-58" />
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


