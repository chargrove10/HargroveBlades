import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import JQuery from 'jquery'



import "@/assets/style.css"

createApp(App).use(router).use(JQuery).mount('#app')
