<style scoped lang="scss">
	.site-menu-box {
		width: 100%;
		height: 100%;
		.fa {
			font-size: 14px;
			width: 30px;
			color: var(--body-bg-color);
		}
		.site-logo {
			width: 100%;
			position: relative;
			height: 60px;
			.logo-box {
				position: absolute;
				left: 50%;
				top: 50%;
				width: 146px;
				height: 50px;
				transform: translate(-50%, -50%);
				background: url("/image/menu/logo-dark.png") no-repeat;
				background-size: 100% 100%;
			}
			.logo-box_small {
				position: absolute;
				left: 50%;
				top: 50%;
				width: 40px;
				height: 40px;
				transform: translate(-50%, -50%);
				background: url("/image/menu/logo-small.png") no-repeat;
				background-size: 100% 100%;
			}
		}
		.el-menu {
			border: 0;
		}
		.el-menu-item {
			min-width: 0 !important;
		}
	}
</style>
<template>
	<div class="site-menu-box">
		<div class="site-logo">
			<div class="logo-box_small" v-if="isCollapse"></div>
			<div class="logo-box" v-else></div>
		</div>
		<el-menu unique-opened :collapse-transition="false" :default-active="$route.fullPath||oldActivePath" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
			<el-menu-item :index="'/home_page'" @click="jump('/home_page')">
				<i :class="'fa fa-info-circle'"></i>
				<span slot="title">{{'首页'}}</span>
			</el-menu-item>
			<template v-for="(item,index) in firstMenu">
				<el-submenu :index="item.url" v-if="item.children" @click="jump(item.url,item.openMode)" :key="index">
					<template slot="title">
						<i class='fa fa-info-circle'></i>
						<span slot="title">{{item.name}}</span>
					</template>
					<el-menu-item-group>
						<el-menu-item v-for="(s,j) in item.children" :key="j" :index="s.url" @click="jump(s.url,s.openMode)">{{s.name}}</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item :index="item.url" @click="jump(item.url,item.openMode)" v-else :key="index">
					<i :class="'fa '+item.icon"></i>
					<span slot="title">{{item.name}}</span>
				</el-menu-item>
			</template>
			<!-- <div v-for="(item,index) in firstMenu" :key="index">
				<el-submenu :index="item.url" v-if="item.children" @click="jump(item.url,item.openMode)">
					<template slot="title">
						<i :class="'fa '+item.icon"></i>
						<span slot="title">{{item.name}}</span>
					</template>
					<el-menu-item-group v-for="(s,j) in item.children" :key="j">
						<el-menu-item :index="s.url" @click="jump(s.url,s.openMode)" style="padding-left:48px;box-sizing:border-box">{{s.name}}</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item :index="item.url" @click="jump(item.url,item.openMode)" v-else>
					<i :class="'fa '+item.icon"></i>
					<span slot="title">{{item.name}}</span>
				</el-menu-item>
			</div> -->
		</el-menu>
	</div>
</template>
<script>
	export default {
		name: "site-menu",
		data() {
			return {
				isCollapse: true,
			};
		},
		computed: {
			firstMenu() {
				return this.$store.state.menu.menuList;
			},
			secondMenu() {
				return (
					this.$store.state.menu.menuList.find(
						(m) => m.name === this.$route.matched[0].name
					) || {}
				).children;
			},
		},
		methods: {
			handleOpen(key, keyPath) {
				// console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				// console.log(key, keyPath);
			},
			jump(url, model) {
				if (model) {
					window.open(url, "_blank");
				} else {
					if (url !== this.$router.history.current.fullPath) {
						this.$router.replace({ path: url });
					}
				}
			},
		},
	};
</script>