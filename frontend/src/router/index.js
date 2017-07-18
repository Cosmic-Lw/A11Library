import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Ceshi from '@/components/ceshi'
import iView from 'iview'

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
    }]
})