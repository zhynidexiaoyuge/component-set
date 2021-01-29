module.exports = file => require("@/views/" + file).default;
// module.exports = file => require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+

