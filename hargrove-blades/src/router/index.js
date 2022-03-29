import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import CustomerDetail from '../components/CustomerDetail.vue'
import ProductDetail from '../components/ProductDetail.vue'
import CreateOrder from '../components/CreateOrder.vue'
import BladeDetails from '../components/BladeDetails.vue'
import KnifeStyle from '../components/KnifeStyle.vue'
import SteelType from '../components/SteelType.vue'
import Reports from '../components/Reports.vue'
import ProductList from '../components/ProductList.vue'
import OrderList from '../components/OrderList.vue'
import KnifeStyleList from '../components/KnifeStyleList.vue'
import KnifeAvail from '../components/KnifeAvail.vue'
import OrderInfo from '../components/OrderInfo.vue'
import NewsLetter from '../components/NewsLetter.vue'
import PriceEstimator from '../components/PriceEstimate.vue'
import EditCustomer from '../components/EditCustomer.vue'
import Status from '../components/Status.vue'
import OrderStatus from '../components/OrderStatus.vue'
import ProductStatus from '../components/ProductStatus.vue'
import OrderLineStatus from '../components/OrderLineStatus.vue'
import EditKnifeStyle from '../components/EditKnifeStyle.vue'
import CreateCustomerStatus from '../components/CreateCustomerStatus.vue'
import CreateOrderStatus from '../components/CreateOrderStatus.vue'
import CreateProductStatus from '../components/CreateProductStatus.vue'
import CreateOrderLineStatus from '../components/CreateOrderLineStatus.vue'
import AddAddress from '../components/AddAddress.vue'

const routes = [
    {
        path:"/customerList",
        name: "MainPage",
        component: MainPage
    },

    {
        path:"/editCustomer/:customerID",
        name: "EditCustomer",
        component: EditCustomer
    },
    
    {
        path:"/customer",
        name: "CustomerDetail",
        component: CustomerDetail
    },
    {
        path:"/addAddress/:customerID",
        name: "AddAddress",
        component: AddAddress
    },
    {
        path: "/product",
        name: "ProductDetail",
        component: ProductDetail
    },
    {
        path: "/createOrder/:customerID",
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
    },
    {
        path: "/",
        name: "Reports",
        component: Reports
    },
    {
        path: "/productList",
        name: "ProductList",
        component: ProductList
    },
    {
        path: "/orderList",
        name: "OrderList",
        component: OrderList
    },
    {
        path: "/knifeStyleList",
        name: "KnifeStyleList",
        component: KnifeStyleList
    },
    {
        path: "/knifeAvailability",
        name: "KnifeAvailability",
        component: KnifeAvail
    },
    {
        path: "/orderInfo",
        name: "OrderInfo",
        component: OrderInfo
    },
    {
        path: "/newsletter",
        name: "NewsLetter",
        component: NewsLetter
    },
    {
        path: "/priceEstimate",
        name: "PriceEstimate",
        component: PriceEstimator
    },
    {
        path: "/status",
        name: "Status",
        component: Status
    },
    {
        path: "/orderStatus",
        name: "OrderStatus",
        component: OrderStatus
    },
    {
        path: "/productStatus",
        name: "ProductStatus",
        component: ProductStatus
    },
    {
        path: "/orderLinestatus",
        name: "OrderLineStatus",
        component: OrderLineStatus
    },
    {
        path: "/createCustomerStatus",
        name: "CreateCustomerStatus",
        component: CreateCustomerStatus
    },
    {
        path: "/createOrderStatus",
        name: "CreateOrderStatus",
        component: CreateOrderStatus
    },
    {
        path: "/createProductStatus",
        name: "CreateProductStatus",
        component: CreateProductStatus
    },
    {
        path: "/createOrderLineStatus",
        name: "CreateOrderLineStatus",
        component: CreateOrderLineStatus
    },
    {
        path: "/editKnifeStyle/:knifeID",
        name: "EditKnifeStyle",
        component: EditKnifeStyle
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes // short for `routes: routes`
  })
  
  export default router