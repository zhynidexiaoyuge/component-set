import Vue from 'vue'
// 网格布局组件
Vue.component('vue-grid-layout', () => import('@/components/vue-grid-layout'))
// echarts图表加载组件
Vue.component('e-chart', () => import('@/components/echarts'))
// 通用图表组件（封装常见组件）
Vue.component('e-common-echart', () => import('@/components/echarts/e-common-echart'))
// 通用图表组件（封装常见组件）
Vue.component('zebra-card', () => import('@/components/vue-grid-layout/components/zebra-card/zebra-card'))