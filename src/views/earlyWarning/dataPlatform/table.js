const tableColumns = [
  {
    prop: 'Record_id',
    label: '序号',
    isShow: false,
    width: '60',
    isSort: false,
    isIndex: true,
    disabled: true
  },
  {
    prop: '',
    label: '操作',
    isShow: false,
    width: '200',
    isSort: false,
    isIndex: true,
    isTools: true
  },
  {
    prop: 'Task_id',
    label: '任务编码',
    isShow: false,
    width: '110',
    isSort: true,
    disabled: true
  },
  {
    prop: 'User_code',
    label: '用户编号',
    isShow: false,
    width: '150',
    isSort: true,
    disabled: true
  },
  {
    prop: 'House_number',
    label: '门牌号',
    isShow: false,
    width: '',
    isSort: true,
    disabled: true
  },
  {
    prop: 'Equipment_code',
    label: '水表编号',
    isShow: false,
    width: '160',
    isSort: true,
    disabled: true
  },
  {
    prop: 'Settled_traffic',
    label: '结算流量',
    inputType: 'number',
    isShow: false,
    width: '',
    isSort: true
  },
  {
    prop: 'Cumulative_traffic',
    label: '累计流量',
    isShow: false,
    width: '',
    isSort: true
  },
  {
    prop: 'Last_used',
    label: '上月使用',
    isShow: false,
    width: '',
    isSort: true
  },
  {
    prop: 'Balance',
    label: '水表余额',
    isShow: false,
    width: '',
    isSort: true
  },
  {
    prop: 'Voltage',
    label: '电压',
    isShow: false,
    width: '',
    isSort: false
  },
  {
    prop: 'Signal_strength',
    label: '信号强度',
    isShow: false,
    width: '',
    isSort: false
  },
  {
    prop: 'Consumption',
    label: '电耗',
    isShow: false,
    width: '',
    isSort: true
  },
  {
    prop: 'Status',
    label: '设备状态',
    isShow: false,
    width: '',
    isSort: false
  },
  {
    prop: 'Equipment_time',
    label: '设备时间',
    isShow: false,
    width: '180',
    isSort: false
  },
  {
    prop: 'Copy_time',
    label: '抄收时间',
    isShow: false,
    width: '180',
    isSort: true
  },
];

export {
  tableColumns
};