<template>
	<view >
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">聊天</block></cu-custom>
		<view class="cu-chat" >
			<block v-for="item in mes">
			<view class="cu-item self" v-if="item['sender']!=uid">
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
			 @focus="InputFocus" @blur="InputBlur" v-model="newmes.msg"></input>
		<!-- 	<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view> -->
			<button class="cu-btn bg-green shadow" @click="send">发送</button>
		</view>

	</view></view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0,uid:'',newmes:{
					name:this.$store.getters.getUserData['name'],
					msg:'',time:'',sender:this.$store.getters.getUserData['id'],read:0
				},
				mes:[
					
				]
			};
		},onLoad(op) {
			console.log(op['uid'])
			this.uid=op['uid']
			this.refresh()
		},onShow() {
		this.refresh()	
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},refresh(){
				this.$http.get("course/"+this.$store.getters.getcid+"/chat/"+this.uid).then(res=>{
					let data=res.data.data
					if(data!=null){
this.mes=data['chats']						
					}
					
				})
			},send(){
				let x=this.newmes
				x['sender']=this.$store.getters.getUserData['id']
				console.log(x)
				x['time']=new Date().toLocaleTimeString()
				if(this.mes.length==0){
					x['new']=true
				}else{
					x['new']=false
					
				}
				
				this.$http.post("course/"+this.$store.getters.getcid+"/chat/"+this.uid,x).then(res=>{
					this.newmes={
					name:this.$store.getters.getUserData['name'],
					msg:'',time:'',sender:this.$store.getters.getUserData['id'],read:0
				},
					this.refresh()
				})
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
