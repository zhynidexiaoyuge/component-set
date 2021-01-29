<style scoped lang="scss">
	.site-header-box {
		width: 100%;
		height: 100%;
		.i-layout-header-trigger {
			position: relative;
			display: inline-block;
			width: 60px;
			height: 60px;
			text-align: center;
			cursor: pointer;
			.ivu-dedent {
				font-size: 18px;
				font-style: normal;
				font-weight: 400;
				font-variant: normal;
				color: #f6ca9d;
			}
		}
	}
</style>
<template>
	<div class="site-header-box">
		<span class="i-layout-header-trigger" @click="emitEvent()">
			<i class="ivu-dedent fa fa-indent jz" v-if="isHidden"></i>
			<i class="ivu-dedent fa fa-dedent jz" v-else></i>
		</span>
	</div>
</template>
<script>
	export default {
		name: "site-header",
		data() {
			return {
				isHidden: true,
			};
		},
		computed: {},
		methods: {
			emitEvent() {
				this.isHidden = !this.isHidden;
				this.$emit("toggleMenu", this.isHidden);
			},
		},
	};
</script>