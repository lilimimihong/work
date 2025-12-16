import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import AppLayout from '@/views/layout/AppLayOut.vue' 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout, 
      children: [
       
        {
          path: '', 
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'about', // 子路径不需要加 /
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: 'menus',
          name: 'menus',
          component: () => import('@/views/menu/MenuIndex.vue') 
        },
        {
          path: 'menus/create',
          name: 'menu-create',
          component: () => import('@/views/menu/createOredit.vue')
        },
        {
          path: 'menus/:id/edit',
          name: 'menu-edit',
          component: () => import('@/views/menu/createOredit.vue')
        },
      ]
    },
  ],
})



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const store = useTokenStore()
   if(!store.token?.access_token){
      next({name: 'login',query: {redirect: to.fullPath}})
      return
   }
  } 

    next()
  
})
export default router
