<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info'
});

const emit = defineEmits<{
  close: []
}>();

const iconConfig = computed(() => {
  const configs = {
    success: {
      bgColor: 'bg-green-100 dark:bg-green-800',
      textColor: 'text-green-500 dark:text-green-200',
      icon: `<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>`
    },
    error: {
      bgColor: 'bg-red-100 dark:bg-red-800',
      textColor: 'text-red-500 dark:text-red-200',
      icon: `<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>`
    },
    warning: {
      bgColor: 'bg-orange-100 dark:bg-orange-800',
      textColor: 'text-orange-500 dark:text-orange-200',
      icon: `<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>`
    },
    info: {
      bgColor: 'bg-blue-100 dark:bg-blue-800',
      textColor: 'text-blue-500 dark:text-blue-200',
      icon: `<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>`
    }
  };
  return configs[props.type];
});

function handleClose() {
  emit('close');
  props.onClose?.();
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 transform"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition duration-200 transform"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <div
      class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-900 bg-white rounded-lg shadow-lg"
      role="alert"
    >
      <div
        :class="[
          'inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg',
          iconConfig.bgColor,
          iconConfig.textColor
        ]"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
          v-html="iconConfig.icon"
        ></svg>
      </div>
      <div class="ms-3 text-sm font-normal">{{ message }}</div>
      <button
        type="button"
        @click="handleClose"
        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
        aria-label="Close"
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>
