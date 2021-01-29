import Vue from 'vue'
import Vuex from 'vuex'

import menu from './module/menu'
import theme from "./module/theme";
import cloneDeep from "lodash/cloneDeep";

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== "production",
  mutations: {
    // 重置vuex本地储存状态
    resetStore(state) {
      Object.keys(state).forEach(key => {
        if (key === "theme") return; // 主题设置不重置
        state[key] = cloneDeep(window.initialStoreState[key]);
      });
    }
  },
  actions: {
    //
  },
  modules: {
    menu,
    theme,
  }
})