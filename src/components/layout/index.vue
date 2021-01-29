<template>
	<div class="main_container" ref="sceen">
		<ul class="nav">
			<li class="nav-item" v-for="(item,index) in firstMenu" :key="index">
				<div class="nav-content">
					<div class="nav-border-left"></div>
					<a @click="jump(item.url,item.openMode,item)">{{item.name}}</a>
					<ul v-if="item.children">
						<li v-for="(s,j) in item.children" :key="j">
							<span></span>
							<a @click="jump(s.url,s.openMode,s)">{{s.name}}</a>
						</li>
					</ul>
					<div class="nav-border-right"></div>
				</div>
			</li>
		</ul>
		<div class="main_content">
			<transition name="jackInTheBox">
				<router-view class="main_view_content" />
			</transition>
		</div>
		<!-- 下面为管理系统下的菜单样式 -->
		<!-- <div class="site-menu" ref="siteMenuBox" style="width:64px">
			<site-menu ref="siteMenu"></site-menu>
		</div>
		<div class="main_content">
			<div class="header_container">
				<site-header @toggleMenu="toggleMenu"></site-header>
			</div>
			<div class="main_view_box">
				<router-view class="main_view_content" />
			</div>
			<router-view class="main_view_content" />
		</div> -->
	</div>
</template>
<script>
	import siteMenu from "./components/siteMenu";
	import siteHeader from "./components/siteHeader";
	export default {
		components: { siteMenu, siteHeader },
		data() {
			return {};
		},
		computed: {
			firstMenu() {
				let home = [
					{
						icon: "fa-list",
						name: "首页",
						seq: "1",
						type: 1,
						url: "/home_page",
					},
				];
				return home.concat(this.$store.state.menu.menuList);
			},
			secondMenu() {
				return (
					this.$store.state.menu.menuList.find(
						(m) => m.name === this.$route.matched[0].name
					) || {}
				).children;
			},
		},
		mounted() {
			console.log(this.firstMenu);
			// this.popular();
		},
		methods: {
			popular() {
				const meteorNumber = 8;
				let sceen = this.$refs.sceen;
				for (let i = 0; i < meteorNumber; i++) {
					let meteor = document.createElement("span");
					meteor.className = "meteor";
					meteor.style.top = `${1 + Math.random() * 10}px`;
					meteor.style.left = `${1000 + Math.random() * 2500}px`;
					meteor.style.animation = `star-ani ${
						(i / meteorNumber) * 3 + 2
					}s linear ${(i / meteorNumber) * 0.8 + 2}s infinite`;
					sceen.appendChild(meteor);
				}
			},
			toggleMenu(flag) {
				this.$refs.siteMenu.isCollapse = flag;
				if (flag) {
					this.$refs.siteMenuBox.style.width = 64 + "px";
				} else {
					this.$refs.siteMenuBox.style.width = 200 + "px";
				}
			},
			jump(url, model, item) {
				if (model) {
					window.open(url, "_blank");
				} else {
					if (url !== this.$router.history.current.fullPath && !item.children) {
						this.$router.replace({ path: url });
					}
				}
			},
		},
	};
</script>
<style>
	/* 流星效果 */
	.meteor {
		position: absolute;
		display: block;
		width: 5px;
		height: 5px;
		opacity: 0;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		border-radius: 50%;
		background: #15b1db;
		-webkit-box-shadow: 0 0 5px 5px rgba(21, 177, 219, 0.3);
		-moz-box-shadow: 0 0 5px 5px rgba(21, 177, 219, 0.3);
		box-shadow: 0 0 5px 5px rgba(21, 177, 219, 0.3);
		/* z-index: -1; */
	}

	.meteor:after {
		content: "";
		display: block;
		top: 0;
		left: 4px;
		border-style: solid;
		border-width: 2px 200px 2px 200px;
		border-color: transparent transparent transparent rgba(21, 177, 219, 0.3);
		transform: rotate(-50deg) translate3d(1px, 1px, 0);
		transform-origin: 0 0;
	}

	@keyframes star-ani {
		0% {
			opacity: 0;
			transform: scale(0) rotate(0) translate3d(0, 0, 0);
		}
		10% {
			opacity: 0.5;
			transform: scale(1) rotate(0) translate3d(-100px, 100px, 0);
		}
		50% {
			opacity: 1;
			transform: scale(1) rotate(0) translate3d(-450px, 450px, 0);
		}
		90% {
			opacity: 0.5;
			transform: scale(1) rotate(0) translate3d(-800px, 800px, 0);
		}
		100% {
			opacity: 0;
			transform: scale(1) rotate(0) translate3d(-900px, 900px, 0);
		}
	}
	@keyframes jackInTheBox {
		from {
			-webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
			transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
			opacity: 0;
		}

		40% {
			-webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
			transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}

		60% {
			-webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
			transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
			opacity: 1;
		}

		80% {
			-webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
			transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
		}

		to {
			-webkit-transform: perspective(400px);
			transform: perspective(400px);
		}
	}
	.jackInTheBox-enter-active {
		animation: jackInTheBox 1.2s;
	}
</style>
<style scoped lang="scss">
	.main_container {
		position: relative;
		width: 100%;
		height: 100%;
		// display: flex;
		.site-menu {
			float: left;
			height: 100%;
			background: var(--site-menu-bg);
			transition: all 0.3s ease-in-out;
		}
		.main_content {
			width: 100%;
			height: 100%;
			flex: auto;
			.header_container {
				width: 100%;
				height: 60px;
				position: fixed;
				z-index: 1;
				top: 0px;
				background: var(--site-menu-bg);
			}
			.main_view_box {
				position: relative;
				width: 100%;
				height: 100%;
				background: #f5f7f9;
				overflow-y: scroll;
				padding: 20px 12px 20px 20px;
				.main_view_content {
					width: 100%;
					min-height: calc(100% - 60px);
					margin-top: 60px;
					box-shadow: 0px 0px 6px #999;
					background: #fff;
				}
			}
		}
	}
</style>
<style scoped lang="scss">
	/* 导航 */
	.nav {
		position: absolute;
		left: 50%;
		bottom: 0px;
		z-index: 10;
		transform: translateX(-50%);
		display: flex;
		justify-content: space-between;
		opacity: 0;
		transition: 1s;
		&:hover {
			opacity: 1;
		}
		.nav-item {
			margin-right: 10px;
			min-width: 260px;
			height: 30px;
			border-bottom: 5px solid #036ddc;
			flex: 1 1 280px;
			max-width: 280px;
			/*background: #036ddc;*/
			cursor: pointer;
			position: relative;
			z-index: 999;
			&:hover {
				/*background: #0e9dad;*/
				border-bottom: 5px solid #0e9dad;
				.nav-content {
					height: 50px;
					width: 100%;
				}
				a {
					transform: scale(1);
					transition: transform 0.3s linear 0.4s;
				}
				ul {
					transform: scale(1);
					transition: transform 0.3s linear 0.6s;
				}
			}
			.nav-content {
				/*height: 0;*/
				height: 50px;
				line-height: 50px;
				text-align: center;
				/*width: 2%;*/
				max-width: 280px;
				width: 100%;
				background: linear-gradient(
					to right,
					rgba(18, 253, 254, 0) 0%,
					rgba(18, 253, 254, 0.2) 50%,
					rgba(18, 253, 254, 0) 100%
				);
				position: absolute;
				bottom: 5px;
				font-size: 24px;
				font-weight: bold;
				left: 50%;
				transform: translate(-50%, 0);
				transform-origin: 50% 50%;
				transition: height 0.3s, width 0.3s linear 0.3s;
				a {
					color: #e0fbff;
					letter-spacing: 2px;
					display: block;
					width: 100%;
					height: 100%;
					/*transform: scale(0);*/
					transform: scale(1);
					transform-origin: 50% 50%;
				}
				.nav-border-left,
				.nav-border-right {
					position: absolute;
					top: 0;
					width: 3px;
					height: 100%;
					background: linear-gradient(
						to bottom,
						rgba(18, 255, 255, 0) 0%,
						rgba(18, 255, 255, 1) 50%,
						rgba(18, 255, 255, 0) 100%
					);
				}
				.nav-border-left {
					left: 0;
				}

				.nav-border-right {
					right: 0;
				}
			}
		}
	}

	.nav-content ul {
		position: absolute;
		top: -50px;
		left: 0;
		height: 52px;
		width: 100%;
		line-height: 52px;
		display: flex;
		transform: scale(0);
		font-size: 20px;
		color: #ffffff;
		li {
			flex: 1;
			display: flex;
			align-items: center;
			&:hover {
				a {
					color: #12ffff;
					transition: all 0.1s;
				}
				span {
					width: 6px;
					height: 6px;
					background: #12ffff;
					transition: width 0.1s, height 0.1s;
				}
			}
			span {
				width: 4px;
				height: 4px;
				background: #ffffff;
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				border-radius: 50%;
			}
		}
	}
</style>

