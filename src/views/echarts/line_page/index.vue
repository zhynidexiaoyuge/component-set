<template>
	<div class="home_page_container">
		折线图
		<!-- <chinaAndJs :dataList="mapData"></chinaAndJs> -->
	</div>
</template>

<script>
	// import HelloWorld from "./components/HelloWorld.vue";
	// import VUE_CONFIG from "VUE_CONFIG";
	import chinaAndJs from "@/components/echarts/chinaAndJs.vue";
	export default {
		name: "line_page",
		components: {
			chinaAndJs,
		},
		data() {
			return {
				mapData: [
					{
						from: "辽宁",
						to: "南京市",
					},
					{
						from: "江苏",
						to: "无锡市",
					},
				],
			};
		},
		mounted() {
			// console.log(VUE_CONFIG);
		},
	};
</script>

<style scoped>
	.home_page_container {
		/* background: rgba(0, 0, 255, 0.7); */
		/* width: 100%;
		height: 100%; */
	}
</style>
