<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { Icon } from '@iconify/vue';
import Input from './Input.vue';
import MainButton from './MainButton.vue';
import type { Item } from '../types/item';
import { useAuthStore } from '../store/auth';
import { useValidation } from '../composables/useValidation';
import { useToast } from '../composables/useToast';
import CategorySelector from './CategorySelector.vue';

const authStore = useAuthStore();
const { formsValidation, hasError, errorMessage } = useValidation();
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

const fieldErrors = reactive({
  name: false,
  quantity: false,
  price: false,
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
const selectCategory = ref(false);
const selectedCategory = ref<{ name: string; emoji: string }>({ name: 'Carnes', emoji: '🥩', });

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

// function handleCreateNewCategory() {
//   // repassar a variavel de controle do CategorySelector para fechar o modal
//   showCreateNewCategoryModal.value?.isOpen();
// }

function addProduct() {
  const { name, quantity, price } = product;
   // ✅ Valida individualmente cada campo
  fieldErrors.name = !name || name.trim() === '';
  fieldErrors.quantity = !quantity || quantity === 0;
  fieldErrors.price = !price || price === 0;

  const isValid = formsValidation({
    name,
    quantity,
    price,
  });
  if (isValid.error) {
    addToast({
      id: Date.now().toString(),
      message: isValid.message,
      type: 'error',
      duration: 3000,
    })
    hasError.value = true;
    errorMessage.value = isValid.message;
    return;
  }
  emit('add-product', product);
}

function clearForm() {
  product.name = '';
  product.category = { name: '', emoji: '', color: '' };
  product.observation = '';
  product.quantity = 0;
  product.price = 0;
  product.totalItemPrice = 0;

  fieldErrors.name = false;
  fieldErrors.quantity = false;
  fieldErrors.price = false;
}

function handleNameInput(value: string) {
  product.name = value;
  if (value.trim()) fieldErrors.name = false;
}

function handleQuantityInput(value: string | number) {
  product.quantity = value === '' ? 0 : Number(value);
  if (product.quantity > 0) fieldErrors.quantity = false;
}

function handlePriceInput(value: string | number) {
  product.price = value === '' ? 0 : Number(value);
  if (product.price > 0) fieldErrors.price = false;
}

defineExpose({
  clearForm
});
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-1 w-full sm:w-[90%]">
    <Input
      :model-value="product.name"
      @update:model-value="handleNameInput"
      placeholder="Nome do item"
      :has-error="fieldErrors.name"
      class="sm:w-1/2 border-2 h-11"
    />

    <div class="flex flex-col sm:flex-row gap-1 sm:w-fit">
      <Input
        :model-value="displayQuantity"
        @update:model-value="handleQuantityInput"
        placeholder="Quantidade"
        :has-error="fieldErrors.quantity"
        class="border-2 h-11"
      />

      <Input
        :model-value="displayPrice"
        @update:model-value="handlePriceInput"
        placeholder="Valor R$"
        :has-error="fieldErrors.price"
        class="w-full sm:w-[160px] border-2 h-11"
      />

      <CategorySelector
        :categories="categories"
        v-model="selectedCategory"
      />
    </div>

    <MainButton
      @click="addProduct"
      class="bg-gray-900 w-full sm:ml-1 sm:w-[250px] text-white h-11 rounded-md flex items-center justify-center mt-4 sm:mt-0"
    >
      <span>Adicionar Produto</span>
      <Icon icon="mdi:plus" width="20" height="20" />
    </MainButton>
  </div>
</template>
