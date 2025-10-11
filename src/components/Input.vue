<script setup lang="ts">
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { useStyles } from "../composables/useStyles";

interface InputFieldProps {
  placeholder: string;
  isPassword?: boolean;
  modelValue?: string;
  hasIcon?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

const { mergeStyles, attrs } = useStyles();
const props = defineProps<InputFieldProps>();
const emit = defineEmits(["update:modelValue"]);

const inputType = ref(props.isPassword ? "password" : "text");
const isFocused = ref(false);

watch(
  () => props.isPassword,
  (newInputTypeValue) => {
    inputType.value = newInputTypeValue ? "password" : "text";
  }
);

function togglePassword() {
  inputType.value = inputType.value === "password" ? "text" : "password";
}

function updateValue(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}

function handleFocus() {
  isFocused.value = true;
}

function handleBlur() {
  isFocused.value = false;
}
</script>

<template>
  <div
    :class="
      mergeStyles(`
        flex border rounded-lg px-2 h-12 items-center w-full'
        ${isFocused ? 'border-gray-500' : 'border-gray-300'}
        ${hasError ? 'border-red-500' : ''}
      `)
    "
  >
    <input
      v-bind="attrs"
      :type="inputType"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
      @focus="handleFocus"
      @blur="handleBlur"
      class="w-full h-full outline-none border-none"
    />
    <div v-if="isPassword" class="cursor-pointer" @click="togglePassword">
      <Icon
        :icon="`tabler:${inputType === 'password' ? 'eye-off' : 'eye'}`"
        class="flex items-center w-11"
      />
    </div>
    <slot v-if="hasIcon"></slot>
  </div>
  <small v-if="hasError" class="text-red-500">{{ errorMessage }}</small>
</template>
