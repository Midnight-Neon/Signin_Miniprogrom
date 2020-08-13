<template>
	<view class="home animation-fade">
		<scroll-view scroll-y class="page">
			<view class="tui-header">
				<view class="tui-title">欢迎 李翔同学</view>
				<view class="tui-sub-title">这里是您的课程列表</view>
			</view>
			<!--轮播图 -->
<!-- 			<swiper
				v-if="swiperList==''?false:true"
				:class="['card-swiper swiperbox animation-fade',dotStyle?'square-dot':'round-dot']" 
				:indicator-dots="true" :circular="true" 
				:autoplay="true" interval="5000" 
				duration="500" @change="cardSwiper" 
				indicator-color="#8799a3" 
				indicator-active-color="#0081ff"
			>
				<swiper-item 
					v-for="(item,index) in swiperList" 
					:key="index" 
					:class="cardCur==index?'cur':''"
				>
					<view class="swiper-item bar-shadown">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'" lazy-load="true"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</view>
				</swiper-item>
			</swiper> -->
			
	
			  <view class="cu-card" :style="[{animation: 'show 0.2s 1'}]">
			    <view class="cu-item bg-img shadow-blur" style="background:linear-gradient(to right,rgba(85,85,85,.6),transparent),url('https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg')" @click="toChild"  wx:key data-url="/pages/class/class" >
			      <view class="cardTitle">
			       
					高等数学
			      </view>
				  <view class="tui-default tui-flex" style="margin-left: -20rpx; position: absolute;bottom: 15rpx;right: 15rpx;">
				  <view class="cu-capsule radius" >
				     <view class="cu-tag bg-grey ">
				       <text class="cuIcon-peoplefill"></text>
				     </view>
				     <view class="cu-tag line-grey " style="background-color: rgba(85,85,85,.7);color: white;font-weight: bold;border-color: #8799a3;">
				       刘杰
				     </view>
				   </view>
				   <view class="cu-capsule radius" >
				      <view class="cu-tag bg-grey ">
				        <text class="cuIcon-communityfill"></text>
				      </view>
				      <view class="cu-tag line-grey " style="background-color: rgba(85,85,85,.7);color: white;font-weight: bold;border-color: #8799a3;">
				        计算机班
				      </view>
				    </view></view>
			    </view>
			  </view>
			  
			  <view class="cu-card">
			    <view class="cu-item bg-img shadow-blur" style="background:linear-gradient(to right,rgba(85,85,85,.6),transparent),url('https://images.unsplash.com/photo-1596614780168-c192d7ea4077?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=976&q=80')" @click="toChild('/pages/class/class')"  wx:key>
			      <view class="cardTitle">
			       
			  					数据结构
			      </view>
			  				  <view class="tui-default tui-flex" style="margin-left: -20rpx; position: absolute;bottom: 15rpx;right: 15rpx;">
			  				  <view class="cu-capsule radius" >
			  				     <view class="cu-tag bg-grey ">
			  				       <text class="cuIcon-peoplefill"></text>
			  				     </view>
			  				     <view class="cu-tag line-grey " style="background-color: rgba(85,85,85,.7);color: white;font-weight: bold;">
			  				       段永祥
			  				     </view>
			  				   </view>
			  				   <view class="cu-capsule radius" >
			  				      <view class="cu-tag bg-grey ">
			  				        <text class="cuIcon-communityfill"></text>
			  				      </view>
			  				      <view class="cu-tag line-grey " style="background-color: rgba(85,85,85,.7);color: white;font-weight: bold;">
			  				        重修班
			  				      </view>
			  				    </view> </view>
			    </view>
			  </view>
			  
			<!-- 统计图 -->
			<!-- <view class="ring animation-fade" v-if="ringList==''?false:true && swiperList==''?false:true">
				<view class="cu-card article">
					<view class="cu-item bar-shadown">
						<view class="title">
							<view class="text-cut">
								<text class="cuIcon-title text-black"></text> 今日运动{{hour}}小时{{minute}}分，{{kilometer}}公里
							</view>
						</view>
						<view class="content">
							<view class="flex">
								<view class="flex-sub">
									<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
								</view>
								
								<view class="flex-sub" >
									<view class="tagb-content" v-for="(rList,index) in ringList"  :key="index">
										<view class="flex">
											<text class="cuIcon-title tagb" :class="rList.color"></text>{{ rList.name }}
										</view>
										<view class="flex">
											<text class="tagb"></text>{{ rList.time }}，{{ rList.data }}公里
										</view>
									</view>
								</view>
								
							</view>
						</view>
						
					</view>
				</view>
			</view> -->
			
		</scroll-view>
		
	</view>
</template>

<script>
	// import uCharts from '../../lib/u-charts/u-charts.js'; //统计图
	// import {
	// 	getSwiper,
	// 	getRing,
	// } from '../../service/api/home.js'; //首页api
	// import {
	// 	getisLogin,
	// } from '../../service/api/login.js' //登陆api
	var _this;
	var canvaRing=null;
   
	export default {
		data() {
			return {
				
				
			}
		},
		mounted() {
			_this = this;
		
			
		},
		methods: {toChild(e){
			uni.navigateTo({url:e})
		},
			
			copyUrl() {
				uni.setClipboardData({
					data: 'https://github.com/AmosHuKe/Watch-Test',
					success: function () {
						uni.showToast({
							title: '地址复制成功'
						})
					}
				});
			},
			
		}
	}
</script>

<style scoped>
	.tui-header {
		padding: 40rpx 60rpx;
	}
	.tui-flex {
		display: flex;
		align-items: center;
		justify-content: start;
	}
	
	.tui-title {
		font-size: 52rpx;
		color: #333;
		font-weight: bold;
	}
	
	.tui-sub-title {
		font-size: 38rpx;
		color: #7a7a7a;
		padding-top: 18rpx;
	}
	.cardTitle{
	  color: #fff;
	  padding: 90rpx 60rpx;
	  font-size: 40rpx;
	  font-weight: 300;
	  transform: skew(-10deg, 0deg);
	  position: relative;
	  text-shadow: 0px 0px 6rpx rgba(0,0,0,0.3)
	}
	
	.cardTitle::before{
	  content: "";
	  position: absolute;
	  width: 60rpx;
	  height: 6rpx;
	  border-radius: 20rpx;
	  background-color: #fff;
	  display: block;
	  top: 60rpx;
	  left: 50rpx;  
	  transform: skew(10deg, 0deg);
	}
	.cardTitle::after{
	  content: "";
	  position: absolute;
	  width: 140rpx;
	  border-radius: 6rpx;
	  height: 24rpx;
	  background-color: #fff;
	  display: block;
	  bottom: 76rpx;
	  left: 90rpx;  
	  transform: skew(10deg, 0deg);
	  opacity: 0.1;
	}
.home{
	margin-top: 200upx;
}
.swiperbox{
	margin-bottom: 32upx;
}
.tagb-content{
	font-size: 24upx; 
	margin-bottom: 10upx;
}

.tagb{
	font-size: 40upx;
	width: 40upx;
}
	
/*uCharts start*/
.charts{
	width: 400upx; 
	height:400upx;
	background-color:transparent;
	margin-top: 36upx;
}
/*uCharts end*/

.today_run{
	position: relative;
    left: 30px;
    top: -20px;
}
</style>