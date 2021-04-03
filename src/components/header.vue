<template>
  <div class="header">
    <!-- 样式 1 -->
    <div class="info-content-box">
      <div class="page-header" @click="goBack">
        <div class="context-box">
          <el-button size="large" type="text">
            <img class="returnBtn" :src="returnIcon" alt="" />
          </el-button>
        </div>
      </div>
      <!-- 下拉菜单 -->
      <el-menu
        class="navMenu"
        :default-active="activeIndex"
        mode="horizontal"
        :collapse-transition="false"
        v-show="isDrop"
      >
        <div class="menu-group" v-for="(item, i) in homeNavMenu" :key="i">
          <el-menu-item
            :index="item.index"
            v-if="item.invalid && !item.subMenus"
          >
            <b :class="['fa', `fa-${item.icon}`]">
              {{ item.content }}
            </b>
          </el-menu-item>
          <el-submenu
            :index="item.index"
            v-show="item.invalid && item.subMenus"
          >
            <template slot="title">
              <b :class="['fa', `fa-${item.icon}`]">
                {{ item.content }}
              </b>
            </template>
            <el-menu-item
              v-for="(subMenuItem, i) in item.subMenus"
              :key="i"
              :index="subMenuItem.index"
              style="text-align:center"
            >
              <b>{{ subMenuItem.content }}</b>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
      <div class="button-group">
        <div class="button-item">
          <el-popover
            placement="bottom"
            title="当前登录账户"
            width="150"
            trigger="hover"
          >
            <template>
              <span class="user-info">
                <i class="fa fa-user"></i>
                {{ userInfo.username }}
                <el-button
                  type="text"
                  size="small"
                  class="el-icon-edit edit-button"
                  circle
                ></el-button>
              </span>
              <span class="user-info">
                <i class="fa fa-id-card"></i>
                {{ userInfo.account }}
              </span>
              <span class="user-info">
                <i class="fa fa-bookmark"></i>
                {{ userInfo.code }}
              </span>
            </template>
            <el-button
              type="text"
              style="width: 100px;margin-right: 80px"
              class="info"
              slot="reference"
              round
              size="small"
            >
              <b>{{ `${userInfo.username}&nbsp;欢迎您！` || '' }}</b>
            </el-button>
          </el-popover>
        </div>
        <el-button
          class="button-item"
          type="primary"
          size="small"
          @click="drawer = true"
          round
        >
          <i class="fa fa-cog"></i>
          设置
        </el-button>
        <el-button
          type="success"
          size="small"
          @click="goAccountAuthorization"
          round
          class="button-item"
        >
          <i class="fa fa-address-book"></i>
          配置账户权限
        </el-button>
        <el-button
          class="button-item"
          type="danger"
          size="small"
          round
          @click="logOut"
        >
          <i class="fa fa-power-off"></i>
          退出
        </el-button>
      </div>
    </div>

    <el-drawer
      class="drawer"
      :visible.sync="drawer"
      :direction="direction"
      :modal-append-to-body="false"
      wrapperClosable
    >
      <template slot="title">
        <span class="title">
          <i class="el-icon-setting"></i>
          &nbsp;设置
        </span>
      </template>
      <div class="content">
        <div class="box"></div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { homeNavMenu } from '@/global/ui';
export default {
  components: {},
  data() {
    return {
      homeNavMenu: [], // 导航菜单
      isDrop: true,
      activeIndex: '1',
      show: false,
      userInfo: {},
      drawer: false,
      direction: 'rtl',
      returnIcon: require('@/assests/images/header/return_white.png'),
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.homeNavMenu = homeNavMenu;
  },
  methods: {
    logOut: function() {
      // 退出
      this.$confirm('确认退出？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 确认退出 清除 Token
          localStorage.clear();
          // 回退到 login 页面
          this.$router.push('/login');
          this.$message({
            type: 'success',
            message: '已退出',
          });
        })
        .catch(() => {});
    },
    goBack() {
      // 回退
      this.$router.go(-1);
    },
    goAccountAuthorization() {
      // 进入配置账户权限
      this.$router.push('/accountAuthorization');
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  background-color: #fff;
  height: 55px;
  position: relative;
  z-index: 100;
  .info-content-box {
    height: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    .page-header {
      cursor: pointer;
      height: 100%;
      float: left;
      width: 6%;
      background-color: cornflowerblue;
      .context-box {
        width: 20px;
        position: relative;
        top: 50%;
        left: 45%;
        transform: translate(-50%, -50%);
        .el-button--text {
          color: #000;
          font-size: 16px;
          font-weight: 400;
          color: #fff;
        }
      }
    }

    // 下拉菜单面板
    .navMenu {
      height: 100%;
      float: left;
      width: 58%;
      box-sizing: border-box;
      padding: 0 50px;
      .menu-group {
        height: 100%;
        float: left;
      }
      .is-active {
        border-bottom: 4px inset #fcbd60;
        background-color: rgba(0, 0, 0, 0) !important;
      }
      .el-menu-item,
      .el-submenu {
        height: 100% !important;
        width: 200px;
        text-align: center;
        box-sizing: border-box;
        b {
          font-size: 15px;
          font-weight: 600;
        }
        .el-submenu__title {
          height: 100%;
        }
      }
    }
    // 右侧按钮区
    .button-group {
      height: 100%;
      float: left;
      align-items: center;
      width: 35%;
      .button-item {
        display: inline-block;
        min-width: 70px;
        max-width: 180px;
        position: relative;
        top: 50%;
        transform: translate(0, -50%);
        b {
          font-size: 15px;
          i {
            margin-right: 15px;
          }
        }
      }
    }
  }
}
.drawer {
  z-index: 9999;
  .title {
    width: 70%;
    font-size: 18px;
    font-weight: 600;
  }
  .content {
    background-color: aqua;
    padding: 10px 20px;
    height: 100%;
    box-sizing: border-box;
    .box {
      background-color: yellow;
      height: 100%;
    }
  }
}
.returnBtn {
  width: 24px;
  height: 24px;
}
.el-menu--horizontal .el-menu .el-menu-item.is-active {
  background-color: #f7f7f8;
}
.user-info {
  width: 100%;
  display: block;
  margin-top: 10px;
  i {
    width: 30px;
    padding: 0 2px;
  }
  .edit-button {
    margin-left: 5px;
  }
}
</style>
