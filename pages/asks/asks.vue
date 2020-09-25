<template>
	<view style="background: #F8F8F8;">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
								    <view slot="backText">返回</view>
								    <view slot="content">问答</view>
								  </cu-custom>
		<tui-fab  :bottom="100"   @click="onClick"></tui-fab>
		<view class="tui-container">
			<view class="tui-news-view" v-if="lists.length>0">
				<view class="news-item" v-for="item in lists">
				<tui-list-cell :unlined="true"  :radius='true'  @click="godetail(item)">
					<view class="tui-news-flex tui-flex-column" >
						<view class="tui-news-tbox tui-flex-column tui-flex-between tui-h165 tui-pl-20" >
							<view class="tui-news-title" >{{item.title}}</view>
							<text class="text-cut-2">
								{{item.content}}
							</text>
							<view class="tui-sub-box">
								<view style="display: flex;align-items: center;justify-content:flex-start;vertical-align: baseline;">
									<view class="cu-avatar radius text-xs sm tui-scale" >{{item.owner[0]}}</view><text> {{item.owner}}</text>
								</view>
								<!-- <view class="tui-sub-source">{{item.source}}</view> -->
								<view class="tui-sub-cmt">
									<view class="cu-capsule radius " style="margin-right: 10rpx;" v-if="item.treply!=0">
										<view class='cu-tag bg-gradual-pink sm'>
											<text class='cuIcon-favorfill'></text>
										</view>
										<view class="cu-tag line-grey sm text-bold">
											老师答
										</view>
									</view>
									<view>{{item.reply.length}} 回复</view>
									
										<!-- <tui-tag padding="10rpx 24rpx"  :plain="true" shape="circleRight" >老师回复</tui-tag> -->
								</view>
								
								
							</view>
						</view>
					</view>
					</tui-list-cell></view>
					
					
			
						
						
				
			</view><view v-else style="display: flex;flex-direction: column;align-items: center;justify-content: center;height: 90vh;">
												  <view style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
													 <image src="../../static/images/empty.png" style="width: 128px;height: 100px;margin-bottom: 20px;margin-top: 10px;"/>
													 <text style="font-weight: bold;color: grey;">暂无问答</text>
													 
												  </view>
												  
					</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[]
			}
		},
		methods: {
			onClick(){
				uni.navigateTo({
					url:"../newask/newask"
				})
			},godetail(item){
				let urlx="/pages/askdetails/askdetails?aid="+item['_id']
				uni.navigateTo({
					url:urlx
				})
			}
		},onShow() {
			this.$http.get("course/"+this.$store.getters.getcid+"/asks").then(res=>{
				this.lists=res.data.data
			})
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
