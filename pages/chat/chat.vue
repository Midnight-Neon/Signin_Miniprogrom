<template>
	<view >
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">聊天</block></cu-custom>
		<view class="cu-chat" >
			<block v-for="item in mes">
			<view class="cu-item self" v-if="item.me==true">
				<view class="main">
					<view class="content bg-green shadow">
						<text>{{item.msg}}</text>
					</view>
				</view>
				<!-- <view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view> -->
				<view class="date" style="left: unset;right: 50rpx;">{{item.time}}</view>
			</view>
<!-- 			<view class="cu-info round">对方撤回一条消息!</view>
 -->			
 <view class="cu-item" v-else>
				<view class="cu-avatar radius">{{item.name[0]}}</view>
				<view class="main">
					<view class="content shadow">
						<text>{{item.msg}}</text>
					</view>
				</view>
				<view class="date">{{item.time}}</view>
			</view>
			</block>
			

		<view class="cu-bar foot input bg-white" :style="[{bottom:InputBottom+'px'}]">
		<!-- 	<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view> -->
			<input class="solid-bottom  shadow-blur" style="background-color: #f1f1f1;" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur"></input>
		<!-- 	<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view> -->
			<button class="cu-btn bg-green shadow">发送</button>
		</view>

	</view></view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0,
				mes:[
					{
						name:'李翔',
						msg:'你好',
						time:'2020年8月23日 13:23',
						me:true
					},
					{
						name:'张羽嘉',
						msg:'你好',
						time:'2020年8月23日 14:23',
						me:false
					}
				]
			};
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style>
page{
  padding-bottom: 100upx;
 background-color: 		#f1f1f1 !important;
}
</style>
