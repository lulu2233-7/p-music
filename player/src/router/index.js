import VueRouter from 'vue-router'
import Vue from 'vue'

import discovery from '../components/discovery.vue'
import search from '../components/search.vue'
import collect from '../components/collect.vue'
import recommend from '../components/recommend.vue'

/* 1. 通过Vue.use(插件)，安装插件 */
Vue.use(VueRouter)

/* 2. 创建VueRouter对象 */
const routes = [
    {
        path:'/discovery',
        component:discovery
    },
    {
        path:'/',
        component:discovery
    },
    {
        path:'/search',
        component:search
    },
    {
        path:'/collect',
        component:collect
    },
    {
        path:'/recommend',
        component:recommend
    }
]
const router = new VueRouter({
    //配置路由和组件之间的应用关系
    routes
})

/* 3. 将router对象传入到Vue实例 */
export default router