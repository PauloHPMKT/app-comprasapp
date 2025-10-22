import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

export const useModal = () => {
  const isOpen = ref(false);

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function goToRegistrationPage(closeModal: () => void) {
    router.push({ path: '/account', query: { action: 'register' } });
    closeModal();
  }

  function goToLoginPage(closeModal: () => void) {
    router.push({ path: '/account', query: { action: 'login' } });
    closeModal();
  }

  return {
    isOpen,
    open,
    close,
    goToRegistrationPage,
    goToLoginPage
  }
}
