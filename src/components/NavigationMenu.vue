<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Icon } from '@iconify/vue';

const router = useRouter();

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
    v-if="props.isOpen"
    class="fixed bottom-0 right-0 w-64 h-full bg-white shadow-lg border-gray-200 flex sm:hidden transition-transform duration-300 ease-in-out z-50"
    :class="props.isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <ul class="flex flex-col mt-4 w-full">
      <li
        v-if="router.currentRoute.value.name === 'dashboard'"
        @click="handleCreateNewList"
        class="flex items-center gap-3 p-3 cursor-pointer transition-colors hover:bg-gray-100 active:bg-gray-200 relative overflow-hidden group"
      >
        <span
          class="absolute inset-0 bg-gray-300 scale-0 group-active:scale-100 transition-transform duration-500 ease-out origin-center opacity-30"
        ></span>
        <Icon
          icon="solar:pen-new-square-outline"
          width="24"
          height="24"
          class="relative z-10"
        />
        <p class="font-semibold relative z-10">Criar nova lista</p>
      </li>
      <li
        @click="handleMyLists"
        class="flex items-center gap-3 p-3 cursor-pointer transition-colors hover:bg-gray-100 active:bg-gray-200 relative overflow-hidden group"
      >
        <span
          class="absolute inset-0 bg-gray-300 scale-0 group-active:scale-100 transition-transform duration-500 ease-out origin-center opacity-30"
        ></span>
        <Icon icon="tabler:list" width="24" height="24" class="relative z-10" />
        <p class="font-semibold relative z-10">Minhas listas</p>
      </li>
    </ul>
  </div>
</template>
