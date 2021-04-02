<template>
  <div class="main-container">
    <Header></Header>
    <el-container class="main">
      <div class="left-box">
        <Property v-if="location"></Property>
        <Enterprise v-else></Enterprise>
      </div>
      <div class="right-box">
        <Weather></Weather>
        <div class="user-setting-box">
          <el-button v-if="location" class="switch" type="primary" icon="el-icon-share" @click="location=!location" round>
            数据管理平台
          </el-button>
          <el-button v-else class="switch" type="warning" icon="el-icon-share" @click="location=!location" round>
            下级区域管理
          </el-button>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/header';
import Weather from '@/components/weather';
import Enterprise from './components/enterpriseHome';
import Property from './components/propertyHome';

export default {
  name: 'Home',
  components: {
    Header,
    Weather,
    Enterprise,
    Property,
  },
  data() {
    return {
      location: false, // 页面位置，true为企业管理页面, false 为物业管理页面位置
    };
  },
  created() {
  },
  mouted() {},
  methods: {
    getUserMsg() {},
  },
};
</script>

<style lang="less" scoped>
.main-container {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background-color: #f9f9f9;
  .main {
    // flex: 1;
    height: calc(100% - 55px);
    display: flex;
    .left-box {
      height: auto;
      width: calc(100% - 450px);
      display: flex;
    }
    .right-box {
      width: 450px;
      height: 85%;
      padding: 10px;
      .user-setting-box {
        height: 15%;
        width: 100%;
        text-align: center;
        .switch {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
