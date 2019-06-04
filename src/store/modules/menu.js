import config from '@/router.config.js'

const state = {
  menuList: getMenuList()
}

const getters = {
  menuList: state => state.menuList
}

const mutations = {}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}

function getMenuList() {
  let item = config.find(t => t.name === 'homeview')
  let children = item.children.filter(t => t.isMenu)
  return children
}
