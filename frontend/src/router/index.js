import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Ceshi from '@/components/ceshi'
import Login from '@/components/Login'
import Editor from '@/components/editor'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Hello',
    component: Hello
  }, {
    path: '/Ceshi',
    name: 'ceshi',
    component: Ceshi
  }, {
    path: '/Login',
    name: 'Login',
    component: Login
  }, {
    path: '/Editor',
    name: 'Editor',
    component: Editor
  }]
})
