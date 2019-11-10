import Vue from 'vue'
import App from './App.vue'

// 导入路由
import router from "./router"
new Vue({
  el: '#app',
  render: h => h(App),
  router
})