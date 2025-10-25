<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { Icon } from '@iconify/vue';
import { useStyles } from "../composables/useStyles";

const router = useRouter();
const { mergeStyles, attrs } = useStyles();

interface Props {
  isOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false
});

const emit = defineEmits<{
  close: []
  createNewList: []
}>();

// Computed para verificar qual item está ativo
const isCreateListActive = computed(() => {
  return router.currentRoute.value.name === 'create-list';
});

const isMyListsActive = computed(() => {
  return router.currentRoute.value.name === 'lists';
});

function close() {
  emit('close');
}

function handleCreateNewList() {
  emit('createNewList');
  close();
}

function handleMyLists() {
  router.push('/app/lists');
  close();
}
</script>

<template>
  <div
    v-if="props && props?.isOpen"
    v-bind="attrs"
    :class="mergeStyles(
      'bg-white border-gray-200 flex transition-transform duration-300 ease-in-out w-full h-full',
      props?.isOpen ? 'translate-x-0' : 'translate-x-full'
    )"
  >
    <ul class="flex flex-col mt-4 w-full">
      <li
        @click="handleCreateNewList"
        class="flex items-center gap-3 p-3 cursor-pointer transition-colors relative overflow-hidden group"
        :class="{
          'bg-red-50 border-r-4 border-red-500 text-red-600': isCreateListActive,
          'hover:bg-gray-100 active:bg-gray-200': !isCreateListActive
        }"
      >
        <span
          v-if="!isCreateListActive"
          class="absolute inset-0 bg-gray-300 scale-0 group-active:scale-100 transition-transform duration-500 ease-out origin-center opacity-30"
        ></span>
        <Icon
          icon="solar:pen-new-square-outline"
          width="24"
          height="24"
          class="relative z-10"
          :class="{ 'text-red-600': isCreateListActive, 'text-gray-700': !isCreateListActive }"
        />
        <p class="font-semibold relative z-10" :class="{ 'text-red-600': isCreateListActive }">
          Criar nova lista
        </p>
      </li>
      <li
        @click="handleMyLists"
        class="flex items-center gap-3 p-3 cursor-pointer transition-colors relative overflow-hidden group"
        :class="{
          'bg-red-50 border-r-4 border-red-500 text-red-600': isMyListsActive,
          'hover:bg-gray-100 active:bg-gray-200': !isMyListsActive
        }"
      >
        <span
          v-if="!isMyListsActive"
          class="absolute inset-0 bg-gray-300 scale-0 group-active:scale-100 transition-transform duration-500 ease-out origin-center opacity-30"
        ></span>
        <Icon 
          icon="tabler:list" 
          width="24" 
          height="24" 
          class="relative z-10"
          :class="{ 'text-red-600': isMyListsActive, 'text-gray-700': !isMyListsActive }"
        />
        <p class="font-semibold relative z-10" :class="{ 'text-red-600': isMyListsActive }">
          Minhas listas
        </p>
      </li>
    </ul>
  </div>
</template>
