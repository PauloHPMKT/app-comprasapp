import { ref } from "vue";

export const useModal = () => {
  const isOpen = ref(false);

  function open() {
    isOpen.value = true;
    console.log("Opening modal", isOpen.value);
  }

  function close() {
    isOpen.value = false;
  }

  return {
    isOpen,
    open,
    close,
  }
}
