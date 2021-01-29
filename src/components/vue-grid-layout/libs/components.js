let componentConfig = {}

componentConfig.componentList = [{
        id: 1,
        title: '3D柱状图-方形',
        isShowTitle: true,
        name: "e-common-echart",
        props: {
            delayTime: 500,
            chartInfo: {
                type: 'bar3D', // 图表类型
                labelWordNumPerLine: '10',
                // rotate: 30,
                data: [{
                        name: '攻击事件',
                        value: 15000
                    },
                    {
                        name: '漏洞事件',
                        value: 13000
                    },
                    {
                        name: '恶意程序',
                        value: 4000
                    },
                    {
                        name: 'Web事件',
                        value: 3500
                    },
                    {
                        name: 'DNS',
                        value: 1000
                    }
                ]
            },
            notMerge: true,
            height: "300px",
            width: "680px"
        }
    },
    {
        id: 2,
        title: '3D柱状图',
        isShowTitle: true,
        name: "e-common-echart",
        props: {
            delayTime: 500,
            chartInfo: {
                type: 'bar3D', // 图表类型
                labelWordNumPerLine: '10',
                // rotate: 30,
                data: [{
                        name: '攻击事件',
                        value: 15000
                    },
                    {
                        name: '漏洞事件',
                        value: 13000
                    },
                    {
                        name: '恶意程序',
                        value: 4000
                    },
                    {
                        name: 'Web事件',
                        value: 3500
                    },
                    {
                        name: 'DNS',
                        value: 1000
                    }
                ]
            },
            notMerge: true,
            height: "300px",
            width: "680px"
        }
    }
]

export default componentConfig