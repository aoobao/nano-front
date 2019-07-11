import axios from '@/assets/js/axios';
import {
  setItem
} from '@/assets/js/utils'

const state = {
  mobile: false,
  user: null
}

const getters = {
  mobile: state => state.mobile
}

const mutations = {
  setMobile(state, mobile) {
    state.mobile = mobile
  },
  setUser(state, user) {
    state.user = user
  }
}

const actions = {
  login(context, param) {
    return new Promise(resolve => {
      axios.postUrl('login', param).then(rst => {
        if (rst.isok) {
          setItem('token', rst.data.token)
          context.commit('setUser', rst.data)
        }
        resolve(rst)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
