const tableColumns = [
  {
    prop: 'serials',
    label: '序号',
    isShow: false,
    width: '60',
    isSort: false,
    isIndex: true,
    fixed: true
  },
  {
    prop: 'task_code',
    label: '任务编码',
    isShow: false,
    width: '',
    isSort: true,
    disabled: true
  },
  {
    prop: 'user_code',
    label: '用户编号',
    isShow: false,
    width: '',
    isSort: true,
    disabled: true
  },
  {
    prop: 'equipment_code',
    label: '水表编号',
    isShow: false,
    width: '',
    isSort: true,
    disabled: true
  },
  {
    prop: 'settled_traffic',
    label: '结算流量',
    isShow: false,
    width: '',
    isSort: true
  },
  {
    prop: 'cumulative_traffic',
    label: '累计流量',
    isShow: false,
    width: '',
    isSort: true
  },
  {
    prop: 'last_used',
    label: '上月使用',
    isShow: false,
    width: '',
    isSort: true
  },
  {
    prop: 'balance',
    label: '水表余额',
    isShow: false,
    width: '',
    isSort: true
  },
  {
    prop: 'voltage',
    label: '电压',
    isShow: false,
    width: '',
    isSort: false
  },
  {
    prop: 'signal',
    label: '信号强度',
    isShow: false,
    width: '',
    isSort: false
  },
  {
    prop: 'consumption',
    label: '电耗',
    isShow: false,
    width: '',
    isSort: true
  },
  {
    prop: 'status',
    label: '设备状态',
    isShow: false,
    width: '',
    isSort: false
  },
  {
    prop: 'equipment_time',
    label: '设备时间',
    isShow: false,
    width: '',
    isSort: false
  },
  {
    prop: 'copy_time',
    label: '抄收时间',
    isShow: false,
    width: '',
    isSort: true
  },
  {
    prop: '',
    label: '操作',
    isShow: false,
    width: '200',
    isSort: false,
    isIndex: true,
    fixed: true,
    isTools: true
  },
];

export {
  tableColumns
};