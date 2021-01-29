import Mock from 'mockjs'
import qs from 'qs'

const routerINfo = [{
    path: "/",
    component: "Layout",
    redirect: "home_page",
    children: [{
        path: "home_page",
        component: "home_page",
        meta: {
            title: "首页",
            icon: "home_page"
        },
    }, {
        path: "bar_page",
        component: "bar_page",
        meta: {
            title: "柱状图",
            icon: "bar_page"
        }
    }]
}, {
    path: "/",
    component: "Layout",
    redirect: "login",
    children: [{
        path: "login",
        component: "login",
        meta: {
            title: "登录页",
            icon: "login"
        }
    }]
}, {
    path: "*",
    component: "Layout",
    redirect: "404",
    children: [{
        path: "404",
        component: "404",
        meta: {
            title: "404",
            icon: "404"
        }
    }]
}]

Mock.mock('/userInfo', 'post', () => {
    return {
        "code": 200,
        "message": "成功",
        "body": routerINfo,
        "timestamp": 1543997351104
    }
})