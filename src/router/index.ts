import { createRouter,createWebHistory,RouteRecordRaw } from 'vue-router'

const routes:RouteRecordRaw[]=[
  {
    path:'/login',
    component:()=>import('../pages/MyLogin.vue')
  },
  {
    path:'/error',
    component:()=>import('../pages/MyError.vue')
  }
]

const router=createRouter({
  history:createWebHistory(),
  routes
})

export default router