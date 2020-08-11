<template>
	<view style="background: #F8F8F8;">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
								    <view slot="backText">返回</view>
								    <view slot="content">问答</view>
								  </cu-custom>
		<tui-fab  :bottom="100"   @click="onClick"></tui-fab>
		<view class="tui-container">
			<view class="tui-news-view" >
				<view class="news-item">
				<tui-list-cell :unlined="true"  :radius='true' >
					<view class="tui-news-flex tui-flex-column" >
						<view class="tui-news-tbox tui-flex-column tui-flex-between tui-h165 tui-pl-20" >
							<view class="tui-news-title" >集合是否算作一种数据结构?</view>
							<text class="text-cut-2">
								集合是指具有某种特定性质的具体的或抽象的对象汇总而成的集体。其中，构成集合的这些对象则称为该集合的元素
							</text>
							<view class="tui-sub-box">
								<view style="display: flex;align-items: center;justify-content:flex-start;vertical-align: baseline;">
									<view class="cu-avatar radius text-xs sm tui-scale" >李</view><text> 李翔</text>
								</view>
								<!-- <view class="tui-sub-source">{{item.source}}</view> -->
								<view class="tui-sub-cmt">
									<view class="cu-capsule radius " style="margin-right: 10rpx;">
										<view class='cu-tag bg-gradual-pink sm'>
											<text class='cuIcon-favorfill'></text>
										</view>
										<view class="cu-tag line-grey sm text-bold">
											老师答
										</view>
									</view>
									<view>1 回复</view>
									
										<!-- <tui-tag padding="10rpx 24rpx"  :plain="true" shape="circleRight" >老师回复</tui-tag> -->
								</view>
								
								
							</view>
						</view>
					</view>
					</tui-list-cell></view>
					
					<view class="news-item">
					<tui-list-cell :unlined="true"  :radius='true' >
						<view class="tui-news-flex tui-flex-column">
							<view class="tui-news-tbox tui-flex-column tui-flex-between tui-h165 tui-pl-20" >
								<view class="tui-news-title" >集合是否算作一种数据结构?</view>
								<text class="text-cut-2" >
									集合是指具有某种特定性质的具体的或抽象的对象汇总而成的集体。其中，构成集合的这些对象则称为该集合的元素
								</text>
								
								<view class="tui-sub-box">
									<view style="display: flex;align-items: center;justify-content:flex-start;vertical-align: baseline;">
										<view class="cu-avatar radius text-xs sm tui-scale" >李</view> 李翔
									</view>
									<!-- <view class="tui-sub-source">{{item.source}}</view> -->
									<view class="tui-sub-cmt">
										<view>1 回复</view>
										
											<!-- <tui-tag padding="10rpx 24rpx"  :plain="true" shape="circleRight" >老师回复</tui-tag> -->
									</view>
								</view>
							</view>
						</view>
						</tui-list-cell></view>
						
						<view class="news-item">
						<tui-list-cell :unlined="true"  :radius='true' >
							<view class="tui-news-flex tui-flex-column">
								<view class="tui-news-tbox tui-flex-column tui-flex-between tui-h165 tui-pl-20" >
									<view class="tui-news-title" >集合是否算作一种数据结构?</view>
									<text class="text-cut-2">
										集合是指具有某种特定性质的具体的或抽象的对象汇总而成的集体。其中，构成集合的这些对象则称为该集合的元素
									</text>
									<view class="tui-sub-box">
										<view style="display: flex;align-items: center;justify-content:flex-start;vertical-align: baseline;">
											<view class="cu-avatar radius text-xs sm tui-scale" >李</view> 李翔
										</view>
										<!-- <view class="tui-sub-source">{{item.source}}</view> -->
										<view class="tui-sub-cmt">
											<view>1 回复</view>
											
												<!-- <tui-tag padding="10rpx 24rpx"  :plain="true" shape="circleRight" >老师回复</tui-tag> -->
										</view>
									</view>
								</view>
							</view>
							</tui-list-cell></view>
				
			</view>
		</view>
		
		
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
	.page{
		
	}
	.text-cut-2{
		line-height: 1.1rem;
		word-break: break-all;
		overflow:hidden; 
		
		text-overflow:ellipsis;
		
		display:-webkit-box; 
		
		-webkit-box-orient:vertical;
		
		-webkit-line-clamp:2; 
	}
.tui-container {
	padding-left: 10rpx;
	padding-right: 10rpx;
	height: 100vh;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}
	.tui-flex-column {
		flex-direction: column !important;
	}
	
	.tui-flex-between {
		justify-content: space-between !important;
	}
	
	.tui-news-cell {
		display: flex;
		padding: 20rpx 30rpx;
	}
	
	.tui-news-tbox {
		flex: 1;
		width: 100%;
		box-sizing: border-box;
		display: flex;
	}
	.tui-news-title {
		width: 100%;
		font-size: 34rpx;
		word-break: break-all;
		word-wrap:break-word;
		font-weight: bold;
		
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		box-sizing: border-box;
	}
	.tui-w220 {
			width: 220rpx;
		}
	
		.tui-h165 {
			height: 165rpx;
		}
	
		.tui-block {
			display: block;
		}

	.tui-sub-box {
		
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		color: #999;
		box-sizing: border-box;
		line-height: 40rpx;
	}
	
	.tui-sub-source {
		font-size: 26rpx;
	}
	
	.tui-sub-cmt {
		font-size: 24rpx;
		line-height: 24rpx;
		display: flex;
		align-items: center;
		
	}
	
	
	.tui-scale {
		transform: scale(0.8);
		transform-origin: center center;
	}
	.news-item{
		    margin-bottom: 10rpx;
			 margin-top: 10rpx; 
			 /* margin: 20rpx; */
			
		    background: #fff;
		    overflow: hidden;
		    border-radius: 10rpx;
		    
		    box-shadow: 0 2rpx 4rpx 4rpx rgba(26,26,26,.1);
		    
		    box-sizing: border-box
	}
</style>
