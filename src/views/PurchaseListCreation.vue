<script setup lang="ts">
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import PageHeaderTitle from "../components/PageHeaderTitle.vue";
import MainButton from "../components/MainButton.vue";
import Overlay from "../components/Overlay.vue";
import PurchaseItem from "../components/Item.vue";
//import NewCategory from "../components/NewCategory.vue";
import ModalLayout from "../components/ModalLayout.vue";
import AddProductInput from "../components/AddProductInput.vue";
import { useModal } from "../composables/useModal";
import type { Item } from "types/item";
import emptyListImage from "../assets/img/empty-list.png";
import { useToast } from "../composables/useToast";

const { isOpen, open, close } = useModal();
const { addToast } = useToast();
//const { purchaseItems, productItem, addPurchaseItemToList } = usePurchaseList();

const observationText = ref("");
const editingItemId = ref<number | null>(null);
const removingItemId = ref<number | null>(null);
const addProductInput = ref(false);
const addObservation = ref(false);
const disableObservationQuestion = ref(false);
const isRemoveConfirmationOpen = ref(false);
const purchaseItems = ref<Item.ToPurchase[]>([]);
const currentProduct = ref<Item.ToPurchase | null>(null);
const purchaseListTitle = ref(localStorage.getItem("purchase-list-title"));
const addProductInputRef = ref<InstanceType<typeof AddProductInput>>();

//const showCreateNewCategoryModal = ref<typeof NewCategory | null>(null);

const reversedPurchaseItems = computed(() => {
  return [...purchaseItems.value].reverse();
});

const calculateTotalItemsPrice = computed(() => {
  return purchaseItems.value.reduce((acc, item) => {
    return acc + Number(item.totalItemPrice);
  }, 0).toFixed(2);
});

const itemToRemove = computed(() => {
  const item = purchaseItems.value.find(item => item.orderId === removingItemId.value);
  return item ? item.name : '';
});

function showObservationModal() {
  open();
}

function addProductInListOrObservation(product: Item.ToPurchase) {
  currentProduct.value = product;
  if (!localStorage.getItem('disable-observation-question')) {
    toggleAddProductMobileInput();
    showObservationModal();
    return;
  }

  return includeProductInList();
}

function includeObservationInList() {
  const observation = observationText.value;

  if (editingItemId.value) {
    const itemIndex = purchaseItems.value.findIndex(item => item.orderId === editingItemId.value);
    if (itemIndex !== -1) {
      purchaseItems.value[itemIndex].observation = observation;
    }
    closeObservationNotePad();
    return;
  }

  if (currentProduct.value) {
    currentProduct.value.observation = observation;
  }

  closeObservationNotePad();
  includeProductInList();
}

function includeProductInList() {
  if (disableObservationQuestion.value) {
    localStorage.setItem("disable-observation-question", "true");
    disableObservationQuestion.value = true;
  }

  if (currentProduct.value) {
    const productToAdd = {
      ...currentProduct.value,
      orderId: purchaseItems.value.length + 1,
      category: {
        name: currentProduct.value?.category?.name || 'Sem categoria',
        color: currentProduct.value?.category?.color || '#E5E7EB',
        emoji: currentProduct.value?.category?.emoji || ''
      },
      observation: currentProduct.value?.observation || '',
      totalItemPrice: (Number(currentProduct.value?.quantity) * Number(currentProduct.value?.price)).toFixed(2),
    };
    purchaseItems.value.push(productToAdd);

    if (addProductInput.value) {
      addToast({
        id: Date.now().toString(),
        message: `O item "${productToAdd.name}" foi adicionado à lista!`,
        type: 'success',
        duration: 2000,
      });
    }
  }

  addProductInputRef.value?.clearForm();
  currentProduct.value = null;
  observationText.value = "";

  if (isOpen.value) {
    close();
  }
}

function savePurchaseList() {
  if (localStorage.getItem('disable-observation-question')) {
    localStorage.removeItem("disable-observation-question");
    disableObservationQuestion.value = false;
  }
  alert('A lista foi salva!!! deu bom!!! bora comprar mais!!!')
}

function openObservationNotePad(OrderId?: number) {
  if (isOpen.value) {
    close();
  }

  const itemToAddObservation = purchaseItems.value.some(item => item.orderId === OrderId);
  if (OrderId && itemToAddObservation) {
    editingItemId.value = OrderId;
    addObservation.value = true;
    return;
  }
  addObservation.value = true;
}

function closeObservationNotePad() {
  addObservation.value = false;
  observationText.value = "";

  if (editingItemId.value) {
    editingItemId.value = null;
  }
}

function cleanObservationInput() {
  observationText.value = "";
}

function toggleAddProductMobileInput() {
  addProductInput.value = !addProductInput.value;
}

function toggleRemoveItemModalConfirmation(orderId?: number) {
  isRemoveConfirmationOpen.value = !isRemoveConfirmationOpen.value;
  if (orderId) {
    removingItemId.value = orderId;
  }
}

function removeItem() {
  purchaseItems.value = purchaseItems.value.filter(item => item.orderId !== removingItemId.value);
  toggleRemoveItemModalConfirmation();
}
</script>

<template>
  <div class="flex flex-col overflow-hidden w-full">
    <div class="pb-4 border-b-2 border-gray-300 w-full">
      <PageHeaderTitle
        :title="purchaseListTitle!"
        subtitle="Insira os dados dos produtos para preencera sua lista de compras."
        class="mb-0"
      />
      <AddProductInput
        ref="addProductInputRef"
        @add-product="addProductInListOrObservation"
        class="mt-4 hidden sm:flex"
      />
      <!-- Button for responsive mobile sm -->
      <div class="w-full sm:w-[80%] flex sm:hidden">
        <MainButton
          @click="toggleAddProductMobileInput"
          class="bg-gray-900 w-full text-white h-11 rounded-md mt-4"
        >
          <p>Adicionar Produto</p>
          <Icon icon="mdi:plus" width="20" height="20" />
        </MainButton>
      </div>
    </div>

    <div v-if="!purchaseItems.length" class="flex flex-col items-center justify-center h-[75%]">
      <img :src="emptyListImage" alt="Lista vazia" class="w-32 sm:w-58" />
      <h3 class="font-extrabold">Sua lista está vazia!</h3>
      <p class="text-sm text-gray-500">Nanhum item foi adicionado a lista</p>
    </div>
    <ul
      v-else
      class="flex-1 overflow-y-auto space-y-2 w-full bg-gray-100"
    >
      <PurchaseItem
        v-for="(item, index) in reversedPurchaseItems"
        :key="index"
        v-bind="item"
        @delete-item="toggleRemoveItemModalConfirmation(item.orderId!)"
        @add-observation="openObservationNotePad(item.orderId!)"
      />
    </ul>

    <div
      v-if="purchaseItems.length"
      class="h-[14%] sm:h-[15%] flex items-center justify-between text-gray-500 border-t border-gray-300"
    >
      <div>
        total de itens: <span class="font-extrabold text-gray-900">{{ purchaseItems.length }}</span>
        <br />
        total gasto: <span class="font-extrabold text-gray-900">R$ {{ calculateTotalItemsPrice }}</span>
      </div>
      <MainButton class="bg-gray-900 text-white w-fit h-11" @click="savePurchaseList">
        Finalizar Lista
        <Icon icon="mdi:check" width="20" height="20" />
      </MainButton>
    </div>

    <!-- <NewCategory ref="showCreateNewCategoryModal" @create-category="addNewCategory" class="z-10" /> -->

    <Overlay v-if="addObservation">
      <div class="w-[90%] shadow-2xl bg-amber-100 sm:w-[700px] h-[400px] flex flex-col items-center rounded-none relative">
        <div class="w-full bg-amber-300 p-4 flex items-center justify-center relative shadow-sm">
          <Icon
            icon="mdi:close"
            width="24"
             height="24"
             class="text-[#121212] absolute top-4 right-4 cursor-pointer"
             @click="closeObservationNotePad"
          />
          <h2 class="text-[#121212] text-[18px] sm:text-2xl font-bold">Observações</h2>
        </div>
        <textarea
          v-model="observationText"
          class="outline-none p-4 w-full h-[90%] resize-none"
        ></textarea>
        <div v-if="observationText.length" class="w-full flex justify-end absolute bottom-0 right-4">
          <MainButton class="text-gray-600 w-fit h-11 rounded-none hover:underline" @click="cleanObservationInput">
            Limpar anotaões
          </MainButton>
          <MainButton class="text-[#121212] w-fit h-11 rounded-none hover:underline" @click="includeObservationInList">
            Salvar
          </MainButton>
        </div>
      </div>
    </Overlay>

    <Overlay v-if="isOpen">
      <div
        class="w-[90%] sm:w-[600px] min-h-[200px] bg-white rounded-sm p-4 shadow-2xl flex flex-col items-center justify-between gap-6"
      >
        <div class="w-full h-full flex items-start">
          <Icon
            icon="mdi:alert-circle"
            class="text-yellow-500"
            width="34"
            height="34"
          />
            <div class="ml-3 w-[90%]">
            <h3 class="text-[20px] font-semibold mb-3">Deseja adicionar uma observação para este item?</h3>
            <p class="text-gray-500 mb-4">
              Caso deseje, é possível incluir uma observação para este item como forma de lembrete ou informação adicional.
            </p>
            <label for="observation" class="flex items-center">
              <input
                type="checkbox"
                id="observation"
                v-model="disableObservationQuestion"
                class="mr-2 w-4 h-4"
                />
              <p>
                Não mostrar mais esta pergunta durante a criação dessa lista
              </p>
            </label>
            </div>
        </div>
        <div class="flex gap-2 justify-end w-full">
          <MainButton
            @click="includeProductInList"
            class="border-2 border-gray-300 h-11 w-fit text-gray-700 rounded-md hover:bg-gray-100"
          >
            Não, apenas salvar
          </MainButton>
          <MainButton @click="openObservationNotePad" class="bg-red-500 text-white h-11 w-24  rounded-md">
            Sim
          </MainButton>
        </div>
      </div>
    </Overlay>

    <!-- Modal for responsive layout -->
    <Overlay v-if="addProductInput" class="sm:hidden">
      <ModalLayout @close="toggleAddProductMobileInput">
        <template #body>
          <div class="flex flex-col w-full">
            <h3 class="font-bold">Adicione um item à lista</h3>
            <span class="text-gray-500 text-[14px] -leading-6">
              Preencha os campos para adicionar um item a lista.
            </span>

            <div class="w-full">
              <AddProductInput
                ref="addProductInputRef"
                @add-product="addProductInListOrObservation"
                class="mt-4"
              />
            </div>
          </div>
        </template>
      </ModalLayout>
    </Overlay>

    <!-- Modal de confirmação de remoção -->
    <Overlay v-if="isRemoveConfirmationOpen">
      <ModalLayout @close="toggleRemoveItemModalConfirmation">
        <template #body>
          <div class="flex flex-col w-full">
            <h3 class="text-[18px] font-bold text-red-600">Remover item</h3>
            <span class="text-gray-500 text-[16px] -leading-6 mb-4">
              Tem certeza que deseja remover o item <strong class="text-gray-800">{{ itemToRemove }}</strong> da lista?
            </span>

            <div class="flex gap-2 justify-end w-full">
              <MainButton
                @click="toggleRemoveItemModalConfirmation"
                class="border-2 border-gray-300 h-11 w-fit text-gray-700 rounded-md hover:bg-gray-100"
              >
                Cancelar
              </MainButton>
              <MainButton @click="removeItem" class="bg-red-500 text-white h-11 w-24  rounded-md">
                Remover
              </MainButton>
            </div>
          </div>
        </template>
      </ModalLayout>
    </Overlay>
  </div>
</template>
