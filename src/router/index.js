import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
// 导入 nProgress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  // to 要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next('/login') 强制跳转到 login 

  // 如果存在title，则赋值
  if (to.path == '/login') {
    localStorage.clear();
    return next();
  }
  const token = localStorage.getItem('token');
  if (!token) return next('/login');
  // 进度条
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;

