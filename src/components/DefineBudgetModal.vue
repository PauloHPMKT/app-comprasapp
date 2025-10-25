<script setup lang="ts">
import { ref } from 'vue';
import Input from './Input.vue';
import MainButton from './MainButton.vue';
import ModalLayout from './ModalLayout.vue';

interface DefineBudgetModalProps {
  hasError?: boolean;
  errorMessage?: string;
}

interface DefineBudgetModalEmits {
  (e: 'update:budgetValue', value: string): void;
  (e: 'submitBudgetValue', value: string): void;
  (e: 'close'): void;
}

defineProps<DefineBudgetModalProps>();
const emit = defineEmits<DefineBudgetModalEmits>();

const budgetValue = ref<string>('');

function handleInputUpdate(value: string) {
  budgetValue.value = value;
  emit('update:budgetValue', value);
};

function handleSubmitBudgetValue() {
  emit('submitBudgetValue', budgetValue.value);
};
</script>

<template>
  <ModalLayout @close="$emit('close')" class="sm:w-[500px]">
    <template #body>
      <div class="w-full flex flex-col items-center justify-center my-8">
        <img src="../assets/img/10060033.png" alt="" class="w-28 sm:w-42" />
        <h3 class="text-2xl sm:text-3xl font-semibold">
          Defina um orçamento mensal
        </h3>
        <p class="text-gray-600 mt-2 text-center">
          Estabeleça um limite de gastos para suas compras mensais e acompanhe
          seu progresso.
        </p>
        <div class="w-full mt-6">
          <p class="font-light text-sm text-start">Orçamento Mensal (R$)</p>
          <div class="sm:flex items-center sm:gap-2 w-full">
            <div class="w-full sm:w-[60%]">
              <Input
                placeholder="Ex: 1500.00"
                :model-value="budgetValue"
                @update:model-value="handleInputUpdate"
                class="sm:w-full h-11 border-2"
                :class="{ 'border-red-500': hasError }"
              />
              <p v-if="hasError" class="text-red-500 text-sm mt-1">
                {{ errorMessage }}
              </p>
            </div>
            <MainButton
              @click="handleSubmitBudgetValue"
              class="bg-gray-800 h-11 w-full sm:w-fit mt-3 sm:mt-0"
              :class="{ 'mb-6': hasError }"
            >
              Definir Orçamento
            </MainButton>
          </div>
        </div>
      </div>
    </template>
  </ModalLayout>
</template>
