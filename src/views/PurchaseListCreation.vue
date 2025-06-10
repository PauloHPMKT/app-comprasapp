<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import PageHeaderTitle from '../components/PageHeaderTitle.vue';
import MainButton from '../components/MainButton.vue';
import Overlay from '../components/Overlay.vue';
import Modal from '../components/Modal.vue';
import Input from '../components/Input.vue';
import { useModal } from '../composables/useModal';
import emptyListImage from '../assets/img/img-lista-vazia.png';

const purchaseListTitle = ref(localStorage.getItem('purchase-list-title'));
const purchaseItems = ref([
  {
    id: 1,
    name: 'Arroz',
    category: {
      ame: 'Grãos',
      icon: 'mdi:rice'
    },
    quantity: 4,
    price: 10.00
  },
  {
    id: 2,
    name: 'Pão',
    category: {
      name: 'Padaria',
      icon: 'mdi:bread-slice'
    },
    quantity: 2,
    price: 6.78
  },
  {
    id: 3,
    name: 'Banana',
    category: {
      name: 'Hortifrutti',
      icon: 'mdi:fruit-banana'
    },
    quantity: 6,
    price: 3.50
  },
  {
    name: 'Leite',
    category: {
      name: 'Laticínios',
      icon: 'mdi:milk'
    },
    quantity: 2,
    price: 20.00
  },
]);

const {
  isOpen,
  open,
  close
} = useModal();
</script>

<template>
  <div class="h-full w-full">
    <div class="pb-4 border-b-2 border-gray-300 w-full">
      <PageHeaderTitle
        :title="purchaseListTitle!"
        subtitle="Insira os dados e preencha sua lista de compras."
        class="mb-0"
      />
      <div class="hidden sm:flex gap-2 w-full sm:w-[80%]">
        <input type="text" class="w-full p-2 border border-gray-300 rounded-md" placeholder="Nome do item" />
        <div class="flex gap-2">
          <input type="text" class="w-full p-2 border border-gray-300 rounded-md" placeholder="Categoria" />
          <input type="text" class="w-full p-2 border border-gray-300 rounded-md" placeholder="Quantidade" />
          <input type="text" class="w-full p-2 border border-gray-300 rounded-md" placeholder="Valor R$" />
        </div>
        <MainButton class="bg-red-600 text-white h-12 rounded-md flex items-center justify-center">
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
      class="mt-4 flex flex-col gap-2 w-full max-h-[60%] sm:h-[100%] overflow-y-auto">
      <li class="bg-white shadow-md/3 rounded-lg p-3 flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <p class="text-gray-800 font-bold text-[16px] sm:text-[20px]">Nome do item</p>
          <div class="flex items-center justify-between min-w-[120px] sm:min-w-[300px]">
            <span>4</span>
            <p class="font-extrabold">R$ 10,00</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-400">🥦 Hortifrutti</span>
        </div>
      </li>
      <li class="bg-white shadow-md/3 rounded-lg p-3 flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <p class="text-gray-800 font-bold text-[16px] sm:text-[20px]">Nome do item</p>
          <div class="flex items-center justify-between min-w-[120px] sm:min-w-[300px]">
            <span>2</span>
            <p class="font-extrabold">R$ 6,78</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-400">🍞 Padaria</span>
        </div>
      </li>
      <li class="bg-white shadow-md/3 rounded-lg p-3 flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <p class="text-gray-800 font-bold text-[16px] sm:text-[20px]">Nome do item</p>
          <div class="flex items-center justify-between min-w-[120px] sm:min-w-[300px]">
            <span>2</span>
            <p class="font-extrabold">R$ 6,78</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-400">🍞 Padaria</span>
        </div>
      </li>
      <li class="bg-white shadow-md/3 rounded-lg p-3 flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <p class="text-gray-800 font-bold text-[16px] sm:text-[20px]">Nome do item</p>
          <div class="flex items-center justify-between min-w-[120px] sm:min-w-[300px]">
            <span>2</span>
            <p class="font-extrabold">R$ 6,78</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-400">🍞 Padaria</span>
        </div>
      </li>
      <li class="bg-white shadow-md/3 rounded-lg p-3 flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <p class="text-gray-800 font-bold text-[16px] sm:text-[20px]">Nome do item</p>
          <div class="flex items-center justify-between min-w-[120px] sm:min-w-[300px]">
            <span>2</span>
            <p class="font-extrabold">R$ 6,78</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-400">🍞 Padaria</span>
        </div>
      </li>      <!-- <li class="bg-white shadow-md/3 rounded-lg p-3 flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <p class="text-gray-800 font-bold text-[16px] sm:text-[20px]">Nome do item</p>
          <div class="flex items-center justify-between min-w-[120px] sm:min-w-[300px]">
            <span>2</span>
            <p class="font-extrabold">R$ 6,78</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-400">🍞 Padaria</span>
        </div>
      </li>
      <li class="bg-white shadow-md/3 rounded-lg p-3 flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <p class="text-gray-800 font-bold text-[16px] sm:text-[20px]">Nome do item</p>
          <div class="flex items-center justify-between min-w-[120px] sm:min-w-[300px]">
            <span>2</span>
            <p class="font-extrabold">R$ 6,78</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-400">🍞 Padaria</span>
        </div>
      </li>
      <li class="bg-white shadow-md/3 rounded-lg p-3 flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <p class="text-gray-800 font-bold text-[16px] sm:text-[20px]">Nome do item</p>
          <div class="flex items-center justify-between min-w-[120px] sm:min-w-[300px]">
            <span>2</span>
            <p class="font-extrabold">R$ 20,00</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-400">🍞 Padaria</span>
        </div>
      </li>
      <li class="bg-white shadow-md/3 rounded-lg p-3 flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <p class="text-gray-800 font-bold text-[16px] sm:text-[20px]">Nome do item</p>
          <div class="flex items-center justify-between min-w-[120px] sm:min-w-[300px]">
            <span>2</span>
            <p class="font-extrabold">R$ 6,78</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-400">🍞 Padaria</span>
        </div>
      </li> -->
    </ul>
    <div
      v-if="purchaseItems.length"
      class="h-[14%] sm:h-[15%] flex items-center justify-between text-gray-500 border-t border-gray-300">
      <div>
        total de itens: <span class="font-extrabold text-gray-900">10</span>
        <br />
        total gasto: <span class="font-extrabold text-gray-900">R$ 50,00</span>
      </div>
      <MainButton
        class="bg-red-600 text-white w-12 h-12"
        @click="close"
      >
        <Icon icon="mdi:check" width="20" height="20" />
      </MainButton>
    </div>

    <div v-else class="flex flex-col items-center justify-center h-[75%]">
      <img :src="emptyListImage" alt="Lista vazia" class="w-32 sm:w-58"/>
      <h3 class="font-extrabold">Sua lista está vazia!</h3>
      <p class="text-sm text-gray-500">Nanhum item foi adicionado a lista</p>
    </div>

    <Overlay v-if="isOpen">
      <Modal :modal-value="isOpen" @close="close">
        <h3 class="font-bold">Adicione um item à lista</h3>
        <span class="text-gray-500 text-[14px] -leading-6">
          Preencha os campos para adicionar um item a lista.
        </span>
        <div class="flex flex-col items-center gap-4 mt-4">
          <Input
            placeholder="Nome do produto"
            class="w-full h-11 border-2"
          />
          <Input
            placeholder="Categoria do produto"
            class="w-full h-11 border-2"
          />
          <div class="w-full flex gap-2 items-center">
            <Input
              placeholder="Quantidade"
              class="w-full h-11 border-2"
            />
            <Input
              placeholder="Valor do item (R$)"
              class="w-full h-11 border-2"
            />
          </div>
          <MainButton
            @click="close"
            class="bg-red-600 h-11 w-full"
          >
            Adicionar produto
          </MainButton>
        </div>
      </Modal>
    </Overlay>
  </div>
</template>
