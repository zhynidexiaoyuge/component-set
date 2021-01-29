/**
 * 作者：zhy
 * 描述：本项目常用图表抽取，用于通用组件 - 2020年11月18日15:25:41
 *
 */
import geoCoordMap from "./cityZuoBiao.js";
import echarts from "echarts/lib/echarts";

const compare = type => {
    return (a, b) => {
        a = typeof a === 'object' ? a[type] : a;
        b = typeof b === 'object' ? b[type] : b;
        return a - b;
    };
};

const compareDesc = type => {
    return (a, b) => {
        a = typeof a === 'object' ? a[type] : a;
        b = typeof b === 'object' ? b[type] : b;
        return b - a;
    };
};

const getMaxValue = (apiDataArray) => {
    let max = 0
    for (let i in apiDataArray) {
        if (Number(apiDataArray[i]['value']) > max) {
            max = Number(apiDataArray[i]['value'])
        }
    }
    return max
};

let echartMap = {}

/**
 * 柱状图3D效果
 * @param data
 * @param chartInfo
 * @returns {{yAxis: {axisLabel: {color: string, show: boolean, fontSize: number}, axisLine: {show: boolean}, splitLine: {lineStyle: {color: string}, show: boolean}, axisTick: {show: boolean}, type: string}, xAxis: [{axisLabel: {formatter: function(*): (string), rotate: *|number, color: string, show: boolean, fontSize: number, lineHeight: number, interval: number}, data: [], splitArea: {areaStyle: {color: [string, string]}, show: boolean}, axisLine: {lineStyle: {color: string}, show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}, {axisLabel: {formatter: string, show: boolean}, data: [], splitArea: {show: boolean}, axisLine: {show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}], grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: [{barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], zlevel: number, type: string}, {barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], xAxisIndex: number, tooltip: {show: boolean}, zlevel: number, type: string}], tooltip: {trigger: string}}}
 */
echartMap.bar3D = function (data = [], chartInfo) {
    var bar1 = 'image:///image/echarts/bar3D_square_red.png';
    var bar1_bg = 'image:///image/echarts/bar3D_square_red_bg.png';
    var bar2 = 'image:///image/echarts/bar3D_square_blue.png';
    var bar2_bg = 'image:///image/echarts/bar3D_square_blue_bg.png';
    var max = getMaxValue(data)
    var data = data.sort(compareDesc('value'));
    var bar_data = [];
    var bar_bg = [];
    var xAxisName = [];
    for (var i = 0; i < data.length; i++) {
        xAxisName.push(data[i].name);
        if (i == 0) {
            bar_data.push({
                name: data[i].name,
                value: data[i].value,
                symbol: bar1,
            });
            bar_bg.push({
                name: data[i].name,
                value: max,
                symbol: bar1_bg,
            });
        } else {
            bar_data.push({
                name: data[i].name,
                value: data[i].value,
                symbol: bar2,
            });
            bar_bg.push({
                name: data[i].name,
                value: max,
                symbol: bar2_bg,
            });
        }
    }
    var option01 = {
        grid: {
            top: '10%',
            bottom: '5%',
            left: '3%',
            right: '5%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: [{
                type: 'category',
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(230, 230, 230, 0.102)', 'transparent']
                    }
                },
                axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                    show: true,
                    lineStyle: {
                        color: 'rgba(230, 230, 230, 0.302)'
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    fontSize: 18,
                    lineHeight: 20,
                    color: '#feffff',
                    interval: 0,
                    rotate: chartInfo.rotate ? chartInfo.rotate : 0, //x轴名字倾斜
                    formatter: function (value) {
                        var str = "";
                        var num = 1; //每行显示字数
                        if (chartInfo.labelWordNumPerLine) {
                            num = chartInfo.labelWordNumPerLine
                        }
                        var valLength = value.length; //该项x轴字数
                        var rowNum = Math.ceil(valLength / num); // 行数

                        if (rowNum > 1) {
                            for (var i = 0; i < rowNum; i++) {
                                var temp = "";
                                var start = i * num;
                                var end = start + num;

                                temp = value.substring(start, end) + "\n";
                                str += temp;
                            }
                            return str;
                        } else {
                            return value;
                        }
                    }
                },
                data: xAxisName,
            },
            {
                type: 'category',
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false,
                },
                axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                    formatter: '',
                },
                data: xAxisName,
            }
        ],
        yAxis: {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(230, 230, 230, 0.102)'
                }
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
                fontSize: 14,
                color: '#feffff',
            },
        },
        series: [{
                type: 'pictorialBar',
                barWidth: 25,
                symbolRepeat: true,
                symbolSize: ['100%', '100%'],
                symbolOffset: [0, 0],
                symbolMargin: '-29%',
                zlevel: 2,
                data: bar_data
            },
            {
                type: 'pictorialBar',
                barWidth: 25,
                tooltip: {
                    show: false,
                },
                xAxisIndex: 1,
                symbolRepeat: false,
                symbolSize: ['100%', '100%'],
                symbolOffset: [0, 0],
                symbolMargin: '-29%',
                zlevel: 1,
                data: bar_bg
            }
        ]
    };
    return option01;
}

export default echartMap