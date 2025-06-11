import type { HttpAxiosInstance } from "services/api/http";
import type { AuthRepository } from "../data/protocols/auth-respository";
import type { Account } from "types/account";

export class AxiosAuthRepository implements AuthRepository {
  constructor(private readonly axiosInstance: HttpAxiosInstance) {}

  async login(data: Account.ToLogin): Promise<any> {
    return await this.axiosInstance.axios.post("/auth", data)
  }
}
