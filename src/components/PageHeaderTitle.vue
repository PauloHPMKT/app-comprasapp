<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

interface PageHeaderTitleProps {
  title: string;
  subtitle: string;
}
defineProps<PageHeaderTitleProps>();

const router = useRouter();

function backToDashboard() {
  router.replace({ name: 'dashboard' });
}
</script>

<template>
  <div class="flex gap-4">
    <Icon
      icon="material-symbols:arrow-back-ios-new-rounded"
      class="text-gray-800 font-extrabold cursor-pointer mt-2"
      width="24"
      height="24"
      @click="backToDashboard"
    />
    <div class="flex flex-col">
      <h2 class="text-[20px] sm:text-3xl font-extrabold">{{ title }}</h2>
      <p class="text-gray-500 mb-0 sm:mb-6 text-[14px] sm:text-lg">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
