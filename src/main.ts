import './assets/main.scss'

import { createApp } from 'vue'
import 'element-plus/dist/index.css'

import App from './App.vue'

const app = createApp(App)

async function asyncRegister() {
    const createPinia = (await import("pinia")).createPinia //引入pinia
    app.use(createPinia())
    const router = (await import("@/router")).default // 引入router
    app.use(router)
    
    app.mount('#app')
}

asyncRegister();