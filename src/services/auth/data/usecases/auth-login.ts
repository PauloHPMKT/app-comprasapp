import type { Account } from "types/account";
import type { AuthRepository } from "../protocols/auth-respository";
import type { HandleLogin } from "services/auth/domain/usecases/handle-login";
import type { UserModel } from "services/auth/domain/models/user";

export class AuthLoginService implements HandleLogin {
  constructor(private readonly authLoginRepository: AuthRepository) {}

  async execute(params: Account.ToLogin): Promise<any> {
    const { data, status } = await this.authLoginRepository.login(params);
    const payload: UserModel.Payload = {
      user: data.user,
      token: data.access_token,
    }
    console.log("Login response data:", data, payload);
    if (payload.token) {
      console.log("Setting token in localStorage", payload.token);
      localStorage.setItem("token", JSON.stringify(payload.token));
    }
    return {
      payload,
      status,
    };
  }
}
