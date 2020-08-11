<template>
	<view>
				<cu-custom bgColor="bg-gradual-pink" :isBack="true">
						    <view slot="backText">返回</view>
						    <view slot="content">通知</view>
						  </cu-custom>
						  
						  <!-- <scroll-view :scroll-y="true" class="page show"  > -->	
						  <tui-card  style="padding: 80rpx;padding-bottom: 80rpx;" :title="{text: '段永祥'}" :tag="{text: '1小时前'}" :header="{bgcolor: '#f9f9f9',line: true}">
							  <template v-slot:image>
								  <view class="cu-avatar radius sm">
									  段
								  </view>
							  </template>
						  	<template v-slot:body>
						  		<view class="tui-default">
						  			再次提醒同学们：明天8:30监控视频会议开始，同学们务必提前20分钟进入自己应进入的考场进行考试环境审核。 考试在MOOTE考试系统上进行，同学们于9:00正式开考前登录系统（以免登录有问题，如有问题请及时联系老师）。考试时间为9:00-11：00。
						  		</view>
						  	</template> 
						  	<template v-slot:footer>
						  		
						  			<view class="tui-default tui-flex">
						  				<tui-tag type="light-green" padding="8rpx 12rpx" size="24rpx">考试</tui-tag>
						  			</view>
						  		
						  	</template>
						  </tui-card>
						  
						  <tui-card  style="padding: 80rpx;padding-top: 80rpx;" :title="{text: '段永祥'}" :tag="{text: '1小时前'}" :header="{bgcolor: '#f9f9f9',line: true}">
						  							  <template v-slot:image>
						  								  <view class="cu-avatar radius sm">
						  									  段
						  								  </view>
						  							  </template>
						  	<template v-slot:body>
						  		<view class="tui-default">
						  			再次提醒同学们：明天8:30监控视频会议开始，同学们务必提前20分钟进入自己应进入的考场进行考试环境审核。 考试在MOOTE考试系统上进行，同学们于9:00正式开考前登录系统（以免登录有问题，如有问题请及时联系老师）。考试时间为9:00-11：00。
						  		</view>
						  	</template> 
						  	<template v-slot:footer>
						  		
						  			<view class="tui-default tui-flex">
						  				<tui-tag type="light-green" padding="8rpx 12rpx" size="24rpx">考试</tui-tag>
						  			</view>
						  		
						  	</template>
						  </tui-card>
						  <tui-card  style="padding: 80rpx;padding-top: 80rpx;" :title="{text: '段永祥'}" :tag="{text: '1小时前'}" :header="{bgcolor: '#f9f9f9',line: true}">
						  							  <template v-slot:image>
						  								  <view class="cu-avatar radius sm">
						  									  段
						  								  </view>
						  							  </template>
						  	<template v-slot:body>
						  		<view class="tui-default">
						  			再次提醒同学们：明天8:30监控视频会议开始，同学们务必提前20分钟进入自己应进入的考场进行考试环境审核。 考试在MOOTE考试系统上进行，同学们于9:00正式开考前登录系统（以免登录有问题，如有问题请及时联系老师）。考试时间为9:00-11：00。
						  		</view>
						  	</template> 
						  	<template v-slot:footer>
						  		
						  			<view class="tui-default tui-flex">
						  				<tui-tag type="light-green" padding="8rpx 12rpx" size="24rpx">考试</tui-tag>
						  			</view>
						  		
						  	</template>
						  </tui-card>
						  
						 <!-- </scroll-view> -->
						  
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.tui-default {
		padding: 20rpx 30rpx;
	}
	.page{
		padding-top: 60rpx;
		display: flex;
		
	}
	page{
	background-color: 		#f1f1f1 !important;
		}
	
</style>
