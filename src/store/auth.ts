import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import type { User } from "services/auth/domain/entities/User";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: {} as User,
    token: "",
  }),
  actions: {
    async setAccessToken(token: string) {
      localStorage.setItem("token", token);
      this.token = token;
      this.initializeStore();

      return Promise.resolve();
    },

    initializeStore() {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const decode = jwtDecode<{ sub: string } & User>(accessToken);
        const user = {
          id: decode.sub,
          name: decode.name,
          email: decode.email,
          avatar: decode.avatar,
          plan: decode.plan,
          userId: decode.userId,
          createdAt: decode.createdAt,
        }
        this.currentUser = user;
      };
    },
  },
});
