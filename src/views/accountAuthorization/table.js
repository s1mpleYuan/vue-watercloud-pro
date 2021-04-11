const tableColumns = [
  {
    prop: 'user_serials',
    label: '序号',
    width: '60'
    // validator: (rule, val, cb) => {
    //   if (!val || val == '') {
    //     cb(new Error('请输入'))
    //   }
    // }
  },
  {
    prop: 'username',
    label: '用户名',
    inputType: 'input',
    edit: false,
    required: true
  },
  {
    prop: 'account',
    label: '账户'
  },
  {
    prop: 'code',
    label: '企业代码'
  },
  {
    prop: 'auth',
    label: '权限',
    inputType: 'radio',
    width: '',
    edit: false
  },
  {
    prop: 'enabled',
    label: '是否禁用',
    inputType: 'switch',
    edit: false
  },
  {
    prop: 'en_name',
    label: '企业名称',
    inputType: 'input',
    isExpand: true,
    edit: false,
    required: true
  },
  {
    prop: 'addr',
    label: '企业地址',
    inputType: 'input',
    isExpand: true,
    edit: false,
    required: true
  },
  {
    prop: 'legal_person',
    label: '法人',
    inputType: 'input',
    isExpand: true,
    edit: false,
    required: true
  },
  {
    prop: 'tel',
    label: '联系方式',
    inputType: 'input',
    isExpand: true,
    edit: false,
    required: true,
    // validator: (rule, val, cb) => {
    //   if (!val || val == '') {
    //     cb(new Error('请输入'))
    //   }
    // }
  }
];

export {
  tableColumns
};