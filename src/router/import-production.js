module.exports = file => () => import(/* webpackChunkName: "[request]" */ "@/views/" + file);
// module.exports = file => () => import('@/views/' + file)

