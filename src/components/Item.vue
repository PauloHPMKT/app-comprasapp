<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import type { Item } from 'types/item';
import { useAuthStore } from '../store/auth';

type EmitEvents = {
  (e: 'delete-item', id: number): void;
  (e: 'edit-item'): void;
  (e: 'add-observation', id: number): void;
};
type ItemProps = Item.ToPurchase;

const emit = defineEmits<EmitEvents>();
const props = defineProps<ItemProps>()
const authStore = useAuthStore();

const isMenuOpen = ref(false);

const isLoggedIn = computed(() => {
  return authStore.isAuthenticated;
});

function showObservation() {
  if (props.observation) {
    alert(props.observation);
  }
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

function removeItem(id: number) {
  emit('delete-item', id);
  closeMenu();
}

function addObservation(id: number) {
  emit('add-observation', id);
  closeMenu();
}
</script>

<template>
  <li
    class="bg-white shadow-md/3 rounded-sm flex border-l-[6px] relative overflow-hidden"
    :style="{ borderLeftColor: isLoggedIn ? (category?.color || '#E5E7EB') : '#E5E7EB' }"
  >

    <div
      class="flex justify-between p-3 sm:px-6 transition-all duration-300 ease-in-out"
      :class="{
        'w-[calc(100%-8rem)]': isMenuOpen,
        'w-full': !isMenuOpen
      }"
    >
      <div class="flex items-cente justify-between w-full">
        <div
          class="flex flex-col gap-3 justify-between transition-all duration-300 ease-in-out"
          :class="{
            'w-[50%] sm:w-[55%]': isMenuOpen,
            'w-[50%] sm:w-[60%]': !isMenuOpen
          }"
        >
          <p
            class="text-gray-800 font-bold text-[16px] sm:text-[20px] truncate"
            :title="name"
          >
            {{ name }}
          </p>
          <span
            v-if="isLoggedIn"
            class="text-gray-400 truncate"
            :title="category?.name"
          >
            {{ category?.emoji }}
            {{ category?.name ?? "Sem categoria" }}
          </span>
        </div>

        <div class="flex sm:justify-between flex-shrink-0 transition-all duration-300 ease-in-out">
          <div class="flex flex-col items-start justify-start sm:mr-4 sm:w-[200px] mr-12">
            <span>{{ quantity }}</span>
          </div>
          <div class="text-right min-w-[100px]">
            <p
              class="font-extrabold text-gray-800 transition-all duration-300"
              :class="{
                'text-[14px]': isMenuOpen,
                'text-[16px] sm:text-[18px]': !isMenuOpen
              }"
            >
              {{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(price)) }}
            </p>
            <p
              v-if="quantity && Number(quantity) > 1"
              class="text-gray-500 transition-all duration-300"
              :class="{
                'text-[13px] my-1': isMenuOpen,
                'text-[14px] sm:text-[16px]': !isMenuOpen
              }"
            >
              {{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(totalItemPrice) ?? 0) }}
            </p>
            <div
              v-if="observation"
              class="flex items-center justify-end mt-1"
              :title="observation"
              @click="showObservation"
            >
              <Icon
                icon="wpf:note"
                class="text-red-300 transition-all duration-300"
                :width="isMenuOpen ? 14 : 20"
                :height="isMenuOpen ? 14 : 20"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex items-start justify-between cursor-pointer transition-all duration-300"
        :class="{ 'ml-2': isMenuOpen, 'ml-6': !isMenuOpen }"
      >
        <Icon
          icon="solar:menu-dots-bold"
          class="text-red-300 hover:text-red-500 transition-all duration-300"
          :class="{ 'rotate-90': isMenuOpen }"
          :width="isMenuOpen ? 20 : 26"
          :height="isMenuOpen ? 20 : 26"
          @click="toggleMenu"
        />
      </div>
    </div>

    <div
      class="absolute right-0 top-0 h-full bg-red-700 flex items-center justify-center gap-4 transition-all duration-300 ease-in-out z-20"
      :class="{
        'w-32 translate-x-0': isMenuOpen,
        'w-0 translate-x-full': !isMenuOpen
      }"
    >
      <Icon
        icon="wpf:note"
        width="20"
        height="20"
        class="text-white cursor-pointer hover:text-gray-300 transition-colors"
        @click="addObservation(props.orderId!)"
      />
      <Icon
        icon="mdi:trash-can-outline"
        width="24"
        height="24"
        class="text-white cursor-pointer hover:text-gray-300 transition-colors"
        @click="removeItem(props.orderId!)"
      />
      <Icon
        icon="lucide:edit"
        width="20"
        height="20"
        class="text-white cursor-pointer hover:text-gray-300 transition-colors"
        @click="$emit('edit-item')"
      />
    </div>
     <!-- ✅ Overlay invisível para fechar ao clicar fora -->
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 z-10"
      @click="closeMenu"
    ></div>
  </li>
</template>
