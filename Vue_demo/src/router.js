import Vue from "vue"
import VueRouter from "vue-router"
import axios from "axios"


Vue.use(VueRouter);

// 将axios挂载在Vue原型对象上，可以不需要每个导入
Vue.prototype.$axios = axios;

//导入路由组件
import container from './main_container'
import lister from './main_lists'
import add from './main_add'
import edit from './main_edit'

import weapon from './main_weapon'
import equip from './main_equip'

export default new VueRouter({
  linkActiveClass: "active",
  routes: [{
      path: '/',
      redirect: '/heros'
    },
    {
      path: '/heros',
      component: container,
      children: [{
          path: '',
          component: lister
        },
        {
          path: 'add',
          component: add
        },
        {
          path: 'edit/:id',
          component: edit
        }
      ]
    },
    {
      path: '/weapon',
      component: weapon
    },
    {
      path: '/equip',
      component: equip
    },
  ]
})