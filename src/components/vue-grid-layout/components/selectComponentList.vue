<template>
	<div>
		<el-row>
			<template v-for="(componentItem, index) in componentList">
				<el-col :span="12" :key="index">
					<el-card class="my-card">
						<div slot="header" class="clearfix">
							<div class="my-card-title">
								<el-radio v-model="currentComponentRadio" :label="componentItem.id">{{componentItem.title}}</el-radio>
							</div>
						</div>
						<div class="small-div">
							<div class="chart-div">
								<component :is="componentItem.name" v-bind="componentItem.props" />
							</div>
						</div>
					</el-card>
				</el-col>
			</template>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: "selectComponentList",
		props: {
			// 组件列表
			componentList: {
				type: Array,
				default: function () {
					return [];
				},
			},
		},
		data() {
			return {
				// 当前组件选择标识
				currentComponentRadio: null,
			};
		},
		watch: {
			currentComponentRadio: "handleChange",
		},
		methods: {
			handleChange(value) {
				let componentItem = this.componentList.find((item) => {
					return item.id == value;
				});
				this.$emit("selected", value, componentItem);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.el-col {
		padding: 10px;
	}
	.my-card {
		width: 100%;
		/*margin-bottom: 10px;*/
		/*height: 300px;*/
		margin: 10px 10px;
		background-color: transparent;
		.my-card-title /deep/ .el-radio__label {
			font-size: 20px;
			padding-left: 10px;
			color: white;
		}
	}
</style>
