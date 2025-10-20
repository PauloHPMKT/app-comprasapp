<script setup lang="ts">
import { inject } from 'vue';
import { Icon } from '@iconify/vue';
import ModalLayout from './ModalLayout.vue';
import InfoCard from './InfoCard.vue';
import Input from './Input.vue';
import MainButton from './MainButton.vue';

interface CreateListTitleModalProps {
  purchaseListTitle: string;
  resetModal: () => void;
  hasError?: boolean;
  errorMessage?: string;
}

interface CreateListTitleModalEmits {
  (e: 'update:purchaseListTitle', value: string): void;
  (e: 'navigateToCreatePurchaseListView'): void;
}

defineProps<Omit<CreateListTitleModalProps, 'resetModal'>>();
const emit = defineEmits<CreateListTitleModalEmits>();
const modalActions = inject<CreateListTitleModalProps>('modalActions');

function handleInputUpdate(value: string) {
  emit('update:purchaseListTitle', value);
};

function handleSubmitToNewList() {
  emit('navigateToCreatePurchaseListView');
};

function handleCloseModal() {
  modalActions?.resetModal();
};
</script>

<template>
  <ModalLayout @close="handleCloseModal" class="sm:w-[600px]">
    <template #body>
      <div class="w-full flex items-center justify-center my-8">
        <img
          src="../assets/img/list-creation-img.png"
          alt="Criando lista de compras"
          class="w-36 sm:w-68 h-full"
        />
      </div>
      <div class="flex flex-col justify-center gap-4">
        <h3 class="text-2xl sm:text-3xl font-semibold">Defina um nome para sua lista</h3>
        <InfoCard info-category="info" class="w-full">
          Adicione um título à sua lista para sua melhor organização. Você pode criar
          várias listas com títulos diferentes.
        </InfoCard>
        <div class="sm:flex items-center sm:gap-3">
          <div class="w-full sm:w-[73%]">
            <Input
              placeholder="nome da lista"
              :model-value="purchaseListTitle"
              @update:model-value="handleInputUpdate"
              class="sm:w-full h-11 border-2"
              :class="{ 'border-red-500': hasError }"
            />
            <p v-if="hasError" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
          </div>
          <MainButton
            @click="handleSubmitToNewList"
            class="bg-gray-800 h-11 w-full sm:w-fit mt-3 sm:mt-0"
            :class="{ 'mb-6': hasError }"
          >
            Criar Lista
            <Icon
              icon="tabler:pencil-star"
              width="24"
              height="24"
              class="text-white"
            />
          </MainButton>
        </div>
      </div>
    </template>
  </ModalLayout>
</template>
