<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
										    <view slot="backText">返回</view>
										    <view slot="content">问答</view>
										  </cu-custom>
										  <view class="container">
											  <view class="cu-form-group" v-if="type==0">
											  	<!-- <view class="title">标题</view> -->
											  	<input placeholder="输入标题" name="input" v-model="newask.title" ></input>
											  </view>
		<view class="tui-cells">
			<textarea class="tui-textarea" v-model="newask.content" name="desc" :placeholder="iscommnet?'发表你的评论...':'输入内容'" maxlength="500" placeholder-class="tui-phcolor-color" auto-focus />
			<view class="tui-textarea-counter">{{newask.content.length}}/500</view>
		</view>
		<view class="tui-enclosure">
		<!-- 	<tui-icon margin="0 40rpx 0 0"  name="satisfied" :size="25"></tui-icon>
			<tui-icon margin="0 40rpx 0 0" name="picture" :size="25"></tui-icon>
			<tui-icon name="link" :size="22"></tui-icon> -->
		</view>
		<view class="tui-cmt-btn">
			<button class="cu-btn bg-red margin-tb-sm lg" style="width: 90vw;" @click="submit">发表</button>
			<!-- <tui-button shape="circle"></tui-button> -->
		</view>
	</view></view>
</template>

<script>
export default {
	data() {
		return {
			newask:{title:'',owner:this.$store.getters.getUserData['name'],uid:this.$store.getters.getUserData['ID'],reply:[],treply:0,role:this.$store.getters.getUserData['role'],content:'',time:''},
			aid:'',type:0,newcommnet:{owner:this.$store.getters.getUserData['name'],uid:this.$store.getters.getUserData['ID'],replys:[],reply:-1,content:'',time:'',role:this.$store.getters.getUserData['role']}
		};
	},
	methods: {
		submit(){
			if(this.type==1){
				this.newcommnet['content']=this.newask['content']
				this.newcommnet['time']=new Date().toLocaleDateString()
				this.$http.post("course/"+this.$store.getters.getcid+"/ask/"+this.aid+"/reply",this.newcommnet).then(
				uni.navigateBack({})
				)
				
			}else{
				this.newask['time']=new Date().toLocaleDateString()
				this.$http.post("course/"+this.$store.getters.getcid+"/asks",this.newask).then(
				uni.navigateBack({})
				)
			}
			
		}
	},onLoad(op) {
		console.log(op['aid'],op['replyto'])
		if(op['aid']!=undefined){
			this.type=1;
			this.aid=op['aid']
		}
		if(op['replyto']!=undefined){
			this.type=1;
			this.newcommnet.reply=op['replyto']
		}

if(op['aid']!=undefined){
			this.type=1;
			this.aid=op['aid']
		}	}
};
</script>

<style>
page {
	background: #fff;
	color: #333;
}
.container {
	padding: 30rpx;
	box-sizing: border-box;
}

.tui-cells {
	border-radius: 4rpx;
	height: 280rpx;
	box-sizing: border-box;
	padding: 20rpx 20rpx 0 20rpx;
	position: relative;
}

.tui-cells::after {
	content: '';
	position: absolute;
	height: 200%;
	width: 200%;
	border: 1px solid #e6e6e6;
	transform-origin: 0 0;
	-webkit-transform-origin: 0 0;
	-webkit-transform: scale(0.5);
	transform: scale(0.5);
	left: 0;
	top: 0;
	border-radius: 8rpx;
	pointer-events: none;
}

.tui-textarea {
	height: 210rpx;
	width: 100%;
	color: #666;
	font-size: 28rpx;
}

.tui-phcolor-color {
	color: #ccc !important;
}

.tui-textarea-counter {
	font-size: 24rpx;
	color: #999;
	text-align: right;
	height: 40rpx;
	line-height: 40rpx;
	padding-top: 4rpx;
}
.tui-enclosure {
	display: flex;
	align-items: center;
	padding: 26rpx 10rpx;
	box-sizing: border-box;
}

.tui-cmt-btn {
	margin-top: 60rpx;
}
</style>
