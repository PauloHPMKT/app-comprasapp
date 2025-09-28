<script lang="ts" setup>
</script>

<template>
  <header class="flex justify-between items-center font-bold sm:px-32 py-3 px-3 border-b border-gray-100 bg-white">
    <img
      alt="Vue logo"
      src="../assets/img/comprasapp-horizontal-logo.png"
      class="sm:h-16 h-14 object-contain"
    />
    <!-- TODO Esconder botões no modo responsivo -->
    <div class="gap-2 items-center h-full sm:flex hidden">
      <button class="bg-gray-200 h-12 hover:bg-gray-300 font-semibold px-6 rounded-lg">
        Gerenciar minhas listas
      </button>
      <button class="bg-[#121212] h-12 hover:bg-gray-800 text-white font-normal px-6 rounded-lg">
        Criar lista
      </button>
    </div>
  </header>
  <main class="w-full h-[calc(100vh-5rem)] flex items-center justify-center sm:px-32 px-3">
    <div class="sm:w-1/2 w-full h-full flex flex-col justify-center">
      <div class="mb-12">
        <h1 class="text-4xl sm:text-6xl font-extrabold sm:leading-18 leading-tight">
          Compras<span class="text-red-500">app</span><br/>
          Sua lista de compras simples, rápida e sempre à mão!
        </h1>
        <p class="mt-6 text-lg sm:text-xl text-gray-600">
          Organize suas compras com o Comprasapp.<br/> Crie e gerencie listas de compras de forma prática, onde e quando quiser.
        </p>
        <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg mt-8 w-fit">
          Criar minha lista de compras
        </button>
      </div>
    </div>
    <div class="w-1/2 pl-8 h-full hidden sm:flex flex-col items-center justify-center">
      <div class="relative w-full h-full flex items-center">
        <img
          alt="Shopping illustration"
          src="../assets/img/banner.png"
          class="w-full rounded-3xl h-auto object-cover shadow-xl/30 mb-22"
        />
        <div class="absolute top-0 left-15 h-[550px] w-[540px] -z-10 rounded-b-2xl shadow bg-gray-100"></div>
      </div>
    </div>
  </main>
</template>
