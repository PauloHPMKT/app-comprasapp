import { inject } from "vue";
import { useRouter } from "vue-router";
import { AuthLoginService } from "../services/auth/data/usecases/auth-login";
import type { Account } from "../types/account";
import { useAuthStore } from "../store/auth";

export const useAuth = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  const authLoginService = inject<AuthLoginService>('authLoginService')
  if (!authLoginService) {
    throw new Error("AuthLoginService is not provided");
  }

  async function onLogin({ email, password }: Account.ToLogin) {
    try {
    const { payload, status } = await authLoginService?.execute({
      email,
      password,
    });
    if (status === 200) {
      await authStore.setUser(payload);
      router.push('/app/dashboard');
    }
  } catch (error) {
    console.error(error);
    return error;
  }
  }

  return {
    onLogin,
  }
}
