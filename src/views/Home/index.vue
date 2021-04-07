<template>
  <div class="main-container">
    <Header></Header>
    <el-container class="main">
      <div class="left-box">
        <Enterprise v-if="location"></Enterprise>
        <Property v-else></Property>
      </div>
      <div class="right-box" :style="{height: userInfo.auth == 0? '85%' : '100%'}">
        <Weather></Weather>
        <div class="user-setting-box" v-show="userInfo.auth == 0">
          <el-button v-if="!location" class="switch" type="primary" icon="el-icon-share" @click="location=!location" round>
            数据管理平台
          </el-button>
          <el-button v-else-if="location" class="switch" type="warning" icon="el-icon-share" @click="location=!location" round>
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
      location: true, // 页面位置，true为企业管理页面, false 为物业管理页面
      userInfo: {}
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.location = this.userInfo.auth === 0;
    console.log(this.location, 'this.location');
    // console.log(this.userInfo);
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
      padding: 10px;
      box-sizing: border-box;
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
