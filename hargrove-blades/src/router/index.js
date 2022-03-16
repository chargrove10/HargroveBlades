import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import CustomerDetail from '../components/CustomerDetail.vue'
import ProductDetail from '../components/ProductDetail.vue'
import CreateOrder from '../components/CreateOrder.vue'
import BladeDetails from '../components/BladeDetails.vue'
import KnifeStyle from '../components/KnifeStyle.vue'
import SteelType from '../components/SteelType.vue'

const routes = [
    {
        path:"/",
        name: "MainPage",
        component: MainPage
    },
    
    {
        path:"/customer",
        name: "CustomerDetail",
        component: CustomerDetail
    },
    {
        path: "/product",
        name: "ProductDetail",
        component: ProductDetail
    },
    {
        path: "/createOrder",
        name: "CreateOrder",
        component: CreateOrder
    },
    {
        path: "/bladeDetails",
        name: "BladeDetails",
        component: BladeDetails
    },
    {
        path: "/knifeStyle",
        name: "KnifeStyle",
        component: KnifeStyle
    },
    {
        path: "/steelType",
        name: "SteelType",
        component: SteelType
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes // short for `routes: routes`
  })
  
  export default router