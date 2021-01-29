export const getMenuList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{
        name: "列表页面",
        seq: "2",
        type: 1,
        icon: 'fa-list',
        url: "/list_page",
      }, {
        name: "图表页面",
        seq: "3",
        type: 1,
        url: "/echarts",
        icon: 'fa-tv',
        children: [{
          name: "地图",
          seq: "3-1",
          type: 1,
          icon: 'fa-line-chart',
          url: "/map_page"
        }, {
          name: "折线图",
          seq: "3-2",
          type: 1,
          icon: 'fa-line-chart',
          url: "/line_page"
        }, {
          name: "柱状图",
          seq: "3-3",
          type: 1,
          icon: 'fa-bar-chart',
          url: "/bar_page"
        }]
      }, {
        name: "外链测试",
        seq: "4",
        type: 1,
        icon: 'fa-question-circle-o',
        url: "http://www.baidu.com",
        openMode: '_blank'
      }])
    })
  }, 1500)
}