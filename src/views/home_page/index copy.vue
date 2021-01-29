<template>
	<div class="home_page_container">
		<div class="main_body_container">
			<!-- <vue-grid-layout gridFlag="首页" :useCssTransforms="true" :gridLayoutEnable="gridLayoutEnable" :defaultLayout="DefaultLayout" :defaultComponentList="defaultComponentListData">
				<template v-slot:item="{ item }">
					<template v-if="item.i == `测试标题2`">
						<zebra-card title="设备概览">
							<template v-slot:default="slotProps">
								{{slotProps}}
							</template>
						</zebra-card>
					</template>
				</template>
			</vue-grid-layout> -->
			<vue-grid-layout gridFlag="首页" :useCssTransforms="true" :gridLayoutEnable="gridLayoutEnable"></vue-grid-layout>
		</div>
	</div>
</template>

<script>
	import routers from "../../router/routers";
	export default {
		// components: {  },
		name: "home_page",
		data() {
			return {
				// 布局调试开关
				gridLayoutEnable: VUE_CONFIG.gridLayoutEnable,
				DefaultLayout: [
					{ x: 2, y: 29, w: 494, h: 29, i: "测试标题1", moved: false },
					{ x: 2, y: 0, w: 493, h: 29, i: "测试标题2", moved: false },
					{ x: 499, y: 0, w: 919, h: 58, i: "测试标题3", moved: false },
					{ x: 1422, y: 0, w: 492, h: 29, i: "测试标题4", moved: false },
					{ x: 500, y: 58, w: 919, h: 29, i: "测试标题5", moved: false },
					{
						x: 1422,
						y: 29,
						w: 492,
						h: 29,
						i: "测试标题6",
						moved: false,
					},
					{ x: 2, y: 58, w: 494, h: 29, i: "测试标题7", moved: false },
					{
						x: 1423,
						y: 58,
						w: 492,
						h: 29,
						i: "测试标题8",
						moved: false,
					},
				],
				defaultComponentListData: [
					{
						id: "测试标题2",
						title: "3D柱状图-方形",
						isShowTitle: true,
						name: "e-common-echart",
						props: {
							delayTime: 500,
							chartInfo: {
								type: "bar3D",
								labelWordNumPerLine: "10",
								data: [
									{
										name: "事件1",
										value: 15000,
									},
									{
										name: "事件2",
										value: 13000,
									},
									{
										name: "事件3",
										value: 4000,
									},
									{
										name: "事件4",
										value: 3500,
									},
									{
										name: "事件5",
										value: 1000,
									},
								],
							},
							notMerge: true,
							height: "300px",
							width: "680px",
						},
					},
				],
			};
		},
		mounted() {
			console.log("组织好的路由数据如下所示");
			console.table(routers);
		},
	};
</script>

<style scoped>
	.home_page_container {
		width: 100%;
		height: 100%;
		background: url("/image/background.png") no-repeat center;
	}
</style>
