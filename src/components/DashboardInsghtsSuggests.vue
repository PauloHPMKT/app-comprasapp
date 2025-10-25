<template>
  <!-- Coluna 2: Insights e Ações Rápidas (Side Panel) -->
  <div class="lg:col-span-1">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">
      Insights & Sugestões
    </h2>
    <div class="space-y-6">
      <!-- Card de Insight 1: Alerta de Preço (Ação Financeira Imediata) -->
      <div class="bg-white soft-shadow p-5 rounded-xl">
        <div class="flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-yellow-500 flex-shrink-0 mr-3 mt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <p class="font-bold text-gray-900">Alerta de Preço Baixo</p>
            <p class="text-sm text-gray-600 mt-1">
              O preço do **Café Premium** está 20% abaixo da sua média. Adicione
              à sua próxima lista!
            </p>
            <button
              class="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Adicionar Item &rarr;
            </button>
          </div>
        </div>
      </div>

      <!-- Card de Insight 2: Análise de Categoria (Gerenciamento) -->
      <div class="bg-white soft-shadow p-5 rounded-xl">
        <div class="flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-purple-500 flex-shrink-0 mr-3 mt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0h6"
            />
          </svg>
          <div>
            <p class="font-bold text-gray-900">Sua Categoria Mais Cara</p>
            <p class="text-sm text-gray-600 mt-1">
              **Carnes e Frios** representa 45% do seu gasto mensal. Considere
              criar um teto de gasto para ela.
            </p>
            <button
              class="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Ver Detalhes do Gasto &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
