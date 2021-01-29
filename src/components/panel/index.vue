<template>
	<div class="panel_box" :style="{ height, width,left,top }">
		<slot>暂无数据</slot>
	</div>
</template>
<script>
	export default {
		name: "",
		components: {},
		props: {
			height: {
				type: String,
				default: "100%",
			},
			width: {
				type: String,
				default: "100%",
			},
			left: {
				type: String,
				default: "0px",
			},
			top: {
				type: String,
				default: "0px",
			},
		},
		data() {
			return {};
		},
		beforeMount() {},
		mounted() {},
		computed: {},
		methods: {},
	};
</script>
<style scoped lang="scss">
	.panel_box {
		position: absolute;
		left: 0;
		top: 0;
		padding: 10px;
	}
</style>