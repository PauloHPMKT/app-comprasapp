<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { Icon } from '@iconify/vue';
import Input from './Input.vue';
import MainButton from './MainButton.vue';
import type { Item } from '../types/item';
import { useAuthStore } from '../store/auth';
import { useValidation } from '../composables/useValidation';
import { useToast } from '../composables/useToast';

const authStore = useAuthStore();
const { formsValidation } = useValidation();
const { addToast } = useToast();

interface Emits {
  (e: 'add-product', product: Item.ToPurchase): void;
}

const emit = defineEmits<Emits>();

const product = reactive<Item.ToPurchase>({
  name: '',
  category: {
    name: '',
    emoji: '',
    color: ''
  },
  observation: '',
  quantity: 0,
  price: 0,
  totalItemPrice: 0,
});
const categories = reactive<Item.Category[]>([
  { id: '1', name: 'Alimentos', emoji: '🍎', color: '#FF7043' }, // laranja
  { id: '2', name: 'Bebidas', emoji: '🥤', color: '#29B6F6' }, // azul claro
  { id: '3', name: 'Limpeza', emoji: '🧼', color: '#81C784' }, // verde claro
  { id: '4', name: 'Higiene', emoji: '🧴', color: '#BA68C8' }, // roxo claro
  { id: '5', name: 'Padaria', emoji: '🥖', color: '#FFD54F' }, // amarelo
  { id: '6', name: 'Carnes', emoji: '🥩', color: '#E57373' }, // vermelho claro
  { id: '7', name: 'Frutas', emoji: '🍌', color: '#FFF176' }, // amarelo claro
  { id: '8', name: 'Verduras', emoji: '🥦', color: '#66BB6A' }, // verde
  { id: '9', name: 'Laticínios', emoji: '🧀', color: '#FFF9C4' }, // amarelo bem claro
  { id: '10', name: 'Doces', emoji: '🍬', color: '#F06292' }, // rosa
  { id: '11', name: 'Congelados', emoji: '🥶', color: '#4FC3F7' }, // azul gelo
  { id: '12', name: 'Grãos', emoji: '🌾', color: '#A1887F' }, // marrom claro
  { id: '13', name: 'Bebidas Alcoólicas', emoji: '🍺', color: '#FFD600' }, // amarelo ouro
  { id: '14', name: 'Produtos Naturais', emoji: '🌿', color: '#388E3C' }, // verde escuro
  { id: '15', name: 'Produtos Orgânicos', emoji: '🍏', color: '#AED581' }, // verde orgânico
  { id: '16', name: 'Produtos de Limpeza', emoji: '🧽', color: '#00B8D4' }, // azul piscina
  { id: '17', name: 'Produtos de Higiene', emoji: '🧴', color: '#CE93D8' }, // lilás
  { id: '18', name: 'Produtos para Bebês', emoji: '🍼', color: '#B3E5FC' }, // azul bebê
  { id: '19', name: 'Produtos para Animais', emoji: '🐾', color: '#8D6E63' }, // marrom
  { id: '20', name: 'Outros', emoji: '🔄', color: '#BDBDBD' } // cinza
]);

const isLoggedIn = computed(() => {
  return authStore.isAuthenticated;
});

const displayQuantity = computed({
  get() { return product.quantity === 0 ? '' : product.quantity },
  set(value) { product.quantity = value === '' ? 0 : Number(value) }
});

const displayPrice = computed({
  get() { return product.price === 0 ? '' : product.price },
  set(value) { product.price = value === '' ? 0 : Number(value) }
});

function addProduct() {
  const { name, quantity, price } = product;
  const isValid = formsValidation({
    name,
    quantity,
    price,
  });
  console.log(isValid);
  if (isValid.error) {
    addToast({
      id: Date.now().toString(),
      message: isValid.message,
      type: 'error',
      duration: 3000,
    })
    return;
  }
  emit('add-product', product);
}
</script>

<template>
  <div class="hidden sm:flex gap-2 w-full sm:w-[90%]">
    <Input
      v-model="product.name"
      placeholder="Nome do item"
      class="w-1/2 border-2 h-11"
    />
    <div class="flex gap-2 w-fit">
      <!-- tratar com lazy loading -->
      <!-- <CategorySelector
        v-if="isLoggedIn"
        v-model="selectedCategory"
        :categories="categories"
        :is-not-reponsive-mode="true"
        @create-new-category="handleCreateNewCategory"
      /> -->
      <Input
        v-model="displayQuantity"
        placeholder="Quantidade"
        class="border-2 h-11"
      />
      <Input
        v-model="displayPrice"
        placeholder="Valor R$"
        class="w-[160px] border-2 h-11"
      />
    </div>
    <MainButton
      @click="addProduct"
      class="bg-red-500 w-[250px] text-white h-11 rounded-md flex items-center justify-center"
    >
      <span>Adicionar Produto</span>
      <Icon icon="mdi:plus" width="20" height="20" />
    </MainButton>
  </div>
</template>
