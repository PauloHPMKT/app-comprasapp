import type { Account } from "types/account";
import type { AuthModel } from "types/auth";

export interface AuthRepository {
  login(params: Account.ToLogin): Promise<AuthModel.FromApi>;
}
