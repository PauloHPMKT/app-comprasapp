import { ref, watch, type Ref } from 'vue';

export const useValidation = () => {
  const hasError = ref(false);
  const errorMessage = ref('');

  function isValueEmpty(value: string): { isEmpty: boolean; message: string } | null {
    if (!value.trim()) {
      return {
        isEmpty: true,
        message: 'É necessário preencher este campo.'
      };
    }
    return null;
  }

  function useFieldValidation(valueRef: Ref<string>) {
    watch(
      valueRef,
      (newValue) => {
        if (newValue && newValue.trim() !== '') {
          clearError();
        }
      }
    );

    function validateField() {
      const result = isValueEmpty(valueRef.value);
      if (result && result.isEmpty) {
        hasError.value = true;
        errorMessage.value = result.message;
        return false;
      }
      clearError();
      return true;
    }

    function clearError() {
      hasError.value = false;
      errorMessage.value = '';
    }

    return {
      hasError,
      errorMessage,
      validateField,
      clearError
    };
  }

  return {
    isValueEmpty,
    useFieldValidation,
  }
}
