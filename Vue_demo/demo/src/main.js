import Vue from 'vue'
import App from './App.vue'
import router from "./router.js"
import axios from "axios"
// 导入样式
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "./style/index.css"
Vue.config.productionTip = false

// 设置基地址
axios.defaults.baseURL = "http://localhost:3000/"
  // 将axios挂载到Vue原型对象上，解决每个组件导入
Vue.prototype.$axios = axios;


new Vue({
  render: h => h(App),
  router
}).$mount('#app')