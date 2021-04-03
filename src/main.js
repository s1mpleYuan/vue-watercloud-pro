import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import axios from 'axios';
import _ from 'lodash';
import 'font-awesome/css/font-awesome.css';
import Qs from 'qs';

Vue.prototype.$jsonParser = Qs;
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
  
  return config;
});
axios.interceptors.response.use(
  response => {
    const { data, code, msg } = response.data;
    if(code == 200) {
      return {
        data,
        code: 1,
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