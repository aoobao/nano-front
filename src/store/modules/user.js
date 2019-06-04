const state = {
  mobile: false
}

const getters = {
  mobile: state => state.mobile
}

const mutations = {
  setMobile(state, mobile) {
    state.mobile = mobile
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
