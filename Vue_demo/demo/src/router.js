import VueRouter from 'vue-router'
import Vue from 'vue'


Vue.use(VueRouter)


import hobby from "./view/Hobby.vue"
import dress from "./view/Dress.vue"

//二级容器
import Container from "./view/Container.vue"
import add from "./view/FigureAdd.vue"
import edit from "./view/FigureEdit.vue"
import figureLists from "./view/FigureList.vue"


export default new VueRouter({
  linkActiveClass: "active",
  routes: [{
      path: "/",
      redirect: "/figure"
    },
    {
      path: "/figure",
      component: Container,
      children: [{
          path: '',
          component: figureLists
        },
        {
          path: "/figure/add",
          component: add
        },
        {
          path: "/figure/edit/:id",
          component: edit
        }
      ]
    },
    {
      path: "/dress",
      component: dress
    },
    {
      path: "/hobby",
      component: hobby
    }
  ]
})