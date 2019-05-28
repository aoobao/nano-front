import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 统一浏览器css样式
import 'normalize.css'
// 引入全局组件
import '@/components/global-components'
// 引入THREE
import * as THREE from 'three';
window.THREE = THREE

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
