import Home from './views/Home.vue'

export default [{
    path: '/',
    name: 'home',
    text: '首页',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    text: '登录',
    component: () => import( /* webpackChunkName:"bank" */ './views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    text: '注册',
    component: () => import( /* webpackChunkName:"bank" */ './views/Register.vue')
  },
  {
    path: '/projectinfo',
    name: 'projectInfo',
    text: '项目详情',
    component: () => import( /* webpackChunkName:"projectinfo" */ './views/bank/ProjectInfo.vue')
  },
  {
    path: '/HomeView',
    name: 'homeview',
    text: '后台入口页',
    component: () => import( /* webpackChunkName:"bank" */ './views/bank/HomeView.vue'),
    children: [
      //   {
      //   path: '',
      //   redirect: {
      //     name: 'mapview'
      //   }
      // },
      {
        path: 'mapview',
        name: 'mapview',
        text: '后台地图展示',
        isMenu: true,
        component: () => import( /* webpackChunkName:"bank" */ './views/bank/MapView.vue')
      }, {
        path: 'projectlist',
        name: 'projectList',
        text: '项目列表',
        isMenu: true,
        component: () => import( /* webpackChunkName:"bank" */ './views/bank/ProjectList.vue')
      }
    ]
  }
]
