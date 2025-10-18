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
      // ver se é possível passar o hasError para os inputs
      return {
        error: true,
        message: `preencha todos os campos corretamente`
      };
    }
    for (const field of requiredFields) {
      if (!data[field]) {
        const typeField = field === "password" ? "senha" : field;
        return {
          error: true,
          message: `preencha o campo ${String(typeField)}`
        };
      }
    }
    return {
      error: false,
      message: '',
    };
  }

  return {
    isValueEmpty,
    useFieldValidation,
    formsValidation
  }
}
