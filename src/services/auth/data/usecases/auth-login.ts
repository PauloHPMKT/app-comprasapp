import type { Account } from "types/account";
import type { AuthRepository } from "../protocols/auth-respository";
import type { HandleLogin } from "services/auth/domain/usecases/handle-login";
import type { AuthModel } from "types/auth";

export class AuthLoginService implements HandleLogin {
  constructor(private readonly authLoginRepository: AuthRepository) {}

  async execute(params: Account.ToLogin): Promise<AuthModel.Response> {
    const { body, status } = await this.authLoginRepository.login(params);
    const token = body.accessToken;
    if (!token) throw new Error("Falha ao realizar login");

    return {
      token,
      status,
    };
  }
}
