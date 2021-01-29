<template>
    <div ref="smallDiv" class="small-div" style="position: absolute;left:0;right:0;top:0;bottom:0">
        <resize-sensor ref="resizeSensor" @resize="handleResize"/>
        <div v-if="isShowTitle" class="subhead" :class="{highlight: isTitleClick}">
            <span @click="$emit('titleClick',title)">{{title}}</span>
            <span v-if="tips" class="tips">{{ tips }}</span>
        </div>
        <div class="chart-div">
            <!--&lt;!&ndash;<zebra-echart :delayTime="500" :option="getUnusedNetWorkChartOptionMap" :notMerge="true" height="350px" />&ndash;&gt;
            <component :is="componentItem.name" v-bind="componentItem.props" />-->
            <slot v-bind:cardSize="cardSize" :newProps="newProps">
                待添加
            </slot>
        </div>
    </div>
</template>

<script>
    import resizeSensor from './resize-sensor'
    import zebraCardMixin from '@/components/vue-grid-layout/mixin/zebra-card-mixin'
    export default {
        name: "zebra-card",
        mixins: [zebraCardMixin],
        components: {
            resizeSensor
        },
        props: {
            title: {
                type: String,
                default: '标题'
            },
            // 标题右侧的小提示（如“单位：秒”）
            tips: {
                type: String,
                default: null
            },
            // 是否显示标题
            isShowTitle: {
                type: Boolean,
                default: true
            },
            // 是否标题可点击
            isTitleClick: {
                type: Boolean,
                default: false
            },
            // 组件配置信息，与组件库配置文件的一项对应
            componentConfigInfo: {
                type: Object
            },
            // 数据获取钩子函数，参数：param、
            getApiData: {
                type: Function
            }
        },
        data(){
            return {
                cardSize: {
                    width: 100,
                    height: 100
                },
                // 处理后的组件参数集
                newProps: {

                },
            }
        },
        watch: {
            // 侦听组件参数，且侦听开始之后直接调用
            componentConfigInfo: {
                handler: function (val, oldVal) {
                    if(this.componentConfigInfo){
                        console.log('zebra-card监测到componentConfigInfo变化，开始刷新组件的newProps数据...')
                        // 赋值给本地data，方便修改
                        this.newProps = JSON.parse(JSON.stringify(this.componentConfigInfo.props))
                        this.initApiData()
                    }
                },
                deep: true,
                immediate: true // 该回调将会在侦听开始之后被立即调用
            }
        },
        mounted() {
            this.$nextTick(function () {
                setTimeout(()=>{
                    // this.getCardInitResize()
                    // 手动触发容器resize事件核心函数
                    this.$refs.resizeSensor.update()
                },1000)
            })
        },
        methods: {
            /*getCardInitResize(){
                this.cardSize.width = this.$refs.smallDiv.offsetWidth
                this.cardSize.height = this.$refs.smallDiv.offsetHeight
            },*/
            handleResize(cardSize){
                // 高度减去标题
                if(this.isShowTitle){
                    cardSize.height = cardSize.height - 46
                }
                console.log('当前card内容空间大小：', cardSize.width, cardSize.height, this.title)
                this.cardSize = cardSize
            },
        }
    }
</script>

<style lang="scss" scoped>
    .small-div{
        //border: 1px dashed #ccc;
        //background: #00508926;
        position: relative;
        // tab按钮组
        .tab-btn{
            text-align: left;
            padding-left: 19px;
            background: url(../../images/c-title.png) no-repeat 16px bottom;
            padding-bottom: 5px;
            &.tab-big {
                background: none;
            }
            &.tab-small {
                padding-left: 19px;
                background: url(../../images/c-title.png) no-repeat 0px bottom;
            }
        }

        .comTitle {
            font-size: 30px;
            line-height: 46px;
            height: 46px;

            color: #fee122;
            text-indent: 20px;
            font-family: FZ;
        }
        .comTitle-small {
            background: url(../../images/aa.png) no-repeat;
            height: 46px;
        }

        /*新主题样式*/
        .subhead {
            font-size: 18px;
            height: 20px;
            line-height: 20px;
            position: relative;
            padding-left: 30px;
            // font-family: OPPOSans-M;
            font-weight: 500;
            padding-top: 10px;
            padding-bottom: 10px;
            color: #fff;
            &.highlight{
                cursor: pointer;
                &:hover {
                    color: yellow;
                }
            }

            &:before {
                content: "";
                display: block;
                width: 4px;
                height: 20px;
                position: absolute;
                top: 10px;
                left: 10px;
                background: #6a95ff;
            }

            .tips {
                float: right;
                font-size: 18px;
                color: #839253;
                position: relative;
                right: 30px;
                top: 0px;
            }
        }
    }
</style>
