<script setup lang="ts">
import Toast from './Toast.vue';
import { useToast } from '../composables/useToast';

const { toasts, removeToast } = useToast();
</script>

<template>
  <Teleport to="body">
    <div class="toast-debug">
      <div
        v-if="toasts.length"
        class="fixed top-4 right-4 z-50 space-y-2"
      >
        <TransitionGroup
          name="toast"
          tag="div"
          class="space-y-2"
        >
          <Toast
            v-for="toast in toasts"
            :key="toast.id"
            :message="toast.message"
            :type="toast.type"
            @close="removeToast(toast.id)"
          />
        </TransitionGroup>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
