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

  function formsValidation<T extends Record<string, any>>(
    data: T
  ): { error: boolean; message: string } {
    const requiredFields = Object.keys(data) as Array<keyof T>;
    const allFieldsVerify = requiredFields.every((field) => !data[field]);
    if (allFieldsVerify) {
      const errorString = 'preencha todos os campos corretamente';
      hasError.value = true;
      errorMessage.value = errorString;

      return {
        error: true,
        message: errorString
      };
    }
    for (const field of requiredFields) {
      if (!data[field]) {
        const typeField = field === "password" ? "senha" : field;
        const errorString = `preencha o campo ${String(typeField)}`;
        hasError.value = true;
        errorMessage.value = errorString;
        return {
          error: true,
          message: errorString
        };
      }
    }
    hasError.value = false;
    errorMessage.value = '';

    return {
      error: false,
      message: '',
    };
  }

  return {
    isValueEmpty,
    useFieldValidation,
    formsValidation,
    hasError,
    errorMessage,
  }
}
