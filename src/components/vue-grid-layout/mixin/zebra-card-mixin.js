/**
 * zebra-card-mixin，主要用于实现数据请求、数据模拟、数据渲染功能
 * @author wucp 2020年12月10日14:15:09
 */
export default {
    data() {
        return {
            // 模拟数据 或 api接口响应数据
            apiData: null,
        }
    },
    methods: {
        /**
         * 初始化接口数据
         */
        initApiData(){
            let dataInfo = this.componentConfigInfo.dataInfo
            if(dataInfo){
                console.log('zebra-card初始化接口数据，标识：', dataInfo.apiFlag)
                // 模拟数据和接口保持一致，简化处理
                if(dataInfo.dataType=='mock' || dataInfo.dataType == null){
                    this.apiData = dataInfo.mockData
                    this.renderApiData()
                }else{
                    if(dataInfo.apiFlag){
                        // 每个组件单独请求，方便处理
                        this.getApiData(
                            {
                                _framework_param: {
                                    sqlkey: dataInfo.apiFlag
                                },
                                top: 50
                            },
                            data => {
                                // 解析接口数据
                                /*if(item.apiData.renderApiData && data[item.apiData.flag]!=null){
                                    console.log('开始渲染接口数据:',item.id,item.apiData.flag)
                                    item.apiData.renderApiData(data[item.apiData.flag], item.props);
                                }*/
                                this.apiData = data[dataInfo.apiFlag]
                                this.renderApiData()
                            }
                        );
                    }
                }
            }
        },
        /**
         * 将apiData模拟数据或接口响应数据，渲染为组件的入参props中的数据
         * @param renderType 预留使用
         */
        renderApiData(renderType){
            let data = this.renderCommonChartData(this.apiData)
            this.newProps.chartInfo.data = data
        },
        /**
         * 渲染图表所需数据
         * @param apiDataArray
         * @param xName
         * @param yName
         * @param xField
         * @param yField
         * @param topN
         * @returns {string|[]|number|*}
         */
        renderChartData(apiDataArray,xName,yName,xField,yField,topN) {
            return this.renderPieData(apiDataArray, xName ? xName : 'name', yName ? yName : 'value', xField ? xField : 'value1', yField ? yField : 'value2', topN)
        },
        /**
         * 渲染通用图表数据
         * @param apiDataArray
         * @returns {string|*[]|number|*}
         */
        renderCommonChartData(apiDataArray){
            return this.renderChartData(apiDataArray,'name','value','value1','value2')
        },
        /**
         *
         * @param apiDataArray
         * @param xName
         * @param yName
         * @param xField
         * @param yField
         * @returns {Array}
         */
        renderPieData(apiDataArray, xName, yName, xField, yField, topN) {
            let result = []
            if (topN) {
                apiDataArray = apiDataArray.slice(0, topN)
            }
            for (let i in apiDataArray) {
                let tmpMap = {}
                tmpMap[xName] = apiDataArray[i][xField ? xField : 'key']
                tmpMap[yName] = apiDataArray[i][yField ? yField : 'value']
                result.push(tmpMap)
            }
            return result
        },
    }
}