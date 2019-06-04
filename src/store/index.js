import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import menu from './modules/menu'
import project from './modules/project'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    menu,
    project
  }
})

export default store
