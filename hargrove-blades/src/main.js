import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'




import "@/assets/style.css"

createApp(App).use(router).use(axios).mount('#app')
