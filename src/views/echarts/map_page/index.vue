<template>
	<div class="map_page_container">
		<e-chart :option="getMapChartOption" @click="mapClick" />
	</div>
</template>

<script>
	export default {
		name: "map_page",
		components: {},
		data() {
			return {
				geoJson: {},
				mapName: "北京",
			};
		},
		computed: {
			getMapChartOption() {
				var option = {
					geo: {
						// 地图的阴影层
						map: this.mapName,
						roam: false,
						zlevel: 0,
						layoutCenter: ["50%", "50%"],
						label: {
							emphasis: {
								show: false,
							},
						},
						itemStyle: {
							normal: {
								areaColor: "#245f9b",
								shadowColor: "#182f68",
								// shadowOffsetX: 0,
								shadowOffsetY: 10,
							},
							emphasis: {
								areaColor: "#2AB8FF",
								borderWidth: 0,
								color: "green",
								label: {
									show: false,
								},
							},
						},
						regions: [
							{
								name: "南海诸岛",
								itemStyle: {
									areaColor: "transparent",
									borderColor: "transparent",
								},
								emphasis: {
									itemStyle: {
										areaColor: "transparent",
										borderColor: "transparent",
									},
								},
							},
						],
					},
					series: [
						{
							type: "map",
							mapType: this.mapName,
							// geoIndex: 0,
							roam: false,
							label: {
								normal: {
									show: true,
									color: "#fff",
									fontSize: 16,
								},
							},
							itemStyle: {
								normal: {
									areaColor: "#235b98",
									shadowColor: "#182f68",
									shadowOffsetX: 0,
									shadowOffsetY: 0,
								},
								emphasis: {
									areaColor: "#2AB8FF",
									borderWidth: 0,
									color: "green",
									label: {
										show: false,
									},
								},
							},
						},
					],
				};
				return option;
			},
		},
		mounted() {},
		methods: {
			mapClick(params) {
				console.log(params.name);
				this.mapName = params.name;
			},
		},
	};
</script>

<style scoped>
	.map_page_container {
		width: 100%;
		height: 100%;
		background: cadetblue;
	}
</style>
