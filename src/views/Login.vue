<template>
  <div class="login-container">
    <div class="form-container">
      <div class="form-title web-font">
        <img src="../assests/images/logo.png" />
        水务云平台用户系统
      </div>
      <div class="form-box">
        <el-image class="form-image" :src="avatar" fit="cover"></el-image>
        <el-form
          class="form"
          label-width="100px"
          :model="loginForm"
          ref="loginRef"
        >
          <el-form-item label="账号" class="form-item">
            <el-input
              prefix-icon="el-icon-user-solid"
              v-model="loginForm.loginStr"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" class="form-item">
            <el-input
              type="password"
              prefix-icon="el-icon-lock"
              v-model="loginForm.pwd"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item">
            <el-button style="margin-left: 110px" type="primary" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      loginForm: {
        loginStr: '110011',
        pwd: '123456',
      },
      user: {
        username: 'admin01',
        account: '123456',
        code: '0000',
        auth: 0,
      },
    };
  },
  created() {
  },
  methods: {
    async login() {
      // const { data, code, msg } = await this.$http.get(
      //   `/login?account=${this.loginForm.account}&pwd=${this.loginForm.password}`
      // );
      const { data, code, msg } = await this.$http.post('/users/login', this.$qs.stringify(this.loginForm));
      
      const curLoading = this.$loading({
        lock: true,
        text: '登录中...'
      });
      setTimeout(() => {
        if (code === 1) {
          this.user = data;
          localStorage.setItem('userInfo', JSON.stringify(this.user));
          localStorage.setItem('token', data.token);
          curLoading.close();
          this.$message.success({
            message: msg,
            duration: 1000,
          });
          const exitPath = sessionStorage.getItem('exitPath');
          this.$router.push(exitPath || '/home');
        } else {
          curLoading.close();
          this.$message.error({
            message: msg,
            duration: 1000,
          });
        }
      }, 1500);
    },
  },
};
</script>

<style lang="less">
.login-container {
  width: 100%;
  height: 100%;
  background-image: url(../assests/images/back01.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  .form-container {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 550px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.6);
    .form-title {
      font-size: 35px;
      background-color: #67c23a;
      width: 580px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 55px;
      transform: translate(-50%, 0);
      letter-spacing: 3px;
      img {
        width: 50px;
        height: 50px;
        vertical-align: middle;
        // background-color: black;
      }
    }
    .form-box {
      display: flex;
      flex-direction: column;
      // width: 100%;
      height: auto;
      margin-top: 120px;
      .form-image {
        width: 120px;
        height: 120px;
        border-radius: 60px;
        position: relative;
        top: 40px;
        left: 250px;
        z-index: 999;
        transform: translate(-50%, 0);
        border: 2px solid rgb(189, 189, 253);
      }
      .form {
        border-radius: 10px;
        width: 550px;
        height: 350px;
        background-color: #fff;
        padding: 70px 60px 20px 25px;
        box-sizing: border-box;
        position: relative;
        left: -25px;
        top: -30px;
        box-shadow: 0.5px 1px 5px 0px rgba(0, 0, 0, 0.6);
        .form-item {
          margin-top: 40px;
          font-size: 20px;
          .el-form-item__label {
            font-size: 16px;
            text-align: center;
            letter-spacing: 5px;
            font-weight: bolder;
          }
          .el-form-item__content .el-input__inner {
            background-color: #f2f6fc;
            border-color: #dcdfe6;
            font-size: 16px;
          }
        }
      }
    }
  }
}
@font-face {
  font-family: 'webfont';
  font-display: swap;
  src: url('http://at.alicdn.com/t/webfont_s4bv8dq5wlg.eot'); /* IE9*/
  src: url('http://at.alicdn.com/t/webfont_s4bv8dq5wlg.eot?#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('http://at.alicdn.com/t/webfont_s4bv8dq5wlg.woff2')
      format('woff2'),
    url('http://at.alicdn.com/t/webfont_s4bv8dq5wlg.woff') format('woff'),
    /* chrome、firefox */ url('http://at.alicdn.com/t/webfont_s4bv8dq5wlg.ttf')
      format('truetype'),
    /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
      url('http://at.alicdn.com/t/webfont_s4bv8dq5wlg.svg#杨任东竹石体-Bold')
      format('svg'); /* iOS 4.1- */
}
.web-font {
  font-family: 'webfont' !important;
  // font-size:16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
