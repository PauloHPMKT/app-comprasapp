<script setup lang="ts">
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import PageHeaderTitle from "../components/PageHeaderTitle.vue";
import MainButton from "../components/MainButton.vue";
import Overlay from "../components/Overlay.vue";
import PurchaseItem from "../components/Item.vue";
import ModalLayout from "../components/ModalLayout.vue";
import AddProductInput from "../components/AddProductInput.vue";
import { supabase } from "../services/api/supabase";
import { usePurchaseList } from "../composables/usePurchaseList";
import type { Purchases } from "types/purchases";
import emptyListImage from "../assets/img/empty-list.png";

const {
  purchaseItems,
  observationDescription,
  addProductToList,
  fillCurrentProduct,
  addObservationToCurrentProduct,
  cleanObservationInput,
  calculateTotalItemsPrice,
} = usePurchaseList();

const editingItemId = ref<number | null>(null);
const removingItemId = ref<number | null>(null);
const addProductInput = ref(false);
const addObservation = ref(false);
const isRemoveConfirmationOpen = ref(false);
const purchaseListTitle = ref(localStorage.getItem("purchase-list-title")!);
// observation data
const observationQuestion = ref(false);
const disableObservationQuestion = ref(false);
// refs instances
const addProductInputRef = ref<InstanceType<typeof AddProductInput>>();
const addProductInputMobileRef = ref<InstanceType<typeof AddProductInput>>();

const reversedPurchaseItems = computed(() => {
  return [...purchaseItems].reverse();
});

const itemToRemove = computed(() => {
  const item = purchaseItems.find(item => item.orderId === removingItemId.value);
  return item ? item.name : '';
});

function toggleObservationQuestionModal() {
  observationQuestion.value = !observationQuestion.value;
}

function addProductInListOrObservation(product: Purchases.Item) {
  fillCurrentProduct(product);

  if (!localStorage.getItem('disable-observation-question')) {
    toggleObservationQuestionModal();
    return;
  }

  includeProductInList();
}

function includeObservationInList() {
  addObservationToCurrentProduct();

  addProductToList();
  closeObservationNotePad();
  clearFormInput();
}

function includeProductInList() {
  if (disableObservationQuestion.value) {
    localStorage.setItem("disable-observation-question", "true");
    disableObservationQuestion.value = true;
  }

  addProductToList();
  clearFormInput();

  if (observationQuestion.value) {
    toggleObservationQuestionModal();
  }

}

function closeObservationNotePad() {
  addObservation.value = false;
  cleanObservationInput();

  if (editingItemId.value) {
    editingItemId.value = null;
  }
}

async function savePurchaseList() {
  if (localStorage.getItem('disable-observation-question')) {
    localStorage.removeItem("disable-observation-question");
    disableObservationQuestion.value = false;
  }

  /**
   * Antes de enviar para a página onde as listas de compras são exibidas
   * é necessário definir a estrategia de armazenamento e recuperação das listas
   * no modo não logado.
   */

  // aqui é provisório!!
  const calculateTotalListPrices = purchaseItems.reduce((acc, item) => {
    const itemPrice = Number(item.totalItemPrice) ?? 0;
    return acc + itemPrice;
  }, 0);

  const purchaseListData: Purchases.List = {
    title: purchaseListTitle.value,
    items: purchaseItems,
    totalItems: purchaseItems.length,
    totalPrice: calculateTotalListPrices,
    observation: '',
  }
  console.log(purchaseListData);
  localStorage.setItem('purchase-list-data', JSON.stringify(purchaseListData));
  // const { data, error } = await supabase().from('lists').insert([
  //   {
  //     title: purchaseListData.title,
  //     items: purchaseListData.items,
  //     total_items: purchaseListData.totalItems,
  //     total_price: purchaseListData.totalPrice,
  //     observation: purchaseListData.observation,
  //   }
  // ])
  // console.log({ data, error });
  const { data, error } = await supabase()
    .from('lists')
    .select('*')
  console.log(data)
  //return router.push({ name: 'lists' });
}

function openObservationNotePad(OrderId?: number) {
  if (observationQuestion.value) {
    toggleObservationQuestionModal();
  }

  const itemToAddObservation = purchaseItems.some(item => item.orderId === OrderId);
  if (OrderId && itemToAddObservation) {
    editingItemId.value = OrderId;
    addObservation.value = true;
    return;
  }
  addObservation.value = true;
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

// function removeItem() {
//   purchaseItems = purchaseItems.filter(item => item.orderId !== removingItemId.value);
//   toggleRemoveItemModalConfirmation();
// }

function clearFormInput() {
  addProductInput.value
    ? addProductInputMobileRef.value?.clearForm()
    : addProductInputRef.value?.clearForm();
}

</script>

<template>
  <div class="flex flex-col overflow-hidden w-full">
    <div class="pb-4 border-b-2 border-gray-300 w-full">
      <PageHeaderTitle
        :title="purchaseListTitle!"
        subtitle="Insira os dados dos produtos para preencera sua lista de compras."
        has-back-navigation-arrow
        class="mb-0"
      />

      <div class="hidden sm:block w-full mt-4">
        <AddProductInput
          ref="addProductInputRef"
          @add-product="addProductInListOrObservation"
        />
      </div>

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
      class="sm:h-[15%] sm:flex items-center justify-between text-gray-500 border-t border-gray-300"
    >
      <div class="py-3">
        <h4 class="font-bold sm:text-[20px]">Resumo da Compra:</h4>
        <div class="flex items-center gap-3">
          <p class="text-[14px] sm:text-[20px]">total de itens na lista:
            <span class="font-extrabold text-gray-900">
              {{ purchaseItems.length }}
            </span>
          </p>
          <p class="text-[14px] sm:text-[20px]">total da compra:
            <span class="font-extrabold text-gray-900">
              {{ calculateTotalItemsPrice }}
            </span>
          </p>
        </div>
      </div>
      <!-- Mudar label do botao para Criar Lista -->
      <MainButton class="bg-gray-900 text-white w-fit h-11" @click="savePurchaseList">
        <p class="text-[14px] sm:text-[16px]">Criar Lista</p>
        <Icon icon="mdi:check" width="20" height="20" />
      </MainButton>
    </div>

    <!-- <NewCategory ref="showCreateNewCategoryModal" @create-category="addNewCategory" class="z-10" /> -->

    <Overlay v-if="addObservation" class="absolute z-30">
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
          v-model="observationDescription"
          class="outline-none p-4 w-full h-[90%] resize-none"
        ></textarea>
        <div v-if="observationDescription.length" class="w-full flex justify-end absolute bottom-0 right-4">
          <MainButton class="text-gray-600 w-fit h-11 rounded-none hover:underline" @click="cleanObservationInput">
            Limpar anotaões
          </MainButton>
          <MainButton class="text-[#121212] w-fit h-11 rounded-none hover:underline" @click="includeObservationInList">
            Salvar
          </MainButton>
        </div>
      </div>
    </Overlay>

    <Overlay v-if="observationQuestion" class="absolute z-30">
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
            <label for="observation" class="flex sm:items-center items-start">
              <input
                type="checkbox"
                id="observation"
                v-model="disableObservationQuestion"
                class="mt-1 sm:mt-0 mr-2 w-4 h-4"
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
    <Overlay
      v-if="addProductInput"
      class="sm:hidden"
    >
      <ModalLayout @close="toggleAddProductMobileInput">
        <template #body>
          <div class="flex flex-col w-full">
            <h3 class="font-bold">Adicione um item à lista</h3>
            <span class="text-gray-500 text-[14px] -leading-6">
              Preencha os campos para adicionar um item a lista.
            </span>

            <AddProductInput
              v-if="addProductInput"
              ref="addProductInputMobileRef"
              @add-product="addProductInListOrObservation"
            />
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
              <!-- <MainButton @click="removeItem" class="bg-red-500 text-white h-11 w-24  rounded-md">
                Remover
              </MainButton> -->
            </div>
          </div>
        </template>
      </ModalLayout>
    </Overlay>
  </div>
</template>
