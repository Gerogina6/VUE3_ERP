import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App)
// 统一注册el-icon图标
for(const iconName in ElIconModules) {
    app.component(iconName, ElIconModules[iconName])
}

app.use(createPinia())
app.use(router)

app.mount('#app')
