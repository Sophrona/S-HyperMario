import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HyperMarioView from "../views/HyperMarioView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/hyper-mario",
    name: "hyper-mario",
    component: HyperMarioView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
