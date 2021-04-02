const messageList = [
  {
    prop: 'type',
    label: '类型',
    width: '20%'
  },
  {
    prop: 'status',
    label: '状态',
    width: '25%'
  },
  {
    prop: 'title',
    label: '标题',
    width: '20%'
  },
  {
    prop: 'time',
    label: '时间',
    width: '30%'
  }
];
const warningInfoTable = [
  {
    prop: 'serials',
    label: '序号',
    width: '60px'
  },
  {
    prop: 'create_time',
    label: '时间',
    width: '',
    isSort: true
  },
  {
    prop: 'content',
    label: '内容',
    width: ''
  },
  {
    prop: 'type',
    label: '类型',
    width: '80px'
  },
  {
    prop: 'founder',
    label: '创建人',
    isEdit: true,
    editInputType: 'input'
  },
  {
    prop: 'executor',
    label: '执行人',
    isEdit: true,
    emptyText: '未执行',
    editInputType: 'input'
  },
  {
    prop: 'remarks',
    label: '备注',
    width: '250px',
    emptyText: '无',
    isEdit: true,
    editInputType: 'textarea'
  },
  {
    label: '操作',
    width: '200px'
  }
];

export {
  messageList,
  warningInfoTable
};