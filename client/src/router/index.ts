import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Saved from "../components/tabs/Saved.vue";
import Discover from "../components/tabs/Discover.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/dashboard",
    redirect: "/dashboard/saved",
    component: Dashboard,
    children: [
      {
        path: "saved",
        component: Saved,
        name: "saved",
      },
      {
        path: "discover",
        component: Discover,
        name: "discover",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
