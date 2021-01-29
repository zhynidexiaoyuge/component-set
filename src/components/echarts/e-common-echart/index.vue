<template>
	<e-chart :delayTime="delayTime" :isMap="isMap" :option="getOption" :notMerge="notMerge" :width="width" :height="height" />
</template>

<script>
	import echartMap from "./libs/echartOptionUtils.js";
	export default {
		// 通用图表，用于通过简单的配置生成图表
		name: "e-common-echart",
		props: {
			chartInfo: {
				type: Object,
				default: function () {
					return {
						type: "barFn", // 图表类型
						data: [
							{ name: "A", value: 1 },
							{ name: "B", value: 2 },
							{ name: "C", value: 3 },
						],
					};
				},
			},
			isMap: {
				type: Boolean,
				default: false,
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
				default: 500,
			},
		},
		data() {
			return {};
		},
		computed: {
			getOption() {
				return echartMap[this.chartInfo.type](
					this.chartInfo.data,
					this.chartInfo
				);
			},
		},
	};
</script>

<style scoped>
</style>
