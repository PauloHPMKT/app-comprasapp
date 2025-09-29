<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import MainButton from '../components/MainButton.vue';

const router = useRouter();

function navigateToAccountView() {
  router.push({ name: "account" });
}

function navigateToPurchaseListView() {
  // fazer implementação do componente de input do nome da lista
  router.push({ name: "purchase-list" });
}
</script>

<template>
  <header
    class="flex justify-between items-center font-bold sm:px-32 py-3 px-3 border-b border-gray-100 bg-white"
  >
    <img
      alt="Comprasapp logo horizontal"
      src="../assets/img/comprasapp-horizontal-logo.png"
      class="sm:h-16 h-14 object-contain"
    />
    <div class="gap-2 items-center h-full sm:flex hidden">
      <MainButton
        @click="navigateToAccountView"
        class="bg-gray-200 h-10 hover:bg-gray-300 text-gray-900 font-semibold px-4 rounded-lg"
      >
        Gerenciar minhas listas
      </MainButton>
      <MainButton
        @click="navigateToPurchaseListView"
        class="bg-[#121212] h-10 hover:bg-gray-800 text-white font-normal px-4 rounded-lg">
        Criar lista
      </MainButton>
    </div>
    <div class="sm:hidden flex items-center cursor-pointer">
      <Icon icon="tabler:align-right" width="40" height="40" />
    </div>
  </header>
  <main class="w-full sm:h-[calc(100vh-5rem)] sm:flex items-center justify-center sm:px-32 px-3">
    <div class="sm:w-1/2 w-full h-full flex flex-col justify-center sm:mt-0 mt-22">
      <div class="mb-12">
        <h1 class="text-4xl sm:text-6xl font-extrabold sm:leading-18 leading-tight">
          Compras<span class="text-red-500">app</span><br/>
          Sua lista de compras simples, rápida e sempre à mão!
        </h1>
        <p class="mt-6 text-lg sm:text-xl text-gray-600">
          Organize suas compras com o Comprasapp.<br/> Crie e gerencie listas de compras de forma prática, onde e quando quiser.
        </p>
        <MainButton
          @click="navigateToPurchaseListView"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg mt-8 w-fit"
        >
          Criar minha lista de compras
        </MainButton>
      </div>
    </div>
    <div class="sm:w-1/2 w-full sm:pl-8 pl-0 h-full sm:flex flex-col items-center justify-center">
      <div class="sm:relative w-full h-full flex items-center">
        <img
          alt="Shopping illustration"
          src="../assets/img/banner.png"
          class="w-full sm:rounded-3xl rounded-2xl h-auto object-cover shadow-xl/30 mb-22 sm:mt-0 mt-12"
        />
        <div
          class="hidden sm:flex absolute top-0 left-15 h-[550px] w-[540px] -z-10 rounded-b-2xl shadow bg-gray-100"
        ></div>
      </div>
    </div>
  </main>
  <footer class="bg-gray-900 py-4 gap-2">
    <div class="w-full flex justify-between cursor-pointer sm:px-32 px-3 py-4 h-32">
      <div class="w-[100px] sm:w-fit sm:h-10 h-8 px-3 py-1 rounded-md flex items-center bg-white">
        <img
          alt="Comprasapp logo horizontal"
          src="../assets/img/comprasapp-horizontal-logo.png"
          class="h-full object-contain w-full"
        />
      </div>
      <div class="flex flex-col items-end">
        <p class="text-white">Converse com o suporte:</p>
        <div class="flex gap-4 mt-2">
          <a
            href="https://www.instagram.com/paulo_devmais"
            target="_blank"
            rel="noopener"
          >
            <img
              alt="WhatsApp icon"
              src="../assets/img/insta-icon.png"
              class="inline h-6 w-6 object-contain"
            />
          </a>
          <a href="https://github.com/PauloHPMKT" target="_blank" rel="noopener">
            <img
              alt="WhatsApp icon"
              src="../assets/img/github-icon.png"
              class="inline h-6 w-6 object-contain"
            />
          </a>
        </div>
      </div>
    </div>
    <div class="w-full h-12 flex items-center justify-center">
      <p class="text-gray-500 text-sm">{{ new Date().getFullYear() }} Comprasapp.</p>
    </div>
  </footer>
</template>
