<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import MainButton from "../components/MainButton.vue";
import Overlay from "../components/Overlay.vue";
import CreateListTitleModal from "../components/CreateListTitleModal.vue";
import { useLoadingStore } from "../store/loading";
import { useModal } from "../composables/useModal";
import { useValidation } from "../composables/useValidation";
import emptyMarket from "../assets/img/img-casas.png";

const purchaseListTitle = ref("");
const purchaseLists = ref([
  {
    id: 1,
    name: "Compras do mês",
    value: 1000,
    date: "2025-01-01",
  },
  {
    id: 2,
    name: "Compras do ano",
    value: 12000,
    date: "2025-01-01",
  },
]);

const loadingStore = useLoadingStore();
const router = useRouter();
const { isOpen, open, close } = useModal();
const { useFieldValidation } = useValidation();
const {
  validateField,
  hasError,
  errorMessage,
  clearError
} = useFieldValidation(purchaseListTitle);

provide('modalActions', { open, close, resetModal });

function navigateToCreatePurchaseListView() {
  const isValid = validateField();
  if (!isValid) return;

  localStorage.setItem("purchase-list-title", purchaseListTitle.value);
  router.push({ name: "create-list" });
  close();
}

function resetModal() {
  clearError();
  purchaseListTitle.value = "";
  close();
}

onMounted(async () => {
  loadingStore.startLoading();
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
  } finally {
    loadingStore.stopLoading();
  }
});
</script>

<template>
  <div class="h-full w-full">
    <div
      v-if="purchaseLists.length"
      class="flex justify-center items-center h-full w-full"
    >
      <div class="flex flex-col gap-3 items-center justify-center rounded-lg">
        <div v-if="loadingStore.isLoading" class="w-52 h-26 rounded-lg animate-pulse flex items-center justify-center" style="animation-duration: 1.5s;">
          <div class="w-full h-full bg-gray-200 rounded-lg"></div>
        </div>
        <img v-else :src="emptyMarket" alt="Mercados vazios" class="w-48 rounded-lg" />
        <div>
          <div
            v-if="loadingStore.isLoading"
            class="w-68 h-8 rounded-lg animate-pulse flex items-center justify-center" style="animation-duration: 1.5s;"
          >
            <div class="w-full h-full bg-gray-200 rounded-lg"></div>
          </div>
          <p v-else class="text-gray-500 py-4">Você ainda não possui listas criadas</p>
        </div>
        <div
          v-if="loadingStore.isLoading"
          class="w-36 h-12 rounded-lg animate-pulse flex items-center justify-center" style="animation-duration: 1.5s;"
        >
          <div class="w-full h-full bg-gray-200 rounded-lg"></div>
        </div>
        <MainButton v-else @click="open" class="bg-red-500 h-11 rounded-md">
          Ir às compras
        </MainButton>
      </div>
    </div>
    <div v-else class="h-[77vh]">
      <div class="mb-8">
        <h2 class="text-3xl font-bold">Dashboard</h2>
      </div>
      <div class="flex h-full">
        <div class="w-1/2">
          <div class="flex w-full mb-4">
            <!-- Criar componente de input para englobar o icone de pesquisa -->
            <input
              type="text"
              placeholder="Nome do item"
              class="border border-gray-300 rounded-lg px-2 h-12 w-full"
            />
            <MainButton
              class="bg-red-600 flex items-center justify-center rounded-lg w-fit"
            >
              <Icon
                icon="material-symbols:search-rounded"
                width="28"
                height="28"
                class="text-bold text-white"
              />
            </MainButton>
          </div>
          <div
            class="bg-[#e2e2e2] rounded-lg gap-4 h-36 overflow-hidden relative"
          >
            <div class="flex justify-between px-4 py-3 h-full">
              <div class="w-[90%] flex flex-col pt-2">
                <p class="font-semibold">
                  Valor total de compras no ano de 2025
                </p>
                <span class="font-bold text-[25px] pb-3">R$ 1.000,00</span>
                <p class="text-gray-500">
                  Utilize os valores aqui gerados para ajudar a medir seu
                  orçamento
                </p>
              </div>
              <div class="w-[10%]">
                <!-- <img :src="greenCart" alt="Carrinho Verde" class="w-14" /> -->
              </div>
            </div>
            <div class="w-full bg-green-600 h-2 absolute bottom-0"></div>
          </div>
          <div
            class="border-t-2 border-gray-200 mt-4 py-3 h-[60%] overflow-hidden"
          >
            <ul class="overflow-auto h-full flex flex-col gap-2">
              <li class="bg-gray-50 flex flex-col px-4 py-3 rounded-lg gap-2">
                <div class="flex gap-4 mb-4 justify-start">
                  <Icon
                    icon="mingcute:check-fill"
                    width="24"
                    height="24"
                    class="text-green-600 bg-white rounded-full"
                  />
                  <div>
                    <h3 class="font-bold">Listas de compras do mês de abril</h3>
                    <p>Teste</p>
                  </div>
                </div>
                <div class="flex justify-between">
                  <div class="flex gap-4">
                    <Icon
                      icon="mdi:marketplace"
                      width="24"
                      height="24"
                      class="text-red-500"
                    />
                    <span class="text-gray-500"
                      >Items mais comprados no mês...</span
                    >
                  </div>
                  <div class="flex gap-2">
                    <span class="text-gray-800 font-bold">R$ 1.000,00</span>
                  </div>
                </div>
              </li>
              <li class="bg-gray-50 flex flex-col px-4 py-3 rounded-lg gap-2">
                <div class="flex gap-4 mb-4 justify-start">
                  <Icon
                    icon="mingcute:check-fill"
                    width="24"
                    height="24"
                    class="text-green-600 bg-white rounded-full"
                  />
                  <div>
                    <h3 class="font-bold">Listas de compras do mês de abril</h3>
                    <p>Teste</p>
                  </div>
                </div>
                <div class="flex justify-between">
                  <div class="flex gap-4">
                    <Icon
                      icon="mdi:marketplace"
                      width="24"
                      height="24"
                      class="text-red-500"
                    />
                    <span class="text-gray-500"
                      >Items mais comprados no mês...</span
                    >
                  </div>
                  <div class="flex gap-2">
                    <span class="text-gray-800 font-bold">R$ 1.000,00</span>
                  </div>
                </div>
              </li>
              <li class="bg-gray-50 flex flex-col px-4 py-3 rounded-lg gap-2">
                <div class="flex gap-4 mb-4 justify-start">
                  <Icon
                    icon="mingcute:check-fill"
                    width="24"
                    height="24"
                    class="text-green-600 bg-white rounded-full"
                  />
                  <div>
                    <h3 class="font-bold">Listas de compras do mês de abril</h3>
                    <p>Teste</p>
                  </div>
                </div>
                <div class="flex justify-between">
                  <div class="flex gap-4">
                    <Icon
                      icon="mdi:marketplace"
                      width="24"
                      height="24"
                      class="text-red-500"
                    />
                    <span class="text-gray-500"
                      >Items mais comprados no mês...</span
                    >
                  </div>
                  <div class="flex gap-2">
                    <span class="text-gray-800 font-bold">R$ 1.000,00</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-1/2">folder 2</div>
      </div>
    </div>

    <Overlay v-if="isOpen">
      <CreateListTitleModal
        :purchase-list-title="purchaseListTitle"
        :hasError="hasError"
        :errorMessage="errorMessage"
        @update:purchase-list-title="purchaseListTitle = $event"
        @navigate-to-create-purchase-list-view="navigateToCreatePurchaseListView"
      />
    </Overlay>
  </div>
</template>
