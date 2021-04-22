import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/Login";
import MainLayout from "../layout/MainLayout"
import store from "../store";

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: MainLayout,
    redirect: "/home"
  },
  {
    path: "/home",
    component: MainLayout,
    redirect: "/home/dashboard",
    children: [
      {
        path: 'dashboard',
        component: () => import("../views/dashboard/Dashboard"),
        meta: {
          title: 'Dashboard',
          transitionName: 'dashboardT'
        }
      },
      {
        path: 'stock',
        component: () => import("../views/stock/Stock"),
        meta: {
          title: 'Stock',
          transitionName: 'stockT'
        }
      },
      {
        path: 'order',
        component: () => import("../views/order/Order"),
        meta: {
          title: 'Order',
          transitionName: 'orderT'
        }
      },
      {
        path: 'client',
        component: () => import("../views/client/Client"),
        meta: {
          title: 'Client',
          transitionName: 'clientT'
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  let token = store.getters.getToken;
  console.log(token);
  if(token !== null && token !== ""){
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next(`/`)
      NProgress.done()
      // NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    }else{
      next();
    }
  }else{
    if(to.path === '/login'){
      next();
      NProgress.done()
    }else{
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
    // if(to.meta.needLogin){
    //   let token = store.getters.getToken;
    //   console.log(token);
    //   if(token){
    //     next();
    //   }else{
    //     next({
    //       path: "/login",
    //       query: {redirect: to.fullPath}
    //     })
    //   }
    // }else{
    //   next();
    // }
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
