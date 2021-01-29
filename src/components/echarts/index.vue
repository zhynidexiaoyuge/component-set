<template>
	<div ref="echarts" :style="{ height: height, width: width }"></div>
</template>

<script>
	import echarts from "echarts/lib/echarts";
	import "echarts/map/js/china.js";
	import "echarts/map/js/world.js";
	// import 'echarts/map/js/province/jiangsu.js'
	import 'echarts/map/js/province/beijing.js'
	// import 'echarts/map/js/province/shanghai.js'

	export default {
		name: "e-chart",
		props: {
			option: {
				type: Object,
				required: true,
			},
			/**
			 * 是否替换默认地图数据，目前支持geojson地图数据格式
			 */
			isMap: {
				type: Boolean,
				default: false,
			},
			/**
			 * 注册地图名称（isMap为true时生效）
			 */
			mapName: {
				type: String,
				default: "china",
			},
			/**
			 * 注册地图geojson文件路径（isMap为true时生效）
			 */
			geojsonUrl: {
				type: String,
				default: "/script/china1.json",
			},
			height: {
				type: String,
				default: "100%",
			},
			width: {
				type: String,
				default: "100%",
			},
			// 可选，是否不跟之前设置的 option 进行合并，默认为 false，即合并。
			// https://www.echartsjs.com/zh/api.html#echartsInstance.setOption
			notMerge: {
				type: Boolean,
				default: false,
			},
			// 延时执行秒数
			delayTime: {
				type: Number,
				default: 0,
			},
		},
		data() {
			return {};
		},
		watch: {
			echartInstance: null,
			option: {
				handler: "initChart",
				// 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
				deep: true,
			},
		},
		mounted() {
			this.$nextTick(function () {
				// Code that will run only after the
				// entire view has been rendered
				//this.guid = this.guid()
				if (this.delayTime > 0) {
					setTimeout(() => {
						this.initChart();
					}, this.delayTime);
				} else {
					this.initChart();
				}
			});
		},
		beforeDestroy() {
			this.echartInstance.dispose();
			console.log("e-chart图表销毁后状态：", this.echartInstance.isDisposed());
		},
		methods: {
			initChart() {
				if (this.echartInstance == null) {
					if (this.isMap) {
						// 初始化地图实例 - 使用修正版本地图
						this.$axios
							.get(this.geojsonUrl)
							.then((res) => {
								echarts.registerMap(this.mapName, res);
								this.echartInstance = echarts.init(this.$refs.echarts);
								this.echartInstance.setOption(this.option);
								this.echartInstance.off("click");
								this.echartInstance.on("click", (params) => {
									this.$emit("click", params);
								});
							})
							.catch((err) => {
								console.log(err);
							});
					} else {
						this.echartInstance = echarts.init(this.$refs.echarts);
						this.echartInstance.setOption(this.option);
						this.echartInstance.off("click");
						this.echartInstance.on("click", (params) => {
							this.$emit("click", params);
						});
					}
				} else {
					this.echartInstance.setOption(this.option, this.notMerge);
					this.echartInstance.off("click");
					this.echartInstance.on("click", (params) => {
						this.$emit("click", params);
					});
				}
			},
		},
	};
</script>

<style scoped>
</style>
