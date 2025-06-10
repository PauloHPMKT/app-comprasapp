import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "default",
    redirect: "/account",
  },
  {
    path: "/account",
    name: "account",
    component: () => import("../views/Account.vue"),
  },
  {
    path: '/app',
    name: 'app',
    component: () => import("../layout/AppLayout.vue"),
    redirect: { name: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import("../views/Dashboard.vue"),
      },
      {
        path: 'purchase-list-creation',
        name: 'purchase-list-creation',
        component: () => import("../views/PurchaseListCreation.vue"),
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import("../views/Category.vue"),
      },
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
})
