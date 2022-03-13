import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/MainPage.vue';


const routes = [
    {
        path:"/",
        name: "MainPage",
        component: MainPage
    },
    
    {
        path:"/CustomerDetail",
        name: "CustomerDetail",
        component: () => import('@/components/CustomerDetail.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes // short for `routes: routes`
  })
  
  export default router