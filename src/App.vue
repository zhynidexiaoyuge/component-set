<template>
	<div id="app">
		<router-view class="pfs" />
	</div>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import store from "./store";
	import screenAdapation from "@/utils/screen-adaptation";
	export default {
		name: "App",
		components: {},
		computed: mapState(["theme", "isLogin"]),
		created() {
			this.initScreen();
			this.setTheme(this.theme.name);
		},
		methods: {
			...mapMutations("theme", ["setTheme"]),
			// 屏幕适配
			initScreen() {
				screenAdapation(document.querySelector("body"));
			},
		},
	};
</script>

<style scoped lang="scss">
	// #app {
	// 	// width: 100%;
	// 	// height: 100%;
	// 	// width: 1920px;
	// 	height: 1080px;
	// 	// overflow: hidden;
	// 	background: cadetblue;

	// 	.pf {
	// 		width: 100%;
	// 		height: 100%;
	// 	}
	// }

	#app {
		width: 100%;
		height: 100%;
		// width: 1920px;
		// height: 1080px;
		overflow: auto;
		// background: cadetblue;

		.pfs {
			width: 100%;
			height: 100%;
		}
	}
</style>
