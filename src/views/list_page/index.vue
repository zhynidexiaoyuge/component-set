<template>
	<div class="line_page_container">
		<panel :style="{width:'1100px',height:'100px'}">
			<count-list />
		</panel>
	</div>
</template>

<script>
	import panel from "@/components/panel";
	import countList from "@/components/list/count-list";
	export default {
		name: "list_page",
		components: { panel, countList },
		data() {
			return {};
		},
		mounted() {},
	};
</script>

<style scoped>
	.line_page_container {
		width: 100%;
		height: 100%;
		background: url("/image/nxbg.png") no-repeat;
		background-size: 100% 100%;
	}
</style>
