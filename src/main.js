import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import mixins from './mixins'
import router from './router'
import "gridjs/dist/theme/mermaid.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App)
    .use(router)
    .use(mixins)
    .mount('#app')
