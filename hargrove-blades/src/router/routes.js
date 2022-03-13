import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import CustomerDetail from '../components/CustomerDetail.vue';

const routes = [
    {
        path:'/',
        name: 'MainPage',
        component: MainPage
    },
    {
        path:'/customer/:id',
        name:'CustomerDetail',
        component: CustomerDetail
    },
    {
        path:'/customer',
        name: 'Customer',
        component: CustomerDetail
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes // short for `routes: routes`
  })
  
  export default router