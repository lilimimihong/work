// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@element-plus/icons-vue'
import "@/styleAll/index.scss"

const app = createApp(App)

// 只需要使用 VueKonva 插件，它会自动处理所有组件

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')



