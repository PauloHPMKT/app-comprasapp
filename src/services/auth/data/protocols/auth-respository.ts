import type { Account } from "types/account";

export interface AuthRepository {
  login(params: Account.ToLogin): Promise<any>;
}
