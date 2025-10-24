<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
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

const selectedCategory = ref<{ name: string; emoji: string, color?: string }>({ name: '', emoji: '', color: '' });

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

watch(selectedCategory, (newCategory) => {
  product.category = {
    name: newCategory.name,
    emoji: newCategory.emoji,
    color: newCategory.color || '#E5E7EB'
  };
}, { deep: true });

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
  if (isNaN(product.quantity)) {
    addToast({
      id: Date.now().toString(),
      message: 'Formato de quantidade inválido.',
      type: 'error',
      duration: 3000,
    });
    fieldErrors.quantity = true;
    product.quantity = 0;
  }
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
  <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-full ">
    <div class="sm:w-[50%]">
      <Input
        :model-value="product.name"
        @update:model-value="handleNameInput"
        placeholder="Nome do item"
        :has-error="fieldErrors.name"
        class="border-2 h-11"
      />
    </div>

    <div class="flex flex-col sm:flex-row gap-2 sm:w-[45%] w-full">
      <Input
        :model-value="displayQuantity"
        @update:model-value="handleQuantityInput"
        placeholder="Qtde."
        :has-error="fieldErrors.quantity"
        class="border-2 h-11"
      />

      <Input
        :model-value="displayPrice"
        @update:model-value="handlePriceInput"
        placeholder="Valor R$"
        :has-error="fieldErrors.price"
        class="border-2 h-11"
      />

      <CategorySelector
        v-if="isLoggedIn"
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
