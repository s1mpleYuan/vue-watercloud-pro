import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import axios from 'axios';
import _ from 'lodash';
import 'font-awesome/css/font-awesome.css';
import Qs from 'qs';
import './assests/css/theme.css';
// import { getThemeClass } from './utils/theme';


// Vue.prototype.$theme = 'primary';
// Vue.prototype.$getThemeClass = getThemeClass;
Vue.prototype.$qs = Qs;
Vue.prototype._ = _;
// import Echarts from './plugins/echarts';
// Vue.prototype.echarts = Echarts;
// Vue.use(Echarts);

import * as Echarts from 'echarts';
Vue.prototype.echarts = Echarts;
Vue.use(Echarts);

// 导入Element及组件库相关样式
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$http = axios;
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});
axios.interceptors.response.use(
  response => {
    const { data, code, msg } = response.data;
    if (code == 200 || code == 201 || code == 202 || code == 203) {
      return {
        data,
        code: 1,
        msg
      };
    } else if (code == 400 || code == 404) {
      /* 
        400 请求地址不存在或参数错误
        401
        402
        403 访问失败
      */
      return {
        data,
        code: -1,
        msg
      };
    } else if (code == 401) {
      Vue.prototype.$alert(msg, '提示', {
        confirmButtonText: '确认',
        callback: action => {
          if (action == 'confirm') {
            // 
            const exitPath = router.app._route.fullPath;
            window.sessionStorage.setItem('exitPath', exitPath);
            router.push('/login');
          } else {
            return response.data;
          }
        }
      });
    } else if (code == 500) {
      return {
        data,
        code: 0,
        msg
      };
    }
  }
);


Vue.config.productionTip = false;

// window.onbeforeunload
// 监听浏览器关闭清除localStorage

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');