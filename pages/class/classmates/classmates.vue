<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				    <view slot="backText">返回</view>
				    <view slot="content">班级成员</view>
				  </cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
			</view>
		</view>
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
		 <view class="indexItem-xx" :id="indexes-xx" :data-index="xx">
		 	<view class="padding">星标</view>
		 	<view class="cu-list menu-avatar no-padding">
				<view class="cu-item" v-for="(items,sub) in xlist" :key="sub">
							<tui-swipe-action :operateWidth="140">
											<template v-slot:content >
		 		<view style="display: flex;justify-content: flex-start;align-items: center;flex-direction: row;width: 100vw;">
		 			<view class="cu-avatar round lg" style="margin-left: 30rpx;">{{items.name[0]}}</view>
		 			<view style="margin-left:20rpx ;">
		 				<view class="text-grey" style="font-size: 30rpx;">{{items.name}}</text></view>
		 				<view class="tui-flex">
		 <tui-tag margin="20rpx 20rpx 0 0" padding="8rpx" size="24rpx" type="light-green" v-if="items.role==2" >课代表</tui-tag>
		 <tui-tag margin="20rpx 20rpx 0 0" padding="8rpx" size="24rpx" type="light-orange" v-if="items.role==1">班长</tui-tag>
		 <tui-tag margin="20rpx 20rpx 0 0" padding="8rpx" size="24rpx" type="black" v-if="items.role==-1||items.role===undefined">教师</tui-tag>
		  <tui-tag margin="20rpx 20rpx 0 0"  padding="8rpx" size="24rpx" type="btn-gray"  >
		 {{items.group}}
		 </tui-tag>
<text></text>
		 				</view></view>
		 			</view>
		 			
					</template>
												<template v-slot:button>
													<view class="tui-custom-btn_box">
														<view class="tui-custom-btn tui-custom-mr" @tap="customBtn(0)"><tui-icon name="star" color="#333" :size="20"></tui-icon></view>
														<view class="tui-custom-btn" @tap="customBtn(1)"><tui-icon name="delete" color="#333" :size="18"></tui-icon></view>
													</view>
												</template> 
											</tui-swipe-action></view>
		 		</view></view>
		 <block v-for="index in list" :key="index">
		 	<view :class="'indexItem-' + klist[index][0].key" :id="'indexes-' + klist[index][0].key" :data-index="klist[index][0].key">
		 		<view class="padding">{{klist[index][0].key}}</view>
		 		<view class="cu-list menu-avatar no-padding">
		 			<view class="cu-item" v-for="(items,sub) in klist[index]" :key="sub">
		 										<tui-swipe-action :operateWidth="140">
		 														<template v-slot:content >
		 					 		<view style="display: flex;justify-content: flex-start;align-items: center;flex-direction: row;width: 100vw;">
		 					 			<view class="cu-avatar round lg" style="margin-left: 30rpx;">{{items.name[0]}}</view>
		 					 			<view style="margin-left:20rpx ;">
		 					 				<view class="text-grey" style="font-size: 30rpx;">{{items.name}}</text></view>
		 					 				<view class="tui-flex">
		 					 <tui-tag margin="20rpx 20rpx 0 0" padding="8rpx" size="24rpx" type="light-green" v-if="items.role==2" >课代表</tui-tag>
		 					 <tui-tag margin="20rpx 20rpx 0 0" padding="8rpx" size="24rpx" type="light-orange" v-if="items.role==1">班长</tui-tag>
		 					 <tui-tag margin="20rpx 20rpx 0 0" padding="8rpx" size="24rpx" type="black" v-if="items.role==-1||items.role===undefined">教师</tui-tag>
		 					  <tui-tag margin="20rpx 20rpx 0 0"  padding="8rpx" size="24rpx" type="btn-gray"  >
		 					 {{items.group}}
		 					 </tui-tag>
		 			<text></text>
		 					 				</view></view>
		 					 			</view>
		 					 			
		 								</template>
		 															<template v-slot:button>
		 																<view class="tui-custom-btn_box">
		 																	<view class="tui-custom-btn tui-custom-mr" @tap="customBtn(0)"><tui-icon name="star" color="#333" :size="20"></tui-icon></view>
		 																	<view class="tui-custom-btn" @tap="customBtn(1)"><tui-icon name="delete" color="#333" :size="18"></tui-icon></view>
		 																</view>
		 															</template> 
		 														</tui-swipe-action>
						
		 			</view></view></view>
					</block>
		 </scroll-view>
		 <view class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 120rpx)'}]">
		 	<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				
		 		<view class="indexBar-item" v-for="(item,index) in list"  :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> <text class="cuIcon-favorfill icnons" style="color:gold;" v-if="index==0"></text><text v-else>{{item}}</text></view>
		 	</view>
		 </view>
		 <!--选择显示-->
		 <view v-show="!hidden" class="indexToast">
			 <text class="cuIcon-favorfill icnons" v-if="listCur=='xx'" style="color:gold;"></text>
		 	<text v-else>{{listCur}}</text>
		 </view>
	</view>
</template>

<script>
	import ZhToPinYin from '../../../components/tui-zh-pinyin/tui-zh-pinyin.js';
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				plist:[
					{
						name:'李翔',
						role:2,group:'软件1801'
						
					},{
						name:'李文韬',
						role:1,group:'软件1801'
					},{
						name:'张羽嘉',
						role:0,group:'软件1801'
					},{
					name:'段永祥',role:-1,group:'计通学院'
					}
				],klist:{},list:['xx'],listCur:'',hidden: true,
				listCurID: '',xlist:[]
			}
		},onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
		},
		methods: {
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id];
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num]
				};
			},
			
			//触发全部开始选择
			tStart() {
				this.hidden = false
			},
			
			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i];
						that.movableY = i * 20
						return false
					}
				}
			}
		},onLoad() {
			this.$http.get("course/"+this.$store.getters.getcid+"/plist").then(res=>{
				this.plist=res.data.data
				this.zhToPinYin = new ZhToPinYin(true);
				
				for(let per of this.plist){
					if(per.role===undefined||per.role!=0){
						this.xlist.push(per)
					}
					per.key=this.zhToPinYin.getInitials(per.name)[0]
					// console.log(this.klist[per.key],per.key)
					if(this.klist[per.key]!=undefined){
						this.klist[per.key].push(per)
					}else{
						this.klist[per.key]=[]
						console.log(this.klist[per.key],per.key)
						this.klist[per.key].push(per)
						console.log(this.klist[per.key],per.key)
						
					}
				}
				
				this.list=this.list.concat(Object.keys(this.klist).sort())
				this.listCur = this.list[0];
			})
			
			
		}
	}
</script>

<style>
	page {
		padding-top: 100upx;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: flex-start;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
	.cu-list.menu-avatar.cu-item {
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		padding-right: 10rpx;
		height: 140rpx;
		background-color: #ffffff;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		        justify-content: flex-end;
		-webkit-box-align: center;
		-webkit-align-items: center;
		        align-items: center
	}
	.cu-list.menu-avatar.cu-item.cu-avatar {
		position: absolute;
		left: 30rpx
	}
	.cu-list.menu-avatar.cu-item .flex .text-cut {
		max-width: 510rpx
	}
	.cu-list.menu-avatar.cu-item .content {
		position: absolute;
		left: 146rpx;
		width: calc(100% - 96rpx - 60rpx - 120rpx - 20rpx);
		line-height: 1.6em;
	}
	.cu-list.menu-avatar.cu-item .content.flex-sub {
		width: calc(100% - 96rpx - 60rpx - 20rpx);
	}
	.cu-list.menu-avatar.cu-item .content>view:first-child {
		font-size: 30rpx;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		        align-items: center
	}
	.cu-list.menu-avatar.cu-item .content .cu-tag.sm {
		display: inline-block;
		margin-left: 10rpx;
		height: 28rpx;
		font-size: 16rpx;
		line-height: 32rpx
	}
	.cu-list.menu-avatar.cu-item .action {
		width: 100rpx;
		text-align: center
	}
	.cu-list.menu-avatar.cu-item .action view+view {
		margin-top: 10rpx
	}
</style>
