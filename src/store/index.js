import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import region from './modules/region';

Vue.use(Vuex);

// export default new Vuex.Store({
// 	modules: {
// 		userInfo
// 	},
// 	// strict: debug
// });
export default new Vuex.Store({
  modules: {
    region
  },
  getters
});