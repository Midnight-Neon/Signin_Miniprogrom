<template>
	<view>
		<view class="mainIndex">
			<home v-if="PageCur=='home'"></home> <!-- 首页 -->
			<!-- <motion v-if="PageCur=='motion'"></motion>  运动 --> 
			
			<mine v-if="PageCur=='mine'"></mine> <!-- 我的 -->
		</view>
		
		<view class="cu-bar tabbar bg-white shadow foot mainCD" :style="{zIndex:isTop?'999999':'99'}" >
			<view class="action" :class="PageCur=='home'?'text-black':'text-gray'" @click="NavChange" data-cur="home">
				<view class="cuIcon-homefill"></view> 首页
			</view>
			<!-- <view class="action" :class="PageCur=='motion'?'text-black':'text-gray'" @click="NavChange" data-cur="motion">
				<view class="cuIcon-footprint"></view> 运动
			</view> -->
			<view class="action text-gray add-action" @click="NavChange" data-cur="ble">
				<button class="cu-btn cuIcon-scan bg-black shadow" @click="NavChange" data-cur="ble"></button>
				扫码
			</view>
			<!-- <view class="action" :class="PageCur=='goal'?'text-black':'text-gray'" @click="NavChange" data-cur="goal">
				<view class="cuIcon-remind">
					<view class="cu-tag badge">2</view>
				</view>
				目标
			</view> -->
			<view class="action" :class="PageCur=='mine'?'text-black':'text-gray'" @click="NavChange" data-cur="mine">
				<view class="cuIcon-my">
					<view class="cu-tag badge"></view>
				</view>
				我的
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'home', //切换菜单
				toPageCur: '', //上次切换的菜单
				isTop:false, //底部菜单是否在最顶层
			}
		},
		methods: {
			NavChange: function(e) {
				//底部菜单切换
				let _this=this
				if(e.currentTarget.dataset.cur=='ble'){
					if(this.$store.getters.getUserData['id']==-1){
						uni.showToast({
							icon:"error",
							title:"教师无需签到"
						})
						return
					}
					wx.scanCode({
					  onlyFromCamera: true,scanType:["qrCode"],
					  success (res) {
					    console.log(res)
						let info=JSON.parse(res['result'])
						if(info['type']==1){
							_this.$http.post("checkin",{"code":info.code,"uid":_this.$store.getters.getUserData['id'],"type":1,"name":_this.$store.getters.getUserData['name']}).then(res=>{
								if(res.data.code==0){
									uni.showToast({
								icon:"success",
										title:"签到成功"
									})
						}else{
						
								uni.showToast({
							icon:"error",
									title:"签到失败"
								})
						}})}
						if(info['type']==2){
							uni.navigateTo({
								url:"/pages/password/password?code="+info['code']
							})
						}
						if(info['type']==3){
							uni.navigateTo({
								url:"/pA/camera/camera?code="+info['code']+"&uid="+_this.$store.getters.getUserData['id']+"&name="+_this.$store.getters.getUserData['name']
							})
						}
						
					  
					}})
				}else{
					this.PageCur = e.currentTarget.dataset.cur
					
				}
			}
		},
	
		
	}
</script>

<style lang="scss" scoped>
	@import "../style/color/color.scss";
	
	.mainIndex{
		padding-bottom:128upx;
	}
	.text-black{
		color: $blackColor !important;
	}
	.bg-black{
		background: $blackColor !important;
	}
	
	.cu-bar.tabbar.shadow {
		-webkit-box-shadow: 0 0.5px 36px 0 rgba(43,86,112,.2) !important;
		box-shadow: 0 0.5px 36px 0 rgba(43,86,112,.2) !important;
	}
</style>
