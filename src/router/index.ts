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
          component: () => import('@/views/menu/createOredit.vue'),
        },
        {
          path: 'about', 
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
         {
          path: 'work',
          name: 'work-edit',
          component: () => import('@/views/work/work.vue')
        },
        {
          path: 'life',
          name: 'life-edit',
          component: () => import('@/views/life/life.vue')
        },
        {
          path: 'viewList',
          name: 'viewList-edit',
          component: () => import('@/views/viewlist/viewList.vue')
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
