// src/composables/useToast.ts
import { ref } from 'vue';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

// ✅ Estado global dos toasts
const toasts = ref<ToastMessage[]>([]);

export const useToast = () => {
  function addToast(toast: ToastMessage) {
    console.log('📋 Adding toast:', toast); // Debug
    toasts.value.push(toast);

    // Auto remove após duration
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);
    }
  }

  function removeToast(id: string) {
    console.log('🗑️ Removing toast:', id); // Debug
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  }

  return {
    toasts,
    addToast,
    removeToast
  };
};
