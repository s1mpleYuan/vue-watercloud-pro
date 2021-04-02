import { SET_USERINFO } from '../mutation-type';

const users = {
  namespace: true,
  state: {
    // 当前的登录账户
    userInfo: {}
  },
  mutations: {
    // 当前的登录账户
    [SET_USERINFO]: (state, value) => {
      state.userInfo = value;
    }
  }
};

export default users;