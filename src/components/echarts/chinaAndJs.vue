<template>
	<div class="map-wrapper">
		<div ref="map" id="map"></div>
	</div>
</template>

<script>
	import _ from "lodash";
	import echarts from "echarts";
	import nameMap from "@/utils/echarts/echartsNameMap";
	import countryCoord from "@/utils/echarts/countryCoord";
	import "echarts/map/js/province/jiangsu";
	import "echarts/map/js/world";
	import "echarts/map/js/china";
	// import "@/utils/echarts/world-china";
	const geoJson = echarts.getMap("china").geoJson;
	const regions = geoJson.features.map((feature) => {
		const name = feature.properties.name;
		const nameCn = nameMap[name];
		return {
			name,
			nameCn,
			coord: countryCoord[nameCn || name],
		};
	});
	// 收集江苏区县级别坐标
	echarts.getMap("江苏").geoJson.features.forEach((feature) => {
		const name = feature.properties.name;
		const nameCn = nameMap[name] || name;
		regions.push({
			name,
			nameCn,
			coord: feature.properties.cp,
		});
	});
	// 根据省份区县名称获取坐标
	const getRegionByName = (name) => {
		if (!name) {
			return null;
		}
		name = name.toLowerCase();
		return _.find(regions, (item) => {
			return (
				(item.name && item.name.toLowerCase() === name) ||
				(item.nameCn && item.nameCn.toLowerCase() === name)
			);
		});
	};
	export default {
		props: {
			dataList: Array,
		},
		watch: {
			dataList() {
				this.setChartData();
			},
		},
		mounted() {
			this.initChart();
			this.setChartData();
			this._onResize = () => {
				this.resize();
			};
			window.addEventListener("resize", this._onResize);
		},
		destroyed() {
			if (this._chart) {
				this._chart.dispose();
			}
			window.removeEventListener("resize", this._onResize);
		},
		methods: {
			initChart() {
				let chart = this._chart || echarts.init(this.$refs.map);
				let layoutSize = this.fullscreen
					? ((this.$refs.map.offsetWidth - 20) / 2) * 0.9
					: "95%";
				const lineOption = {
					type: "lines",
					zlevel: 2,
					effect: {
						show: true,
						period: 4, //箭头指向速度，值越小速度越快
						trailLength: 0.04, //特效尾迹长度[0,1]值越大，尾迹越长重
						symbol: "arrow", //箭头图标
						symbolSize: 7, //图标大小
						color: "#fff",
					},
					lineStyle: {
						normal: {
							color: "#ff4948",
							width: 1, //尾迹线条宽度
							opacity: 1, //尾迹线条透明度
							curveness: 0.3, //尾迹线条曲直度
						},
					},
					silent: true,
					data: [],
				};
				const orangeOptoin = {
					type: "effectScatter",
					coordinateSystem: "geo",
					symbolSize: 14,
					itemStyle: {
						color: "#fa8749",
					},
					data: [],
				};
				chart.setOption({
					grid: {
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
					},
					tooltip: {
						show: true,
						formatter: (e) => {
							let str = "";
							if (e.componentSubType === "effectScatter") {
								str = `
											              ${e.name}<br />
											              IP：${e.data.resourceIp}<br />
											              名称：${e.data.resourceName}<br />
											              `;
							}
							return str;
						},
					},
					xAxis: {
						type: "value",
						show: false,
						min: 0,
						max: 100,
						position: "top",
					},
					yAxis: {
						type: "value",
						show: false,
						min: 0,
						max: 100,
						inverse: true,
					},
					geo: [
						{
							map: "江苏",
							label: {
								normal: {
									show: false,
								},
								emphasis: {
									show: false,
								},
							},
							roam: false, //是否允许缩放
							zoom: 1,
							layoutCenter: ["75%", "50%"], //地图位置
							layoutSize,
							itemStyle: {
								normal: {
									color: "#02316b",
									borderColor: "#39a9d0",
								},
								emphasis: {
									color: "#23618b",
									borderColor: "#39a9d0",
								},
							},
						},
						{
							map: "china",
							label: {
								normal: {
									show: false,
								},
								emphasis: {
									show: false,
								},
							},
							roam: false, //是否允许缩放
							zoom: 1,
							layoutCenter: ["25%", "50%"], //地图位置
							layoutSize,
							itemStyle: {
								normal: {
									color: "#02316b",
									borderColor: "#39a9d0",
								},
								emphasis: {
									color: "#23618b",
									borderColor: "#39a9d0",
								},
							},
						},
					],
					series: [
						{
							name: "lines_cross",
							...lineOption,
							coordinateSystem: "cartesian2d",
							xAxisIndex: 0,
							yAxisIndex: 0,
						},
						{
							name: "orange",
							...orangeOptoin,
						},
						{
							name: "orange_l",
							geoIndex: 1,
							...orangeOptoin,
						},
					],
				});
				chart.on("click", this.onChartClick);
				this._chart = chart;
			},
			setChartData() {
				const dataList = this.dataList;
				if (this._chart) {
					let lineDataC = [];
					let orangePointData = [];
					let orangePointDataL = [];
					if (dataList) {
						console.log(dataList);
						const chinaPointMap = {};
						const jiangsuPointMap = {};
						dataList.forEach((item) => {
							let start = chinaPointMap[item.from];
							let end = jiangsuPointMap[item.to];
							if (!start) {
								let region = getRegionByName(item.from);
								start = {
									name: item.from,
									value: region && region.coord,
								};
								chinaPointMap[item.from] = start;
							}
							if (!end) {
								let region = getRegionByName(item.to);
								end = {
									name: item.to,
									value: region && region.coord,
								};
								jiangsuPointMap[item.to] = end;
							}
							console.log(start, end);
							// 跨区域连线
							const convertCoord = (coord, isProvince) => {
								if (!this._chart) {
									return null;
								}
								let geoIndex = isProvince ? 0 : 1;
								const pos = this._chart.convertToPixel({ geoIndex }, coord);
								return this._chart.convertFromPixel("grid", pos);
							};
							const pos1 = convertCoord(start.value);
							const pos2 = convertCoord(end.value, true);
							lineDataC.push({
								coords: [pos1, pos2],
								value: 10,
								fromName: "source",
								toName: "target",
							});
						});
						// 加入点
						orangePointDataL = Object.values(chinaPointMap);
						orangePointData = Object.values(jiangsuPointMap);
					}
					this._chart.setOption({
						series: [
							{
								name: "lines_cross",
								data: lineDataC,
							},
							{
								name: "orange",
								data: orangePointData,
							},
							{
								name: "orange_l",
								data: orangePointDataL,
							},
						],
					});
				}
			},
			onChartClick(e) {
				if (
					e.componentSubType === "effectScatter" &&
					e.data &&
					e.data.resourceId
				) {
					this.$router.push(`/resource/${e.data.resourceId}`);
				}
			},
			resize() {
				if (this._chart) {
					this._chart.resize();
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.map-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}
	#map {
		width: 100%;
		height: 100%;
	}
</style>
