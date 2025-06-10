<script setup lang="ts">
//import { useStyles } from '../../composables/useStyles';

//const { mergeStyles, attrs } = useStyles();
// :class="mergeStyles(
//       'flex items-center justify-center gap-2 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer'
//     )"
</script>

<template>
  <button
    v-bind="$attrs"
    class="flex items-center justify-center gap-2 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer active:bg-red-700 transition duration-200 bg-red-500"
  >
    <slot></slot>
  </button>
</template>
