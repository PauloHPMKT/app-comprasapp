import createRouteGuard from "../guards/create-router.guard";
import { createRouter, createWebHistory } from "vue-router";

const hasTitleGuard = createRouteGuard(
  () => !!localStorage.getItem('purchase-list-title'),
  { name: 'dashboard' }
);

const hasTokenGuard = createRouteGuard(
  () => !!localStorage.getItem('token'),
  { name: 'account' }
);

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
    beforeEnter: hasTokenGuard,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import("../views/Dashboard.vue"),
      },
      {
        path: 'purchase-list-creation',
        name: 'purchase-list-creation',
        beforeEnter: hasTitleGuard,
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
