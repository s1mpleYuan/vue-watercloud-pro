import Vue from'vue';
import Vuex from 'vuex';

import getters from './getters';
import users from './modules/users';

Vue.use(Vuex);

// export default new Vuex.Store({
// 	modules: {
// 		userInfo
// 	},
// 	// strict: debug
// });
export default new Vuex.Store({
  modules: {
		users
  },
	getters
});