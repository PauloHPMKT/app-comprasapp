import { HttpAxiosInstance } from "../../services/api/http";
import { AuthLoginService } from "../../services/auth/data/usecases/auth-login";
import { AxiosAuthRepository } from "../../services/auth/infra/auth-login-repository";

const makeRepositoryInstance = (): AxiosAuthRepository => {
  const httpClient = HttpAxiosInstance.getInstance();
  return new AxiosAuthRepository(httpClient);
}

export const makeAuthService = () => {
  const authLoginRepository = makeRepositoryInstance();
  return new AuthLoginService(authLoginRepository)
}
