<script setup lang="ts">
import { useStyles } from '../composables/useStyles';

const { mergeStyles, attrs } = useStyles();
</script>

<template>
  <button
    v-bind="attrs"
    :class="mergeStyles(
      'flex items-center justify-center gap-2 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer'
    )"
  >
    <slot></slot>
  </button>
</template>
