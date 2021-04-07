const homeNavMenu = [
  {
    invalid: true,
    index: '1',
    content: '主页',
    url: '/home',
    icon: 'home',
    subMenus: [
      {
        invalid: true,
        index: '1-1',
        url: '/earlyWarning',
        content: '数据预警',
      },
      {
        invalid: true,
        index: '1-2',
        content: '设备管理',
      },
      {
        invalid: true,
        index: '1-3',
        content: '用户费用',
      },
      {
        invalid: true,
        index: '1-4',
        content: '档案管理',
      },
      {
        invalid: true,
        index: '1-5',
        content: '短信通知',
      },
      {
        invalid: true,
        index: '1-6',
        content: '报装管理',
      },
      {
        invalid: true,
        index: '1-7',
        content: '营收管理',
      },
      {
        invalid: true,
        index: '1-8',
        content: '设备操作',
      },
      {
        invalid: true,
        index: '1-9',
        content: '数据抄收',
      }
    ]
  },
  {
    invalid: true,
    index: '2',
    content: '数据查看',
    icon: 'table',
    subMenus: [
      {
        invalid: true,
        index: '2-1',
        content: '列表数据',
        url: '/dataPlatform/dataShow'
      },
      {
        invalid: true,
        index: '2-2',
        url: '/chartManagement',
        content: '图表数据',
      }
    ]
  },
  {
    invalid: true,
    index: '3',
    content: '数据日志',
    icon: 'file',
    url: 'warningRecord'
    // subMenus: []
  }
];

export {
  homeNavMenu
};