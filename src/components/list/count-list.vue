<template>
	<div class="count_list fr">
		<div class="count_list_item f1" :class="activeIndex==index?'active':''" v-for="(item,index) in data" :key="index">
			<div class="circle_b" @click="changeActive(index)">
				<div class="circle_s"><span></span></div>
			</div>
			<div class="list_content">
				<span class="f-32" @click="changeActive(index)">{{item.value}}</span>
				<span class="f-20">{{item.name}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "count_list",
		components: {},
		props: {
			data: {
				type: Array,
				default: function () {
					return [
						{ name: "工业企业", value: "347,53" },
						{ name: "工业企业", value: "347,53" },
						{ name: "工业企业", value: "347,53" },
						{ name: "工业企业", value: "347,53" },
						{ name: "工业企业", value: "347,53" },
					];
				},
			},
		},
		data() {
			return {
				activeIndex: 0,
			};
		},
		beforeMount() {},
		mounted() {},
		computed: {},
		methods: {
			changeActive(index) {
				this.activeIndex = index;
			},
		},
	};
</script>
<style scoped lang="scss">
	.count_list {
		width: 100%;
		height: 70px;
		color: #fff;
		.count_list_item {
			position: relative;
			cursor: pointer;
			.circle_s {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 60px;
				height: 60px;
				border: 1px solid #26cecd;
				background: rgba(0, 234, 255, 0.15);
				border-radius: 50%;
				span {
					width: 100%;
					height: 100%;
				}
			}
			.circle_b {
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 70px;
				height: 70px;
				border: 1px solid rgba(0, 234, 255, 0.2);
				background: transparent;
				border-radius: 50%;
			}
			&.active {
				background: linear-gradient(
					to right,
					rgba(0, 234, 255, 0) 0%,
					rgba(0, 234, 255, 0.25) 50%,
					rgba(0, 234, 255, 0) 100%
				);
				.circle_b {
					border: 1px solid #ccd5db;
				}
			}
			// &:hover {
			// 	background: linear-gradient(
			// 		to right,
			// 		rgba(0, 234, 255, 0) 0%,
			// 		rgba(0, 234, 255, 0.25) 50%,
			// 		rgba(0, 234, 255, 0) 100%
			// 	);
			// 	.circle_b {
			// 		border: 1px solid #ccd5db;
			// 	}
			// }
			.list_content {
				position: absolute;
				left: 80px;
				height: 100%;
				width: 60%;
				span {
					display: block;
					&:nth-of-type(1) {
						margin-top: 10px;
						color: #33c1ff;
					}
					&:nth-of-type(2) {
						margin-top: 12px;
					}
				}
			}
			&:nth-child(even) {
				.list_content {
					span {
						&:nth-of-type(1) {
							margin-top: 10px;
							color: #33fff9;
						}
					}
				}
			}
		}
	}
</style>