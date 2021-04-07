
const enterprise = [
  {
    name: '数据预警',
    content: `
      <div style="margin: 100px 0 0">
        <span style="font-size: 21px;margin-bottom: 10px;display: inline-block">数据预警平台简介</span><br/>
        <span></span><br/>
        <el-button type="text" style="margin-top: 50px;display: inline-block">进入数据预警平台<i class="el-icon-right"></i></el-button>
      </div>
    `,
    row: 1,
    ratio: 1,
    contentShow: false,
    className: 'earlyWarning',
    url: '/earlyWarning'
  },
  {
    name: '设备管理',
    content: `
      <div style="margin: 100px 0 0">
        <span style="font-size: 21px;margin-bottom: 10px;display: inline-block">设备管理平台简介</span><br/>
        <span></span><br/>
        <el-button type="text" style="margin-top: 50px;display: inline-block">进入设备管理平台<i class="el-icon-right"></i></el-button>
      </div>
    `,
    row: 1,
    ratio: 1,
    contentShow: false,
    className: 'equipmentManagement',
    url: ''
  }
];

const property = [
  // row 1
  {
    name: '用户费用',
    content: `
      <div style="margin: 30px 0 0">
        <span style="font-size: 21px;margin-bottom: 10px;display: inline-block">用户费用平台</span><br/>
        <span></span><br/>
        <el-button type="text" style="margin-top: 50px;display: inline-block">进入用户费用平台<i class="el-icon-right"></i></el-button>
      </div>
    `,
    row: 1,
    ratio: 1,
    contentShow: false,
    className: 'earlyWarning',
    url: ''
  },
  {
    name: '档案管理',
    content: `
      <div style="margin: 30px 0 0">
        <span style="font-size: 21px;margin-bottom: 10px;display: inline-block">档案管理平台</span><br/>
        <span></span><br/>
        <el-button type="text" style="margin-top: 50px;display: inline-block">进入档案管理平台<i class="el-icon-right"></i></el-button>
      </div>
    `,
    row: 1,
    ratio: 2,
    contentShow: false,
    className: 'archives',
    url: ''
  },
  // row 2
  {
    name: '短信通知',
    content: `
      <div style="margin: 30px 0 0">
        <span style="font-size: 21px;margin-bottom: 10px;display: inline-block">短信通知平台</span><br/>
        <span></span><br/>
        <el-button type="text" style="margin-top: 50px;display: inline-block">进入短信通知平台<i class="el-icon-right"></i></el-button>
      </div>
    `,
    row: 2,
    ratio: 1,
    contentShow: false,
    className: 'earlyWarning',
    url: ''
  },
  {
    name: '报装管理',
    content: `
      <div style="margin: 30px 0 0">
        <span style="font-size: 21px;margin-bottom: 10px;display: inline-block">报装管理平台</span><br/>
        <span></span><br/>
        <el-button type="text" style="margin-top: 50px;display: inline-block">进入报装管理平台<i class="el-icon-right"></i></el-button>
      </div>
    `,
    row: 2,
    ratio: 1,
    contentShow: false,
    className: 'earlyWarning',
    url: ''
  },
  {
    name: '营收管理',
    content: `
      <div style="margin: 30px 0 0">
        <span style="font-size: 21px;margin-bottom: 10px;display: inline-block">营收管理平台</span><br/>
        <span></span><br/>
        <el-button type="text" style="margin-top: 50px;display: inline-block">进入营收管理平台<i class="el-icon-right"></i></el-button>
      </div>
    `,
    row: 2,
    ratio: 1,
    contentShow: false,
    className: 'earlyWarning',
    url: ''
  },
  // row 3
  {
    name: '设备操作',
    content: `
      <div style="margin: 30px 0 0">
        <span style="font-size: 21px;margin-bottom: 10px;display: inline-block">设备操作平台</span><br/>
        <span></span><br/>
        <el-button type="text" style="margin-top: 50px;display: inline-block">进入设备操作平台<i class="el-icon-right"></i></el-button>
      </div>
    `,
    row: 3,
    ratio: 2,
    contentShow: false,
    className: 'operator',
    url: ''
  },
  {
    name: '数据抄收',
    content: `
      <div style="margin: 30px 0 0">
        <span style="font-size: 21px;margin-bottom: 10px;display: inline-block">数据抄收平台</span><br/>
        <span></span><br/>
        <el-button type="text" style="margin-top: 50px;display: inline-block">进入数据抄收平台<i class="el-icon-right"></i></el-button>
      </div>
    `,
    row: 3,
    ratio: 1,
    contentShow: false,
    className: 'earlyWarning',
    url: ''
  },
];

export {
  enterprise,
  property
};