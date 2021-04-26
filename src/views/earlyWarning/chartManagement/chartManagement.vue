<template>
  <div class="main-container">
    <Header></Header>
    <el-container class="container">
      <el-main class="main">
        <ChartIndex></ChartIndex>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import TableData from '../../../global/record_data.json';
import Header from '@/components/header.vue';
import optionsList1 from '@/global/area_data.json';
import ChartIndex from './components/index';

import { getAllAccountRegion } from '@/api/chartManagement';

export default {
  name: 'ChartManagement',
  components: {
    Header,
    ChartIndex,
  },
  data() {
    return {
      /* 当前账户信息 */
      userInfo: {},
      /* region 数据 */
      // 区域 id
      region_id: '',
      // 区域名称 name
      region_name: '',
      avatarUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      tableData: TableData,
      options: {}, // echarts 图表参数配置对象
      dataFormSelectList: optionsList1,
      visible: false,
      optionDisabled: '',
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // let region = this.userInfo.region;
    // if (region === '1') {
    //   this.getRegion();
    // }
  },
  methods: {
    // 获取账户区域信息
    async getRegion() {
      const { data, code, msg } = await getAllAccountRegion();
      if (code == 1) {
        const { children } = data[0];
        this.$nextTick(() => {
          this.areaData = children;
        });
      } else {
        console.error(msg);
      }
    },
    // 进入数据监控平台
    enterDataPlatform() {
      this.$router.push('/dataPlatform');
    },
  },
};
</script>

<style lang="less" scoped>
.main-container {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  .container {
    flex: 1;
  }
  .aside {
    flex-direction: column;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.336);
    display: flex;
    height: 100%;
    .filter {
      padding: 10px 20px 5px 10px;
      height: 30px;
    }
    .screen-area-box {
      flex: 1;
      padding: 5px 0 5px 5px;
      display: flex;
      .area-tree {
        overflow: auto;
        height: 550px;
        flex: 1;
      }
    }
    .column-area-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 600;
      .icon {
        height: 30px;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: 700;
        color: #fff;
        height: 100px;
        background-color: #f1cd00;
      }
      .province {
        height: 50px;
        padding: 10px 12px 0;
        height: 100px;
      }
      .city {
        height: 50px;
        height: 100px;
        padding: 10px 12px 0;
      }
      .area {
        height: 50px;
        padding: 10px 12px 0;
        height: 100px;
      }
    }
    .aside-toggle-button {
      height: 35px;
      background-color: #e6a23c;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      color: #fff;
    }
  }
  .main {
    padding: 0;
  }
}

.contrast-form {
  .title {
    padding-left: 5px;
    span {
      color: red;
      font-weight: 600;
    }
  }
  .el-form-item {
    margin: 5px 0;
  }
  .text {
    padding-left: 5px;
  }
}
::-webkit-scrollbar {
  width: 3px !important;
}
</style>
