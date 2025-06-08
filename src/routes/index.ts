import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "app",
    redirect: "/account",
  },
  {
    path: "/account",
    name: "account",
    component: () => import("../views/Account.vue"),
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
})
