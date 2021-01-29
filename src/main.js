import Vue from 'vue';
import App from './App.vue';
import store from './store'
// import router from "./router"; //路由初始化配置
// import './router/routes'; //路由数据动态获取
import "./element-ui-config.js"; //elemet-ui 初始化配置

import '@/assets/scss/init.scss' //初始化css样式
import '@/assets/scss/style.scss' //初始化css样式
import 'font-awesome/css/font-awesome.min.css'

// 通用组件全局注册
import '@/components'

Vue.config.productionTip = false

const bootstrap = async () => {
  await store.dispatch('getMenuList')
  new Vue({
    router: require('./router').default,
    store,
    render: h => h(App)
  }).$mount('#app')
}

bootstrap()