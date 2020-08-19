<script>
	import Vue from 'vue'
	
	export default {
		created() {
			// #ifdef APP-PLUS
			plus.navigator.closeSplashscreen(); 
			// #endif 
		},
		onLaunch: function() {
			
			console.log('App Launch')
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
		
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
					Vue.prototype.$AV.init({
					                appId: "aeOmDTmS3ffFp58lwSdbf4qs-9Nh9j0Va",
					                appKey: "PPJz63PgkRHxILOfSnCtRon9",
					                serverURL: "https://aeomdtms.lc-cn-e1-shared.com"
					            })
				}
			})
		},
		onShow: function() {
			console.log('App 开启')
		},
		onHide: function() {
			console.log('App 关闭')
		}
	}
</script>

<style lang="scss">
	@font-face {font-family: "iconfont";
	  src: url('//at.alicdn.com/t/font_1995898_8p7j5w91d07.eot?t=1596980210599'); /* IE9 */
	  src: url('//at.alicdn.com/t/font_1995898_8p7j5w91d07.eot?t=1596980210599#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
	  url('//at.alicdn.com/t/font_1995898_8p7j5w91d07.woff?t=1596980210599') format('woff'),
	  url('//at.alicdn.com/t/font_1995898_8p7j5w91d07.ttf?t=1596980210599') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	  url('//at.alicdn.com/t/font_1995898_8p7j5w91d07.svg?t=1596980210599#iconfont') format('svg'); /* iOS 4.1- */
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-png:before {
	  content: "\e608";
	}
	
	.icon-ppt:before {
	  content: "\e609";
	}
	
	.icon-video:before {
	  content: "\e60a";
	}
	
	.icon-word:before {
	  content: "\e60c";
	}
	
	.icon-jpg:before {
	  content: "\e614";
	}
	
	.icon-mp:before {
	  content: "\e615";
	}
	
	.icon-pdf:before {
	  content: "\e616";
	}
	
	.icon-excel:before {
	  content: "\e617";
	}
	
	.icon-download:before {
	  content: "\e618";
	}
	
	.icon-ai:before {
	  content: "\e619";
	}
	
	.icon-gif:before {
	  content: "\e61a";
	}
	
	.icon-ppt1:before {
	  content: "\e66a";
	}

	/*每个页面公共css */
	@import url("./style/animation/animation.css"); /* 动画 */
	/* ColorUi */
	@import url("./lib/colorui/main.css");
	@import url("./lib/colorui/icon.css");
	.tui-custom-btn_box {
		width: 140px;
		height: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.tui-custom-btn {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top: 20rpx;
	}
	
	.tui-custom-mr {
		margin-right: 20rpx;
		
	}
	.tui-header {
		padding: 40rpx 60rpx;
	}
	.tui-flex {
		display: flex;
		align-items: center;
		justify-content: start;
	}
	

	/* 加载loding */
	.cu-load.load-modal {
		width: 0px;
		height: 0px;
		background-color: transparent;
	}
	.cu-load.load-modal::after {
		background-color: rgba(0, 0, 0, 0.3);
		width: 30px;
		height: 30px;
		border-left: 3px solid #FFF0F6;
	}
	body{
		background: #FFFFFF !important;
	}
	/* 阴影 */
	.bar-shadown{
		-webkit-box-shadow: 0 0 36px 0 rgba(43,86,112,.1) !important;
		box-shadow: 0 0 36px 0 rgba(43,86,112,.1) !important;
	}
</style>
