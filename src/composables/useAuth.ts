import { inject, reactive } from "vue";
import { useRouter } from "vue-router";
import { AuthLoginService } from "../services/auth/data/usecases/auth-login";
import type { Account } from "../types/account";

import { useAuthStore } from "../store/auth";
import { useValidation } from "./useValidation";
import { useToast } from "./useToast";

const { addToast } = useToast();
const { formsValidation } = useValidation();

export const useAuth = () => {
  const authLoginService = inject<AuthLoginService>('authLoginService')
  if (!authLoginService) throw new Error("AuthLoginService is not provided");

  const loginData = reactive<Account.ToLogin>({
    email: '',
    password: '',
  });
  const createAccountData = reactive<Account.ToCreate>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const router = useRouter();
  const authStore = useAuthStore();

  async function onLogin({ email, password }: Account.ToLogin) {
    const isValid = formsValidation(loginData);
    if (isValid.error) {
      addToast({
        id: Date.now().toString(),
        message: isValid.message,
        type: 'error',
        duration: 5000,
      });
      return;
    }

    try {
      const { token, status } = await authLoginService?.execute({
        email,
        password,
      })!;

      if (status === 200) {
        await authStore.setAccessToken(token);
        router.push('/app/dashboard');
      }
    } catch (error: any) {
      console.error(error);
      addToast({
        id: Date.now().toString(),
        message: error.message || 'Ocorreu um erro ao tentar fazer login.',
        type: 'error',
        duration: 5000,
      });
      return error;
    }
  }

  function createAccountUser() {
    const isValid = formsValidation(createAccountData);
    if (isValid.error) {
      addToast({
        id: Date.now().toString(),
        message: isValid.message,
        type: 'error',
        duration: 5000,
      });
      return;
    }
  }

  return {
    loginData,
    createAccountData,
    onLogin,
    createAccountUser,
  }
}
