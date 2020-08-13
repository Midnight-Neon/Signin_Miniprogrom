<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				    <view slot="backText">返回</view>
				    <view slot="content">数据结构</view>
				  </cu-custom>
<!-- <scroll-view :scroll-y="true" class="page show" style="height: 100vh;">	 -->
	 <view class="page show" >
		  <view class="tui-header" style="margin-left: 10rpx;">
		  	<view class="tui-title" style="font-size: 42rpx;">数据结构</view>
		  	<view class="tui-sub-title">
				<view class="tui-default tui-flex">
				<view class="cu-capsule radius">
				   <view class="cu-tag" style="margin-left: 0rpx;padding-left:0 ;">
				     <text class="cuIcon-peoplefill icnons" style="font-weight: 30rpx;"></text><text style="padding-left: 5rpx;">|  段永祥</text>
				   </view>
				  
				 </view>
				 <view class="cu-capsule radius" >
				    <view class="cu-tag ">
				      <text class="cuIcon-communityfill icnons"style="font-weight: 30rpx;"></text><text style="padding-left: 5rpx;"> |  重修班</text>
				    </view>
				  
				  </view> </view>
			</view>
		  </view>
		  <view class="nav-list">
		  	<navigator hover-class="none" :url="'/pages/basics/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
		  	 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
		  		<view class="nav-title"><view class="nav-title-first-letter">{{item.num}}</view>条</view>
		  		<view class="nav-name"><view class="nav-name-action">{{item.action==''?'新':item.action}}</view>{{item.name}}</view>
		  		<text :class="'cuIcon-' + item.cuIcon"></text>
		  	</navigator>
		  </view>
		  <view class="cu-list grid col-3 lists" style="background-color: transparent;">
		    <view class="cu-item" v-for="(item,index) in  iconList" >
		      <view :class="['cuIcon-'+item.icon,'text-'+item.color]">
		        <view class="cu-tag badge" v-if="item.badge!=0">
		          <block :if="item.badge!=1">{{item.badge>99?"99+":item.badge}}</block>
		        </view>
		      </view>
		      <text>{{item.name}}</text>
		    </view>
		  </view>
		 <!-- <view class="tui-header"style="margin-left: 40rpx;">
		  	<view class="tui-title" style="font-size: 38rpx;"><text class="cuIcon-favorfill icnons" style="font-weight: 28rpx;color:gold;margin-right: 10rpx;"></text>动态</view></view>
			<view class="cu-list menu-avatar" style="margin-right: 40rpx;background-color: transparent !important;">
			<tui-swipe-action :operateWidth="140">
				<template v-slot:content>

			    <view  style="background-color: transparent;width: 100%;" class="movebox" data-target="move-box">
			      <view class="cu-avatar round lg" :style="{backgroundColor:'transparent'}">
					  <text class="cuIcon-timefill text-red" style="font-weight: 28rpx;"></text>
				  </view>
			      <view class="content">
			        <view class="text-grey">签到提醒</view>
			        <view class="text-gray text-sm">
			          <text class="cuIcon-infofill text-red"></text> 本次签到超时</view>
			      </view>		
			    
			  	<view class="action">
			        <view class="text-grey text-xs">22:20</view>
 			        <view class="cu-tag round bg-grey sm">5</view>
 
			  </view></view>	</template>
				<template v-slot:button>
					<view class="tui-custom-btn_box">
						<view class="tui-custom-btn tui-custom-mr" @tap="customBtn(0)"><tui-icon name="star" color="#333" :size="20"></tui-icon></view>
						<view class="tui-custom-btn" @tap="customBtn(1)"><tui-icon name="delete" color="#333" :size="18"></tui-icon></view>
					</view>
				</template>
			</tui-swipe-action>
			<tui-divider width="60%" :gradual="true" height="10"></tui-divider>
			<tui-swipe-action :operateWidth="140">
							<template v-slot:content>
			
						    <view  style="background-color: transparent;width: 100%;" class="movebox" data-target="move-box">
						      <view class="cu-avatar round lg" :style="{backgroundColor:'transparent'}">
								  <text class="cuIcon-formfill text-mauve" style="font-weight: 28rpx;"></text>
							  </view>
						      <view class="content">
						        <view class="text-grey">作业</view>
						        <view class="text-gray text-sm">
						          <text class="cuIcon-infofill text-red"></text> 作业失效</view>
						      </view>		
						    
						  	<view class="action">
						        <view class="text-grey text-xs">22:20</view>
			 			        <view class="cu-tag round bg-grey sm">5</view>
			 			      </view></view>	</template>
							<template v-slot:button>
								<view class="tui-custom-btn_box">
									<view class="tui-custom-btn tui-custom-mr" @tap="customBtn(0)"><tui-icon name="star" color="#333" :size="20"></tui-icon></view>
									<view class="tui-custom-btn" @tap="customBtn(1)"><tui-icon name="delete" color="#333" :size="18"></tui-icon></view>
								</view>
							</template> 
						</tui-swipe-action>
			
			</view> -->
			 
			      

	<!-- </scroll-view> -->
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {elements: [{
						
						name: '签到',
						color: 'cyan',num:1,
						cuIcon: 'timefill',action:''
					},
					{
				
						name: '作业',
						color: 'blue',
						cuIcon: 'formfill',num:1,action:'待完成'
					},{
						
						name: '通知',
						color: 'purple',
						cuIcon: 'messagefill',num:1,action:'未读'
					},
					{
						
						name: '问答',
						color: 'pink',
						cuIcon: 'commandfill',num:1,action:'回复',
					}],
				 iconList: [{
				      icon: 'timefill',
				      color: 'red',
				      badge: 1,
				      name: '签到'
				    },{
				      icon: 'noticefill',
				      color: 'olive',
				      badge: 22,
				      name: '信息'
				    }, {
				      icon: 'friendfill',
				      color: 'cyan',
				      badge: 0,
				      name: '班级成员'
				    },  {
				      icon: 'discoverfill',
				      color: 'purple',
				      badge: 0,
				      name: '资源'
				    }, {
				      icon: 'commandfill',
				      color: 'purple',
				      badge: 0,
				      name: '问答'
				    },{
      icon: 'formfill',
      color: 'mauve',
      badge: 0,
      name: '作业'
    }],modalName:null
			}
		},
		methods: {
			  
		}
	}
</script>

<style>
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}
	
	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}
	
	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}
	
	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}
	
	.nav-title {
		/* font-size: 32upx; */
		font-weight: 300;
		display: flex;
		align-items: center;
	}
	
	.nav-title-first-letter {
		font-size: 40upx;
		font-weight: bold;
		margin-right: 4upx;
	}
	
	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
		display: flex;
		align-items: flex-end;
	}
	
	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}
	
	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}
	
	.nav-name-action {
		font-weight: bold;
		font-size: 32upx;
		margin-right: 1px;
	}
	
	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}
	
	.text-light {
		font-weight: 300;
	}
	
	@keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	
	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	
	
	
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
	
	
	.icnons{
		 vertical-align: baseline;
		  transform: translateY(calc(50% - .35em))
	}
	.tui-title {
		font-size: 52rpx;
		color: #333;
		font-weight: bold;
	}
	
	.tui-sub-title {
		font-size: 28rpx;
		color: #7a7a7a;
		padding-top: 18rpx;
	}
	page{
background-color: 		#f1f1f1 !important;	}
.lists{
	margin-left: 60rpx;
	
	margin-right: 60rpx;
}
.content {
	position: absolute;
	left: 226rpx;
	width: calc(100% - 96rpx - 60rpx - 120rpx - 100rpx);
	line-height: 1.6em;
}
.content.flex-sub {
	width: calc(100% - 96rpx - 60rpx - 100rpx);
}
.content>view:first-child {
	font-size: 30rpx;
	display: flex;
	align-items: center
}
.cu-avatar {
	position: absolute;
	left: 110rpx
}
.action {
	width: 100rpx;
	text-align: center
}

.action view+view {
	margin-top: 10rpx
}

.cu-list.menu-avatar.comment>.cu-item .content {
	position: relative;
	left: 0;
	width: auto;
	flex: 1;
}

.cu-list.menu-avatar.comment>.cu-item {
	padding: 30rpx 30rpx 30rpx 120rpx;
	height: auto
}

.cu-list.menu-avatar.comment .cu-avatar {
	align-self: flex-start
}

.movebox {
	position: relative;
	display: flex;
	padding-right: 10rpx;
	padding-left: 80rpx;
	height: 140rpx;
	background-color: var(--white);
	justify-content: flex-end;
	align-items: center
} 
.content .cu-tag.sm {
	display: inline-block;
	margin-left: 10rpx;
	height: 28rpx;
	font-size: 16rpx;
	line-height: 32rpx
}
.tui-swipeout-wrap{
	background-color: transparent !important;
}
</style>
