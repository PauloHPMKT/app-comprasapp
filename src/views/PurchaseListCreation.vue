<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { Icon } from "@iconify/vue";
import PageHeaderTitle from "../components/PageHeaderTitle.vue";
import MainButton from "../components/MainButton.vue";
import Overlay from "../components/Overlay.vue";
import Modal from "../components/Modal.vue";
import Input from "../components/Input.vue";
import { useModal } from "../composables/useModal";
import TransitionEffect from "../components/TransitionEffect.vue";
import emptyListImage from "../assets/img/img-lista-vazia.png";
import CategorySelector from "../components/CategorySelector.vue";
import NewCategory from "../components/NewCategory.vue";

const { isOpen, open, close } = useModal();

const purchaseListTitle = ref(localStorage.getItem("purchase-list-title"));
const showCreateNewCategoryModal = ref<typeof NewCategory | null>(null);
const purchaseItems = ref([
  {
    id: 1,
    name: 'Arroz',
    category: {
      name: 'Grãos',
      icon: '🍚'
    },
    quantity: 4,
    price: 10.00
  },
  {
    id: 2,
    name: 'Pão',
    category: {
      name: 'Padaria',
      icon: '🥖'
    },
    quantity: 2,
    price: 6.78
  },
  {
    id: 3,
    name: 'Banana',
    category: {
      name: 'Hortifrutti',
      icon: '🍌'
    },
    quantity: 6,
    price: 3.50
  },
  {
    id: 4,
    name: 'Leite',
    category: {
      name: 'Laticínios',
      icon: '🥛'
    },
  },
  {
    id: 5,
    name: 'Sabão em pó',
    category: {
      name: 'Limpeza',
      icon: '🧼'
    },
    quantity: 1,
    price: 15.00
  },
  {
    id: 6,
    name: 'Cerveja',
    category: {
      name: 'Bebidas',
      icon: '🍺'
    },
    quantity: 12,
    price: 3.50
  },
  {
    id: 7,
    name: 'Frango',
    category: {
      name: 'Carnes',
      icon: '🍗'
    },
    quantity: 2,
    price: 20.00
  },
  {
    id: 8,
    name: 'Maçã',
    category: {
      name: 'Hortifrutti',
      icon: '🍎'
    },
    quantity: 5,
    price: 2.50
  },
  {
    id: 9,
    name: 'Detergente',
    category: {
      name: 'Limpeza',
      icon: '🧽'
    },
    quantity: 1,
    price: 4.00
  },
  {
    id: 10,
    name: 'Iogurte',
    category: {
      name: 'Laticínios',
      icon: '🥛'
    },
    quantity: 3,
    price: 5.00
  },
  {
    id: 11,
    name: 'Biscoito',
    category: {
      name: 'Doces',
      icon: '🍪'
    },
    quantity: 2,
    price: 3.00
  },
  {
    id: 12,
    name: 'Ovos',
    category: {
      name: 'Laticínios',
      icon: '🥚'
    },
    quantity: 12,
    price: 7.00
  }
]);
const categories = reactive([
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
const selectCategory = ref(false);
const productItem = reactive({
  name: '',
  category: {
    name: '',
    icon: ''
  },
  quantity: '',
  price: ''
});

const reversedPurchaseItems = computed(() => {
  return [...purchaseItems.value].reverse();
});

function addPurchaseItemToList() {
  const item = {
    id: purchaseItems.value.length + 1,
    name: productItem.name,
    category: { // caso nao haja categoria tem que enviar null
      name: productItem.category.name || 'Sem categoria',
      icon: productItem.category.icon || '🔄'
    },
    quantity: parseInt(productItem.quantity) || 1,
    price: parseFloat(productItem.price) || 0.00
  }
  console.log("Item adicionado:", item);
  purchaseItems.value.push(item);
  close();
}

function handleCreateNewCategory() {
  // repassar a variavel de controle do CategorySelector para fechar o modal
  showCreateNewCategoryModal.value?.isOpen();
}

function addNewCategory() {
  alert("teste");
}
</script>

<template>
  <div class="flex flex-col overflow-hidden w-full">
    <div class="pb-4 border-b-2 border-gray-300 w-full">
      <PageHeaderTitle
        :title="purchaseListTitle!"
        subtitle="Insira os dados e preencha sua lista de compras."
        class="mb-0"
      />
      <div class="hidden sm:flex gap-2 w-full sm:w-[80%]">
        <Input
          v-model="productItem.name"
          class="w-1/2 border-2 h-11"
          placeholder="Nome do item"
        />
        <div class="flex gap-2 w-1/2">
          <CategorySelector
            v-model="productItem.category"
            :categories="categories"
            :is-not-reponsive-mode="true"
            @create-new-category="handleCreateNewCategory"
            class="w-[400px]"
          />
          <Input
            v-model="productItem.quantity"
            class="border-2 h-11"
            placeholder="Quantidade"
          />
          <Input
            v-model="productItem.price"
            class="w-[160px] border-2 h-11"
            placeholder="Valor R$"
          />
        </div>
        <MainButton
          @click="addPurchaseItemToList"
          class="bg-red-600 text-white h-11 rounded-md flex items-center justify-center"
        >
          <Icon icon="mdi:plus" width="20" height="20" />
        </MainButton>
      </div>
      <!-- Button for responsive mobile sm -->
      <div class="w-full sm:w-[80%] flex sm:hidden">
        <MainButton
          @click="open"
          class="bg-red-600 w-full text-white h-11 rounded-md mt-4"
        >
          <p>Adicionar Produto</p>
          <Icon icon="mdi:plus" width="20" height="20" />
        </MainButton>
      </div>
    </div>

    <ul
      v-if="purchaseItems.length"
      class="flex-1 overflow-y-auto py-2 space-y-2 w-full"
    >
      <li
        v-for="(item, index) in reversedPurchaseItems"
        :key="item.id || index"
        class="bg-white shadow-md/3 rounded-lg p-3 flex flex-col gap-2"
      >
        <div class="flex items-center justify-between">
          <p class="text-gray-800 font-bold text-[16px] sm:text-[20px]">
            {{ item.name }}
          </p>
          <div
            class="flex items-center justify-between min-w-[120px] sm:min-w-[300px]"
          >
            <span>{{ item.quantity }}</span>
            <p class="font-extrabold">
              {{ item.price }}
            </p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-400">
            {{ item.category.icon }}
            {{ item.category.name || "Sem categoria" }}
          </span>
        </div>
      </li>
    </ul>

    <div
      v-if="purchaseItems.length"
      class="h-[14%] sm:h-[15%] flex items-center justify-between text-gray-500 border-t border-gray-300"
    >
      <div>
        total de itens: <span class="font-extrabold text-gray-900">10</span>
        <br />
        total gasto: <span class="font-extrabold text-gray-900">R$ 50,00</span>
      </div>
      <MainButton class="bg-red-600 text-white w-12 h-12" @click="close">
        <Icon icon="mdi:check" width="20" height="20" />
      </MainButton>
    </div>

    <div v-else class="flex flex-col items-center justify-center h-[75%]">
      <img :src="emptyListImage" alt="Lista vazia" class="w-32 sm:w-58" />
      <h3 class="font-extrabold">Sua lista está vazia!</h3>
      <p class="text-sm text-gray-500">Nanhum item foi adicionado a lista</p>
    </div>

    <NewCategory ref="showCreateNewCategoryModal" @create-category="addNewCategory" class="z-10" />
    <Overlay v-if="isOpen">
      <Modal :modal-value="isOpen" @close="close">
        <TransitionEffect>
          <div v-if="!selectCategory" class="w-full mb-3">
            <h3 class="font-bold">Adicione um item à lista</h3>
            <span class="text-gray-500 text-[14px] -leading-6">
              Preencha os campos para adicionar um item a lista.
            </span>
            <div class="flex flex-col items-center gap-3 mt-4">
              <Input
                v-model="productItem.name"
                placeholder="Nome do produto"
                class="w-full h-11 border-2"
              />
              <div class="flex w-full gap-2 items-center">
                <CategorySelector
                  v-model="productItem.category"
                  :categories="categories"
                  class="w-full"
                />
                <MainButton
                  class="h-11 bg-red-600"
                  @click="handleCreateNewCategory"
                >
                  <Icon
                    icon="mdi:plus"
                    width="20"
                    height="20"
                    class="text-white"
                  />
                </MainButton>
              </div>
              <div class="w-full flex gap-2 items-center">
                <Input
                  v-model="productItem.quantity"
                  placeholder="Quantidade"
                  class="w-full h-11 border-2"
                />
                <Input
                  v-model="productItem.price"
                  placeholder="Valor do item (R$)"
                  class="w-full h-11 border-2"
                />
              </div>
            </div>
          </div>
          <div v-else>
            <h3 class="font-bold mb-4">Selecione uma categoria</h3>
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
            <div class="h-48 overflow-y-auto mt-4 mb-2">
              <CategorySelector
                v-model="productItem.category"
                :categories="categories"
                class="w-full"
              />
            </div>
          </div>
        </TransitionEffect>
        <MainButton @click="addPurchaseItemToList" class="bg-red-600 h-11 w-full">
          Adicionar produto
        </MainButton>
      </Modal>
    </Overlay>
  </div>
</template>
