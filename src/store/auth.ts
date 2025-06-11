import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import type { User } from "services/auth/domain/entities/User";
import type { UserModel } from "services/auth/domain/models/user";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: {} as User,
    token: ""
  }),
  actions: {
    async setUser(params: UserModel.Payload) {
      const { user, token } = params;
      this.currentUser = user;
      this.token = token;

      localStorage.setItem("current-user", JSON.stringify(user));
      return Promise.resolve()
    },

    initializeStore() {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const decode = jwtDecode<{ sub: string } & User>(accessToken);
        console.log("Decoded access token:", decode);
        const user = {
          id: decode.sub,
          name: decode.name,
          email: decode.email,
          avatar: decode.avatar,
          accountId: decode.accountId,
          createdAt: decode.createdAt,
        }
        this.currentUser = user;
      }
    }
  }
})
