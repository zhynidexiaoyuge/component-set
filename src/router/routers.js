import Layout from '@/components/layout'
import store from '../store'
// const _import = require("./import-" + process.env.NODE_ENV);
const menuList = store.state.menu.menuList;
let routerArr = [];
let parentPath = '';

function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    let routeObj = {};
    if (!route.children) {
      routeObj.path = '/';
      routeObj.component = Layout;
      routeObj.redirect = route.url;
      routeObj.children = [{}]
      routeObj.children[0].path = route.url;
      routeObj.children[0].name = route.name;
      if (parentPath) {
        routeObj.children[0].component = () => import('../views' + parentPath + route.url)
      } else {
        routeObj.children[0].component = () => import('../views' + route.url)
      }
      routerArr.push(routeObj)
    } else {
      parentPath = route.url;
      route.children = filterAsyncRouter(route.children)
    }
    return route
  })
  return accessedRouters
}

// function filterAsyncRouter(asyncRouterMap) {
//   let routeObj = {};
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (!route.children) {
//       routeObj.path = route.url;
//       if (parentPath) {
//         routeObj.component = () => import('../views' + parentPath + route.url)
//       } else {
//         routeObj.component = () => import('../views' + route.url)
//       }
//       routerArr.push(routeObj)
//     } else {
//       parentPath = route.url;
//       route.children = filterAsyncRouter(route.children)
//     }
//   })
//   return accessedRouters
// }
filterAsyncRouter(menuList);
const routers = routerArr;
export default [{
    path: '/',
    component: Layout,
    redirect: '/home_page',
    children: [{
      path: 'home_page',
      name: '首页',
      component: () => import('../views/home_page'),
    }]
  },
  {
    path: '/login',
    component: () => import('../views/login'),
    hidden: true
  },
  ...routers,
  // {
  //   path: '*',
  //   component: () => import('../views/error-page/404')
  // },
  {
    path: '*',
    component: Layout,
    redirect: '/404',
    children: [{
      path: '404',
      name: '页面找不到',
      component: () => import('../views/error-page/404')
    }]
  }
]