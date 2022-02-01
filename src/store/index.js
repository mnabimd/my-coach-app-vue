import {
  createStore
} from 'vuex';

import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';
import coursesModule from './modules/courses/index.js';
import adminsModule from './modules/admins/index.js';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule,
    courses: coursesModule,
    admins: adminsModule
  },
  state() {
    return {
      toastContent: 'Hello TOAST',
      toastTime: 3000,
      showToast: false,
    }
  },
  getters: {
    toastContent(state) {
      return state.toastContent
    },
    toastTime(state) {
      return state.toastTime
    },
    showToast(state) {
      return state.showToast;
    }
  },
  mutations: {
    setToast(state, payload) {
      state.showToast = true;
      state.toastContent = payload;

      setTimeout(() => {
        state.showToast = false;
      }, 3000);
    },
  }
});

export default store;