import Vue from 'vue'
import App from './App.vue'

//导入Element-ui
import './tools/decorate'

//导入axios
import axios from './tools/request'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'

//导入路由
import router from './router/index'

//导入Vuex
import store from './store/index'

Vue.prototype.$vue = new Vue() //创建空的实例，用于事件总线


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
