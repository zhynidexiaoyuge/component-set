<template>
	<div style="position: relative;" @click.ctrl.alt="currentGridLayoutEnable=!currentGridLayoutEnable">
		<!--自定义工具条-->
		<div class="gird-layout-tool" :style="getLayoutToolPosition">
			<el-button-group v-if="isEditor">
				<el-button size="mini" type="primary" icon="el-icon-plus" @click="addGridItem">新增</el-button>
				<el-button size="mini" type="primary" icon="el-icon-delete" @click="cleanGridItem">清空所有</el-button>
				<el-button size="mini" type="primary" icon="el-icon-delete" @click="clearCurrentLayoutLocalStorage">还原默认</el-button>
				<el-button size="mini" type="primary" icon="el-icon-editor" @click="openEditorComponentDialog">组件编辑</el-button>
				<el-popover placement="top" width="160" v-model="savePopoverVisible">
					<p>确定要保存吗？</p>
					<div style="text-align: right; margin: 0">
						<el-button size="mini" type="text" @click="savePopoverVisible = false">取消</el-button>
						<el-button type="primary" size="mini" @click="saveLayout()">确定</el-button>
					</div>
					<el-button slot="reference" size="mini" type="primary" icon="el-icon-check">保存</el-button>
				</el-popover>
			</el-button-group>
			&nbsp;&nbsp;
			<el-button-group v-if="currentGridLayoutEnable">
				<span style="color:white;">编辑</span>
				<el-switch size="mini" title="编辑" v-model="isEditor" active-color="#13ce66" inactive-color="#ff4949">
				</el-switch>
			</el-button-group>
		</div>
		<grid-layout :layout.sync="layout" :col-num="1920" :row-height="1" :max-rows="1080" :is-draggable="true" :is-resizable="true" :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]"
			:use-css-transforms="useCssTransforms" :class="{'no-editor': !isEditor}">
			<grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" drag-allow-from=".vue-draggable-handle,.vue-draggable-handle-my"
				drag-ignore-from=".no-drag" @resized="handleResizedEvent" :class="{'no-editor': !isEditor}">
				<template v-if="isEditor">
					<div class="vue-draggable-handle-my"><i class="el-icon-rank"></i></div>
					<div class="gird-item-delete">
						<span @click="openSelectComponentDialog(item.i)"><i class="el-icon-plus"></i></span>
						&nbsp;
						<span @click="removeGridItemComponent(item.i)"><i class="el-icon-minus"></i></span>
						&nbsp;
						<span @click="editorGridItem(item.i)"><i class="el-icon-edit"></i></span>
						&nbsp;
						<span @click="deleteGridItem(item.i)"><i class="el-icon-delete"></i></span>
					</div>
					<div class="gird-flag">{{item.i}}</div>
				</template>
				<!-- 优先显示组件列表指定的图表项 -->
				<template v-if="componentList.findIndex(component => component.id == item.i)!=-1">
					<template v-for="(componentItem,index) in componentList">
						<template v-if="item.i == componentItem.id">
							<!--<div class="small-div">
                                                        <div class="comTitle comTitle-small">
                                                            <span>{{componentItem.title}}</span>
                                                        </div>
                                                        <div class="chart-div">
                                                            &lt;!&ndash;<zebra-echart :delayTime="500" :option="getUnusedNetWorkChartOptionMap" :notMerge="true" height="350px" />&ndash;&gt;
                                                            <component :is="componentItem.name" v-bind="componentItem.props" />
                                                        </div>
                                                    </div>-->
							<!-- :getApiData="getApiData" -->
							<zebra-card :componentConfigInfo="componentItem" :title="componentItem.id" :is-show-title="componentItem.isShowTitle"
								:isTitleClick="componentItem.isTitleClick?componentItem.isTitleClick:false" @titleClick="handleCardTitleClick" :key="index">
								<template v-slot:default="slotProps">
									<component :is="componentItem.name" v-bind="slotProps.newProps" :width="slotProps.cardSize.width + 'px'" :height="slotProps.cardSize.height + 'px' "
										:style="{ width: slotProps.cardSize.width + 'px', height: slotProps.cardSize.height + 'px'}" :key="componentItem.id + componentItem.name" />
								</template>
								<!--<data-load-container :flag="componentItem.apiData?componentItem.apiData.flag:''">
                                    <template v-slot:default="slotComponentProps" >
                                        <component :is="componentItem.name" v-bind="slotComponentProps" />
                                    </template>
                                </data-load-container>-->
							</zebra-card>
						</template>
					</template>
				</template>
				<slot v-else name="item" v-bind:item="item">
					<!-- 后备内容 -->
				</slot>
			</grid-item>
		</grid-layout>
		<el-dialog title="编辑区域" :visible.sync="dialogFormVisible" :modal-append-to-body='false' :close-on-click-modal="false">
			<el-form :model="form">
				<el-form-item label="名称" label-width="200">
					<el-input v-model="form.i" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveGridItem">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="布局数据提示" :visible.sync="saveDialogVisible" :modal-append-to-body='false' :close-on-click-modal="false">
			<p>
				当前布局数据临时存放在浏览器缓存中，请预览并确认布局后，将下面的布局数据，复制到当前页面（组件）的data的<el-tag type="danger">defaultLayout</el-tag>中！
			</p>
			<el-form>
				<el-form-item label="布局数据" label-width="200">
					<el-input type="textarea" :rows="5" v-model="saveDialogLayoutData" autocomplete="off" readonly></el-input>
				</el-form-item>
				<el-form-item label="组件数据" label-width="200">
					<el-input type="textarea" :rows="10" v-model="saveDialogComponentListData" autocomplete="off" readonly></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="saveDialogVisible = false">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="组件编辑" :visible.sync="editorComponentDialogVisible" :modal-append-to-body='false' :close-on-click-modal="false">
			<p>
				直接编辑点击保存生效
			</p>
			<el-form>
				<!--<el-form-item label="布局数据" label-width="200">
                    <el-input type="textarea" :rows="5" v-model="saveDialogLayoutData" autocomplete="off" readonly></el-input>
                </el-form-item>-->
				<el-form-item label="组件数据" label-width="200">
					<el-input type="textarea" :rows="20" v-model="editorDialogComponentListData" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="applyEditorDialogComponentListData">应 用</el-button>
				<el-button @click="saveEditorDialogComponentListData">保 存</el-button>
			</div>
		</el-dialog>
		<el-dialog title="组件预览选择" :visible.sync="selectDialogVisible" center width="80%" :modal-append-to-body='false' :close-on-click-modal="false" :destroy-on-close="true" class="component-prev-dialog">
			<select-component-list :component-list="selectComponentList" @selected="handleSelectComponent" />
			<!-- <div slot="footer" class="dialog-footer">
                <el-button @click="selectDialogVisible = false">确 定</el-button>
            </div> -->
		</el-dialog>
	</div>
</template>
<script>
	import VueGridLayout from "vue-grid-layout";
	import SelectComponentList from "./components/selectComponentList";
	// 导入组件列表配置
	import componentConfig from "./libs/components.js";
	export default {
		name: "vue-grid-layout",
		components: {
			GridLayout: VueGridLayout.GridLayout, //注册布局容器
			GridItem: VueGridLayout.GridItem, //注册布局item
			SelectComponentList,
		},
		props: {
			/**
			 * 编辑模式开关
			 */
			defaultEditor: {
				type: Boolean,
				default: false,
			},
			// girdLayout组件的useCssTransforms属性
			useCssTransforms: {
				type: Boolean,
				default: true,
			},
			/**
			 * 默认全局布局开关
			 */
			gridLayoutEnable: {
				default: false,
				type: Boolean,
			},
			/**
			 * 默认布局数据-localStorage没有布局数据时，使用该数据
			 */
			defaultLayout: {
				type: Array,
				default: function () {
					return [{ x: 2, y: 29, w: 494, h: 29, i: "DEMO", moved: false }];
				},
			},
			/**
			 * 页面标识-用于唯一标识布局
			 */
			gridFlag: {
				type: String,
				default: "vue-grid-flag",
			},
			// 默认组件列表数据，localStorage没有组件列表数据时，使用该数据
			defaultComponentList: {
				type: Array,
				default: function () {
					return [];
				},
			},
		},
		data() {
			return {
				// 当前布局开关，可ctrl+alt+click触发切换编辑按钮
				currentGridLayoutEnable: this.gridLayoutEnable,
				// 编辑模式开关
				isEditor: this.defaultEditor,
				//布局数据
				layout: [],
				//保存数据时确认与取消的信息框
				savePopoverVisible: false,
				// 工具条位置
				layoutToolPosition: 1,
				// 保存后弹框
				saveDialogVisible: false,
				//正在编辑的布局容器
				currentEditorGirdItemFlag: "",
				// 正在编辑的布局容器的title修改框
				dialogFormVisible: false,
				// 正在编辑的布局容器的title
				form: {
					i: "",
				},
				selectDialogVisible: false, //组件选择弹框
				// 所有组件库，用于选择组件列表
				selectComponentList: componentConfig.componentList,
				// 当前大屏的组件列表，来自缓存或页面传入
				componentList: [],
				// 数据获取钩子函数，参数：param、
				getApiData: {
					type: Function,
				},
				// 组件编辑窗口
				editorComponentDialogVisible: false,
				// 编辑窗口组件数据
				editorDialogComponentListData: "",
				// 保存后弹窗中的组件数据
				saveDialogComponentListData: "",
				// 保存后弹框中的布局数据
				saveDialogLayoutData: "",

				// 是否初始化所有组件，用于调试方便
				isInitAllComponentList: false,
			};
		},
		beforeMount() {},
		mounted() {
			this.initLayout();
			this.initComponentList();
		},
		computed: {
			getLayoutToolPosition() {
				//工具条位置布局
				let result = {};
				if (this.layoutToolPosition == 0) {
					result = {
						left: 0,
						top: 0,
					};
				} else if (this.layoutToolPosition == 1) {
					result = {
						right: "50px",
						top: "-30px",
					};
				} else if (this.layoutToolPosition == 2) {
					result = {
						right: 0,
						bottom: 0,
					};
				} else if (this.layoutToolPosition == 3) {
					result = {
						left: 0,
						bottom: 0,
					};
				}
				return result;
			},
		},
		watch: {
			test: {
				deep: true,
				handler(value) {},
			},
		},
		methods: {
			/**
			 * 初始化接口数据
			 */
			initApiData() {
				console.log("布局组件初始化接口数据");
				this.componentList.forEach((item) => {
					// 模拟数据和接口保持一致，简化处理
					if (item.isMockData) {
						// 解析接口数据
						if (item.apiData.renderApiData && item.mockData != null) {
							item.apiData.renderApiData(item.mockData, item.props);
						}
					} else {
						if (item.apiData && item.apiData.flag) {
							// 每个组件单独请求，方便处理
							this.getApiData(
								{
									_framework_param: {
										sqlkey: item.apiData.flag,
									},
									top: 50,
								},
								(data) => {
									// 解析接口数据
									if (
										item.apiData.renderApiData &&
										data[item.apiData.flag] != null
									) {
										console.log("开始渲染接口数据:", item.id, item.apiData.flag);
										item.apiData.renderApiData(
											data[item.apiData.flag],
											item.props
										);
									}
								}
							);
						}
					}
				});
			},
			initLayout() {
				let allGridFlag = {};
				if (localStorage.getItem("grid-layout-data")) {
					allGridFlag = JSON.parse(localStorage.getItem("grid-layout-data"));
				}
				if (allGridFlag[this.gridFlag]) {
					this.layout = allGridFlag[this.gridFlag];
				} else {
					// 注意这里深度克隆，防止情况缓存重置无效
					this.layout = JSON.parse(JSON.stringify(this.defaultLayout));
				}
			},
			saveLayout() {
				this.savePopoverVisible = false;
				let allGridFlag = {};
				if (localStorage.getItem("grid-layout-data")) {
					allGridFlag = JSON.parse(localStorage.getItem("grid-layout-data"));
				}
				allGridFlag[this.gridFlag] = this.layout;
				localStorage.setItem("grid-layout-data", JSON.stringify(allGridFlag));
				// 保存当前大屏的组件列表数据
				this.saveComponentList();
				this.$message({
					type: "success",
					message: "保存成功",
				});
				this.saveDialogVisible = true;
				this.saveDialogLayoutData = JSON.stringify(this.layout);
				this.saveDialogComponentListData = JSON.stringify(
					this.componentList,
					null,
					2
				);
			},
			addGridItem() {
				//增加布局容器
				this.$prompt("请输入新增容器的标识信息", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
				})
					.then(({ value }) => {
						this.$message({
							type: "success",
							message: "容器的标识是: " + value,
						});
						this.layout.push({
							x: 0,
							y: 0,
							w: 400,
							h: 10,
							i: value,
							moved: false,
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "取消输入",
						});
					});
			}, //新增布局组件
			cleanGridItem() {
				this.layout = [];
				this.componentList = [];
			}, //删除组件
			clearCurrentLayoutLocalStorage() {
				let allGridFlag = {};
				if (localStorage.getItem("gird-layout-data")) {
					allGridFlag = JSON.parse(localStorage.getItem("gird-layout-data"));
				}
				delete allGridFlag[this.gridFlag];
				localStorage.setItem("gird-layout-data", JSON.stringify(allGridFlag));
				this.$message({
					type: "success",
					message: "布局缓存已成功清除",
				});
				this.layout = [];

				// zebra-gird-component-list-data
				let allComponentList = {};
				if (localStorage.getItem("gird-component-list-data")) {
					allComponentList = JSON.parse(
						localStorage.getItem("gird-component-list-data")
					);
				}
				delete allComponentList[this.gridFlag];
				localStorage.setItem(
					"gird-component-list-data",
					JSON.stringify(allComponentList)
				);
				this.$message({
					type: "success",
					message: "已选组件配置缓存已成功清除",
				});
				this.componentList = [];

				// 重新初始化默认布局
				this.initLayout();
				this.initComponentList();
			}, //清空本地所有存储的布局以及数据
			openEditorComponentDialog() {}, //打开组件的编辑框，可修改数据
			handleResizedEvent(i, newH, newW, newHPx, newWPx) {},
			openSelectComponentDialog(girdItemFlag) {
				this.currentEditorGirdItemFlag = girdItemFlag;
				for (let i in this.layout) {
					if (this.layout[i].i == girdItemFlag) {
						this.form = { ...this.layout[i] };
					}
				}
				this.selectDialogVisible = true;
			}, //为当前容器添加组件
			removeGridItemComponent() {}, //删除当前容器的图表组件
			editorGridItem(girdItemFlag) {
				this.currentEditorGirdItemFlag = girdItemFlag;
				for (let i in this.layout) {
					if (this.layout[i].i == girdItemFlag) {
						this.form = { ...this.layout[i] };
					}
				}
				this.dialogFormVisible = true;
			}, //编辑当前布局容器的title
			deleteGridItem(girdItemFlag) {
				for (let i in this.layout) {
					if (this.layout[i].i == girdItemFlag) {
						this.layout.splice(i, 1);
					}
				}
			}, //删除当前布局容器
			saveGridItem() {
				let flag = this.currentEditorGirdItemFlag;
				for (let i in this.layout) {
					if (this.layout[i].i == flag) {
						this.layout[i] = this.form;
					}
				}
				this.dialogFormVisible = false;
			}, //保存当前修改得出布局容器的title
			handleSelectComponent(girdItemFlag, componentItem) {
				// 保存当前选中的组件信息
				let componentIsExist = false;
				for (let i in this.componentList) {
					if (this.componentList[i].id == this.currentEditorGirdItemFlag) {
						// 找到时，修改
						componentIsExist = true;
						console.log("修改组件");
						this.componentList[i] = {
							...componentItem,
							id: this.currentEditorGirdItemFlag,
						};
						break;
					}
				}
				// 未找到时，追加
				if (!componentIsExist) {
					console.log("追加组件");
					this.componentList.push({
						...componentItem,
						id: this.currentEditorGirdItemFlag,
					});
				}
			}, //选中预览中的组件
			/**
			 * 处理标题点击事件
			 * @param title
			 */
			handleCardTitleClick(title) {
				this.$emit("titleClick", title);
			},
			/**
			 * 初始化当前大屏的组件列表
			 */
			initComponentList() {
				// 是否初始化所有组件，而不是加载默认参数或缓存数据，用于调试方便
				if (this.isInitAllComponentList) {
					this.componentList = this.selectComponentList;
				} else {
					let allComponentList = {};
					// debugger;
					if (localStorage.getItem("gird-component-list-data")) {
						allComponentList = JSON.parse(
							localStorage.getItem("gird-component-list-data")
						);
					}
					if (allComponentList[this.gridFlag]) {
						console.log("使用大屏组件的缓存数据");
						this.componentList = allComponentList[this.gridFlag];
					} else {
						console.log("使用大屏组件的默认数据");
						// 注意这里深度克隆，防止情况缓存重置无效
						this.componentList = JSON.parse(
							JSON.stringify(this.defaultComponentList)
						);
					}
				}
				// debugger
			},
			saveComponentList() {
				// 先保存子组件
				/*if(this.$refs.gridLayoutChildren){
			                    this.$refs.gridLayoutChildren.saveLayout()
			                }*/
				// this.savePopoverVisible = false ;
				//this.gridFlag
				let allComponentList = {};
				if (localStorage.getItem("gird-component-list-data")) {
					allComponentList = JSON.parse(
						localStorage.getItem("gird-component-list-data")
					);
				}
				allComponentList[this.gridFlag] = this.componentList;
				localStorage.setItem(
					"gird-component-list-data",
					JSON.stringify(allComponentList)
				);
				/*this.$message({
			                    type: 'success',
			                    message: '保存成功'
			                });
			                this.saveDialogVisible = true
			                this.saveDialogLayoutData = JSON.stringify(this.componentList)*/
			},
			/**
			 * 打开组件编辑窗口
			 */
			openEditorComponentDialog() {
				this.editorDialogComponentListData = JSON.stringify(
					this.componentList,
					null,
					2
				);
				this.editorComponentDialogVisible = true;
			},
			/**
			 * 保存组件数据到localStorage
			 */
			saveEditorDialogComponentListData() {
				let allComponentList = {};
				if (localStorage.getItem("gird-component-list-data")) {
					allComponentList = JSON.parse(
						localStorage.getItem("gird-component-list-data")
					);
				}
				// 字符转对象
				this.componentList = JSON.parse(this.editorDialogComponentListData);
				allComponentList[this.gridFlag] = this.componentList;
				localStorage.setItem(
					"gird-component-list-data",
					JSON.stringify(allComponentList)
				);
				this.$message({
					type: "success",
					message: "组件数据保存成功",
				});
				this.editorComponentDialogVisible = false;
				/*this.$message({
						                    type: 'success',
						                    message: '保存成功'
						                });
						                this.saveDialogVisible = true
						                this.saveDialogLayoutData = JSON.stringify(this.componentList)*/
			},
			/**
			 * 应用组件编辑数据
			 */
			applyEditorDialogComponentListData() {
				// 字符转对象
				this.componentList = JSON.parse(this.editorDialogComponentListData);
			},
		},
	};
</script>
<style scoped lang="scss">
	/* 表格布局 */
	.vue-grid-layout {
		background: rgba(238, 238, 238, 0.34);
		&.no-editor {
			background: transparent;
		}
	}

	.layoutJSON {
		background: #ddd;
		border: 1px solid black;
		margin-top: 10px;
		padding: 10px;
	}

	.eventsJSON {
		background: #ddd;
		border: 1px solid black;
		margin-top: 10px;
		padding: 10px;
		height: 100px;
		overflow-y: scroll;
	}

	.columns {
		-moz-columns: 120px;
		-webkit-columns: 120px;
		columns: 120px;
	}

	.vue-grid-item /deep/ .vue-resizable-handle {
		z-index: 9999;
	}

	.vue-grid-item:not(.vue-grid-placeholder) {
		background: rgba(204, 204, 204, 0.17);
		border: 1px solid black;
		overflow: hidden;
		&.no-editor {
			background: transparent;
			border: 1px solid #074c92;
			overflow: visible;
		}
	}

	.vue-grid-item.resizing {
		opacity: 0.9;
	}

	.vue-grid-item.static {
		background: #cce;
	}

	.vue-grid-item .text {
		font-size: 24px;
		text-align: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		height: 100%;
		width: 100%;
	}

	.vue-grid-item .no-drag {
		height: 100%;
		width: 100%;
	}

	.vue-grid-item .minMax {
		font-size: 12px;
	}

	.vue-grid-item .add {
		cursor: pointer;
	}

	.vue-draggable-handle {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 0;
		left: 0;
		background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='yellow'/></svg>")
			no-repeat;
		background-position: bottom right;
		padding: 0 8px 8px 0;
		background-repeat: no-repeat;
		background-origin: content-box;
		box-sizing: border-box;
		cursor: pointer;
	}

	/*自定义表格标识*/
	.gird-flag {
		position: absolute;
		right: 140px;
		top: 0px;
		font-size: 24px;
		color: yellow;
	}

	/*自定义工具条*/
	.gird-layout-tool {
		position: absolute;
		z-index: 10;
		/* padding: 5px; */
		.el-button--primary {
			color: #fff;
			background-color: #409eff73;
			border-color: #409eff;
		}
	}

	.gird-layout-tool.left-bottom {
		left: 0;
		bottom: 0;
	}
	.gird-layout-tool.right-top {
		right: 0;
		top: 0;
	}

	/*拖动符号*/
	.vue-draggable-handle-my {
		position: absolute;
		color: #8fbadd;
		font-size: 20px;
		z-index: 9999;
	}

	.gird-item-delete {
		position: absolute;
		right: 0;
		color: #8fbadd;
		font-size: 20px;
		cursor: pointer;
		z-index: 9999;
	}

	// 组件弹窗调整
	.component-prev-dialog {
		/deep/ {
			.el-dialog {
				background: rgba(12, 39, 102, 0.64);
				font-size: 24px;
			}
			.el-dialog__title {
				color: white;
				line-height: 26px;
				font-size: 26px;
			}
			.el-dialog__header {
				padding: 20px 20px 10px;
				/* border-bottom: 1px solid #ccc; */
				// box-shadow: 0px 0px 5px 0px white;
			}
			.el-dialog__headerbtn {
				position: absolute;
				top: 20px;
				right: 20px;
				padding: 0;
				background: 0 0;
				border: none;
				outline: 0;
				cursor: pointer;
				font-size: 20px;
			}
			.el-dialog__headerbtn .el-dialog__close {
				color: #ffffff;
			}
		}
	}
</style>