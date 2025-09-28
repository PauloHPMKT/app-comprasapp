import type { HttpAxiosInstance } from "services/api/http";
import type { AuthRepository } from "../data/protocols/auth-respository";
import type { Account } from "types/account";
import type { AuthModel } from "types/auth";

export class AxiosAuthRepository implements AuthRepository {
  constructor(private readonly axiosInstance: HttpAxiosInstance) {}

  async login(data: Account.ToLogin): Promise<AuthModel.FromApi> {
    const response = await this.axiosInstance.axios.post("/auth", data)
    return {
      body: response.data.body,
      status: response.data.statusCode,
    };
  }
}
