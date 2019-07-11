import Vue from 'vue'
import MintUI from 'mint-ui'
import DrawerLayout from 'vue-drawer-layout'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from '@/assets/js/axios'

// 统一浏览器css样式
import 'normalize.css'

import 'mint-ui/lib/style.css'
// 引入全局组件
import '@/components/global-components'

Vue.use(MintUI)
Vue.use(DrawerLayout)

// 引入THREE
import * as THREE from 'three';
window.THREE = THREE

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
