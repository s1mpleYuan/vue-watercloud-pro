<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
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
</style>
