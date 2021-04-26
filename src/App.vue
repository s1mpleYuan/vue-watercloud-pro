<template>
  <div id="app">
    <router-view />
    <div class="console" v-show="isConsole">
      <span>是否开启服务器API:</span>
      <el-switch
        v-model="isServerApi"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="useServerApi"
      ></el-switch>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isConsole: true,
      isServerApi: true,
    };
  },
  created() {
    let isServerApi = localStorage.getItem('isServerApi');
    if (isServerApi) {
      this.isServerApi = localStorage.getItem('isServerApi');
    } else {
      localStorage.setItem('isServerApi', true);
      this.useServerApi();
    }
  },
  methods: {
    useServerApi() {
      if (this.isServerApi) {
        this.$http.defaults.baseURL = 'http://118.178.197.214:8888/';
      } else {
        this.$http.defaults.baseURL = 'http://127.0.0.1:8888/';
      }
    },
  },
};
</script>

<style lang="less">
html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  // overflow: hidden;
  /* 定义滚动条样式 */
  body .el-table th.gutter {
    display: table-cell !important;
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 10px;
    border-radius: 10px;
    background-color: rgb(147, 242, 255);
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    border-radius: 10px;
    background-color: rgba(240, 240, 240, 0.5);
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    background-color: rgba(0, 140, 255, 0.5);
  }
}
.console {
  padding: 5px 10px;
  position: absolute;
  bottom: 25px;
  right: 50px;
  border-radius: 8px;
  background: rgba(240, 240, 240, 0.7);
  span {
    font-weight: 600;
    font-size: 12px;
    margin-left: 5px;
  }
}
</style>
