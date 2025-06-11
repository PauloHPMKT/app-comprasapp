import type { User } from "../entities/User";

export namespace UserModel {
  export interface ToCreate {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }

  export interface Payload {
    user: User;
    token: string;
  }
}
