export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: { title: '登录' }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index'),
    meta: { title: '主页' },
  },
  {
    path: '/earlyWarning',
    name: 'EarlyWarning',
    component: () => import('@/views/earlyWarning/index'),
    redirect: '',
    meta: { title: '数据监测' },
    children: [
    ]
  },
  {
    path: '/dataPlatform',
    name: 'DataPlatform',
    component: () => import('@/views/earlyWarning/dataPlatform'),
    meta: { title: '列表数据平台' },
    redirect: '/dataPlatform/dataShow',
    children: [
      {
        path: 'dataShow',
        name: 'DataShow',
        component: () => import('@/views/earlyWarning/dataPlatform/dataShow')
      }
    ]
  },
  {
    path: '/chartManagement',
    name: 'ChartManagement',
    component: () => import('@/views/earlyWarning/chartManagement/chartManagement'),
    meta: { title: '图表数据平台' }
  },
  {
    path: '/warningRecord',
    name: 'WarningRecord',
    component: () => import('@/views/earlyWarning/warningRecord'),
    meta: { title: '数据日志平台' }
  },
  {
    path: '/accountAuthorization',
    component: () => import('@/views/accountAuthorization/index'),
    redirect: '',
    children: []
  }
];
