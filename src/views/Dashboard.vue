<script setup lang="ts">
import {
  ref,
  watch,
  reactive,
  computed,
  onMounted,
} from "vue";
import Overlay from "../components/Overlay.vue";
import MainButton from "../components/MainButton.vue";
import PageHeaderTitle from "../components/PageHeaderTitle.vue";
import DefineBudgetModal from "../components/DefineBudgetModal.vue";
import type { Purchases } from "../types/purchases";
import { useAuthStore } from "../store/auth";
import { useLoadingStore } from "../store/loading";
import { useCreateListTitleModalStore } from "../store/createListTitleModal";
import emptyMarket from "../assets/img/img-casas.png";
import List from "../components/PurchasesLists/List.vue";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const createListTitleModal = useCreateListTitleModalStore();

const purchaseLists = reactive<Purchases.List[]>([]);
const isBudgetModalOpen = ref(false);
const budgetValue = ref<string>('');

const isLoggedIn = computed(() => authStore.isAuthenticated);

watch(() => localStorage.getItem('monthly-budget'), (newValue) => {
  if (newValue) {
    budgetValue.value = newValue;
  }
}, { immediate: true });

function openBudgetModal() {
  isBudgetModalOpen.value = true;
}

function closeBudgetModal() {
  isBudgetModalOpen.value = false;
}

// função provisória
function handleBudgetSubmit(value: string) {
  localStorage.setItem('monthly-budget', value);
  budgetValue.value = value;
  closeBudgetModal();
}

onMounted(async () => {
  loadingStore.startLoading();
  if (localStorage.getItem("purchase-list-data")) {
    const list = JSON.parse(localStorage.getItem("purchase-list-data")!);
    purchaseLists.push(...list); //aqui existe um problema
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  } finally {
    loadingStore.stopLoading();
  }
});
</script>

<template>
  <div class="h-full w-full overflow-y-auto">
    <div
      v-if="purchaseLists.length"
      class="flex justify-center items-center h-full w-full"
    >
      <div class="flex flex-col gap-3 items-center justify-center rounded-lg">
        <div
          v-if="loadingStore.isLoading"
          class="w-52 h-26 rounded-lg animate-pulse flex items-center justify-center"
          style="animation-duration: 1.5s"
        >
          <div class="w-full h-full bg-gray-200 rounded-lg"></div>
        </div>
        <img
          v-else
          :src="emptyMarket"
          alt="Mercados vazios"
          class="w-48 rounded-lg"
        />
        <div>
          <div
            v-if="loadingStore.isLoading"
            class="w-68 h-8 rounded-lg animate-pulse flex items-center justify-center"
            style="animation-duration: 1.5s"
          >
            <div class="w-full h-full bg-gray-200 rounded-lg"></div>
          </div>
          <p v-else class="text-gray-500 py-4">
            Você ainda não possui listas criadas
          </p>
        </div>
        <div
          v-if="loadingStore.isLoading"
          class="w-36 h-12 rounded-lg animate-pulse flex items-center justify-center"
          style="animation-duration: 1.5s"
        >
          <div class="w-full h-full bg-gray-200 rounded-lg"></div>
        </div>
        <MainButton
          v-else
          @click="createListTitleModal.openListTitleModal"
          class="bg-gray-800 h-11 rounded-md"
        >
          Ir às compras
        </MainButton>
      </div>
    </div>
    <div v-else>
      <PageHeaderTitle
        title="Visão Geral"
        subtitle="Acompanhe sua movimentação de compras e gerencie sua carteira"
      />
      <div class="min-h-full w-full bg-gray-50 px-2 sm:px-4">
        <div class="pt-1">
          <MainButton
            @click="createListTitleModal.openListTitleModal"
            class="bg-gray-800 h-10 rounded-md hidden sm:flex"
          >
            Criar nova lista de compras +
          </MainButton>

          <div v-if="isLoggedIn">
            <div class="sm:flex sm:justify-between sm:items-center sm:mt-6 mb-4">
              <h2 class="text-2xl font-semibold text-gray-800">
                Gerenciamento da carteira
              </h2>
              <div
                v-if="isLoggedIn"
                class="flex gap-2 overflow-x-auto sm:w-1/2 p-2 rounded-lg snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
              >
                <div class="snap-start flex-shrink-0 text-gray-500 text-sm bg-gray-200 px-3 py-1 rounded-full w-fit whitespace-nowrap">
                  Julho de 2025
                </div>
                <div class="snap-start flex-shrink-0 text-gray-500 text-sm bg-gray-200 px-3 py-1 rounded-full w-fit whitespace-nowrap">
                  Exportar resumo
                </div>
                <div class="snap-start flex-shrink-0 text-gray-500 text-sm bg-gray-200 px-3 py-1 rounded-full w-fit whitespace-nowrap">
                  Filtrar por período
                </div>
              </div>
            </div>
            <div
              class="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              :class="{ 'mb-10': isLoggedIn, 'mb-3': !isLoggedIn }"
            >
              <!-- Card 1: Orçamento Mensal (Foco Visual Principal) -->
              <div
                class="min-w-[320px] sm:min-w-[400px] snap-start bg-white soft-shadow rounded-md overflow-hidden"
              >
                <div
                  v-if="!budgetValue"
                  class="flex flex-col items-center justify-center mt-4"
                >
                  <img src="../assets/img/10060033.png" alt="" class="w-16 h-16"/>
                  <div class="w-full">
                    <p class="text-center p-2 font-semibold">
                      Você ainda não definiu um orçamento mensal
                    </p>
                  <MainButton
                    @click="openBudgetModal"
                    class="mx-auto mb-6 px-4 py-2 text-sm font-semibold bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-150"
                  >
                    Adicionar Orçamento Mensal
                  </MainButton>
                  </div>
                </div>
                <div v-else class="p-6">
                  <div class="flex items-center space-x-4">
                    <div class="sm:text-left sm:mt-0">
                      <p class="text-sm font-medium text-gray-500">
                        Orçamento Mensal Utilizado
                      </p>
                      <p class="text-3xl font-extrabold text-gray-900 mt-1">
                        R$ {{ budgetValue }}
                      </p>
                      <span class="text-sm text-gray-400">
                        R$ 300,00 Restante (Total: R$ 1000)
                      </span>
                    </div>
                  </div>
                  <MainButton
                    class="mt-2 sm:mt-4 px-4 py-2 text-sm font-semibold bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-150"
                  >
                    Ajustar Orçamento
                  </MainButton>
                </div>
              </div>

              <!-- Total de listas criadas -->
              <div class="min-w-[280px] snap-start bg-white soft-shadow rounded-md overflow-hidden">
                <div class="p-6">
                  <p class="text-sm font-medium text-gray-500">listas criadas no mês</p>
                  <p class="text-4xl font-bold text-gray-900 mt-1">5</p>
                  <div class="flex items-center mt-2">
                    <p class="text-sm text-gray-500">
                      Somatório de listas criadas <br/>(Entre ativas e concluídas)<br/>
                      <span class="text-lg font-semibold text-green-600 bg-gray-50 px-2 py-0.5 rounded-full w-fit">
                        R$ 319,00
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Card 2: Economia no Mês -->
              <div class="min-w-[280px] snap-start bg-white soft-shadow rounded-md overflow-hidden">
                <div class="p-6">
                  <p class="text-sm font-medium text-gray-500">Economia em Julho</p>
                  <p class="text-4xl font-bold text-gray-900 mt-1">R$ 85,50</p>
                  <div class="flex items-center mt-2">
                    <span
                      class="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full"
                      >3.2%</span
                    >
                    <span class="text-sm text-gray-400 ml-2"
                      >Menor que o mês anterior</span
                    >
                  </div>
                </div>
              </div>

              <!-- Card 3: Preço Médio por Item -->
              <div class="min-w-[280px] snap-start bg-white soft-shadow overflow-hidden rounded-md">
                <div class="p-6">
                  <p class="text-sm font-medium text-gray-500">
                    Preço Médio por Item
                  </p>
                  <p class="text-4xl font-bold text-gray-900 mt-1">R$ 15,20</p>
                  <span class="text-sm text-gray-400">Média em listas ativas</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Coluna 1: Lista de Compras Prioritárias (Main Content) -->
            <div class="lg:col-span-2" :class="{ 'mt-6': !isLoggedIn }">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                Listas Ativas e em Andamento
              </h2>
              <div id="list-container" class="space-y-5">
                <!-- Exemplo de Card de Lista (com detalhe financeiro) -->
                 <ul>
                   <List />
                 </ul>

                <!-- Exemplo de Lista 2 (Dentro do Orçamento) -->
                <div
                  onclick="console.log('Abrir Lista 2')"
                  class="list-card soft-shadow cursor-pointer bg-white p-5 rounded-md"
                >
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-extrabold text-gray-900">
                      Compras da Farmácia
                    </h3>
                  </div>

                  <p class="text-sm text-gray-600 mb-2">
                    10/10 Itens (100%) Concluídos
                  </p>
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      class="bg-green-600 h-2.5 rounded-full"
                      style="width: 100%"
                    ></div>
                  </div>

                  <!-- Detalhes Financeiros -->
                  <div
                    class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100"
                  >
                    <div>
                      <p class="text-xs font-medium text-gray-500">Valor da lista</p>
                      <p class="text-lg font-bold text-gray-900">R$ 120,00</p>
                    </div>
                    <div v-if="isLoggedIn">
                      <p class="text-xs font-medium text-gray-500">
                        Gasto Real
                      </p>
                      <p class="text-lg font-bold text-green-600">R$ 115,00</p>
                      <span class="text-xs text-green-500 font-medium"
                        >R$ 5,00 Economizados!</span
                      >
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  class="block text-center my-6 text-gray-700 font-semibold hover:text-gray-500 transition duration-150"
                >
                  Ver histórico e listas concluídas &rarr;
                </a>
              </div>
            </div>
            <!-- Total de listas criadas (Esses cards serao transformados em componentes)-->
            <div
              v-if="!isLoggedIn"
              class="sm:mt-18 h-52 mb-4 min-w-[280px] snap-start bg-white soft-shadow rounded-md overflow-hidden"
            >
              <div class="p-6 shadow">
                <p class="text-sm font-medium text-gray-500">listas criadas no mês</p>
                <p class="text-4xl font-bold text-gray-900 mt-1">5</p>
                <div class="flex items-center mt-2">
                  <p class="text-sm text-gray-500">
                    Somatório de listas criadas <br/>(Entre ativas e concluídas)<br/>
                    <span class="text-lg font-semibold text-green-600 bg-gray-50 px-2 py-0.5 rounded-full w-fit">
                      R$ 319,00
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Overlay v-if="isBudgetModalOpen">
      <DefineBudgetModal
        @submit-budget-value="handleBudgetSubmit"
        @close="closeBudgetModal"
      />
    </Overlay>
  </div>
</template>
