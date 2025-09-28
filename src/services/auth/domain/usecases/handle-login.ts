import type { Account } from "types/account";
import type { AuthModel } from "types/auth";

export interface HandleLogin {
  execute(params: Account.ToLogin): Promise<AuthModel.Response>;
}
