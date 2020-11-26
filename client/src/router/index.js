import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Saved from "../components/tabs/Saved.vue";
import Discover from "../components/tabs/Discover.vue";

Vue.use(VueRouter);

const routes = [
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

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
