import type { Account } from "types/account";

export interface HandleLogin {
  execute(params: Account.ToLogin): Promise<any>;
}
