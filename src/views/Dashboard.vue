<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import MainButton from "../components/MainButton.vue";
import Input from "../components/Input.vue";
import Overlay from "../components/Overlay.vue";
import Modal from "../components/Modal.vue";
// import greenCart from "../assets/img/Logo-carrinho-verde.png";
import emptyMarket from "../assets/img/img-casas.png";
import { useModal } from "../composables/useModal";

const router = useRouter();
const { isOpen, open, close } = useModal();

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
const purchaseListTitle = ref("");

function navigateToCreatePurchaseListView() {
  isOpen.value = false;
  localStorage.setItem("purchase-list-title", purchaseListTitle.value); // provisório, será utilizado indexDB
  router.push({ name: "purchase-list-creation" });
}
</script>

<template>
  <div class="h-full w-full">
    <div
      v-if="purchaseLists.length"
      class="flex justify-center items-center h-full w-full"
    >
      <div class="flex flex-col items-center justify-center rounded-lg">
        <img :src="emptyMarket" alt="Mercados vazios" class="w-48 rounded-lg" />
        <p class="text-gray-500 py-4">Você ainda não possui listas criadas</p>
        <MainButton @click="open" class="bg-red-600 h-11">
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
      <Modal :modal-value="isOpen" @close="close">
        <h3 class="font-bold">Adicione um título à lista</h3>
        <span class="text-gray-500 text-[14px] -leading-6">
          Para melhor organização das suas listas de compras adicione um título
          a cada uma delas.
        </span>
        <div class="flex flex-col items-center gap-4 mt-4">
          <Input
            placeholder="Insira o título da lista"
            v-model="purchaseListTitle"
            class="w-full h-11 border-2"
          />
          <MainButton
            @click="navigateToCreatePurchaseListView"
            class="bg-red-600 h-11 w-full"
          >
            Criar Lista
          </MainButton>
        </div>
      </Modal>
    </Overlay>
  </div>
</template>
