<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">信息</view>
		</cu-custom>
		<tui-fab :bottom="100" :btnList="list" @click="onClick"></tui-fab>
		<scroll-view :scroll-y="true" class="page show" style="height: calc(100vh-22rpx);">
			<view class="cu-list grid" :class="['col-3']">
				<view class="cu-item">
					<navigator url="../notification/notification">
						<view :class="['cuIcon-noticefill','text-olive','text-lg']">
							<view class="cu-tag badge" v-if="badge[0]!=0">
								<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
							</view>
						</view>
						<text class="text-bold">通知</text>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator url="/pages/notification/notification?type=homework">
						<view :class="['cuIcon-formfill','text-blue','text-lg']">
							<view class="cu-tag badge" v-if="badge[0]!=0">
								<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
							</view>
						</view>
						<text class="text-bold">作业</text>
					</navigator>
				</view>

				<view class="cu-item">
					<navigator url="/pages/checkin/checkin">
						<view :class="['cuIcon-timefill','text-red','text-lg']">
							<view class="cu-tag badge" v-if="badge[0]!=0">
								<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
							</view>
						</view>
						<text class="text-bold">签到</text>
					</navigator>
				</view>

			</view>
			<block v-if="msgList.length>0">
			<block v-for="(item,index) in msgList" :key="index">
				<tui-swipe-action :operateWidth="140" v-if="!blacklists.includes(item['ID'])">
					<template v-slot:content>
						<tui-list-cell :unlined="false">

							<view class="tui-chat-item" :data-url="item['ID']" @click="detail($event)">
								<view class="tui-msg-box">
									<view class="cu-avatar radius tui-msg-pic" mode="widthFix">{{item.name[0]}}</view>
									<view class="tui-msg-item">
										<view class="tui-msg-name">{{item.name}}</view>
										<view class="tui-msg-content">{{item.msg}}</view>
									</view>
								</view>
								<view class="tui-msg-right" :class="[item.level==3?'tui-right-dot':'']">
									<view class="tui-msg-time">{{item.time}}</view>
									<tui-badge :type="item.level==2?'gray':'danger'" :dot="item.level==3?true:false" v-if="item.msgNum>0">{{item.level!=3?item.msgNum:""}}</tui-badge>
								</view>
							</view>
						</tui-list-cell>
					</template>
					<template v-slot:button>
						<view class="tui-custom-btn_box">
							<view class="tui-custom-btn tui-custom-mr" @tap="customBtn(index,0)">
								<tui-icon name="star-fill" color="#333" :size="20" v-if="item.level==1"></tui-icon>
								<tui-icon name="star" color="#333" :size="20" v-else></tui-icon>
							</view>
							<view class="tui-custom-btn" @tap="customBtn(index,1)">
								<tui-icon name="delete" color="#333" :size="18"></tui-icon>
							</view>
						</view>
					</template>
				</tui-swipe-action>
			</block>
</block><view v-else style="display: flex;flex-direction: column;align-items: center;justify-content: center;height: 60vh;">
							  <view style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
								 <image src="../../static/images/empty.png" style="width: 128px;height: 100px;margin-bottom: 20px;margin-top: 10px;"/>
								 <text style="font-weight: bold;color: grey;">暂无聊天</text>
								 
							  </view>
							  
						  </view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgList: [{
					name: "段永祥",
					msg: "作业交了吗?",
					msgNum: 2,
					time: "10:22",
					level: 1
				}, {
					name: "张羽嘉",
					msg: "中午去哪吃?",
					msgNum: 2,
					time: "13:27",
					level: 1
				}],
				blacklists: [],
				list: [{
					bgColor: "#16C2C2",
					//图标/图片地址
					imgUrl: "/static/images/fab/fab_about.png",
					//图片高度 rpx
					imgHeight: 64,
					//图片宽度 rpx
					imgWidth: 64,
					//名称
					text: "通知",
					//字体大小
					fontSize: 34,
					//字体颜色
					color: "#fff"
				}, {
					bgColor: "#64B532",
					//图标/图片地址
					imgUrl: "/static/images/fab/message.png",
					//图片高度 rpx
					imgHeight: 64,
					//图片宽度 rpx
					imgWidth: 64,
					//名称
					text: "私信",
					//字体大小
					fontSize: 34,
					//字体颜色
					color: "#fff"
				}],
			}
		},
		onShow() {
			let blacklist = uni.getStorageSync("blacklists")
			this.blacklists = blacklist
			this.$http.get("course/" + this.$store.getters.getcid + "/chats").then(res => {
				let lists = res.data.data
				for (let list of lists) {
					list['msgNum'] = list['chats'].filter((v) => {
						return v.read == 0 && v.sender != this.$store.getters.getUserData['id']
					}).length
					list['msg'] = list['chats'].slice(-1)[0]['msg']
					let xx = list['infos'].filter(v => {
						return v.ID != this.$store.getters.getUserData['id']
					})[0]
					list['name'] = xx['name']
					list['ID'] = xx['ID']

				}
				this.msgList = lists


			})
		},
		methods: {
			customBtn(index, i) {
				if (i == 0) {
					this.msgList[index].level = this.msgList[index].level == 1 ? 2 : 1
				}
				if (i == 1) {
					let blacklist = uni.getStorageSync("blacklists")
					console.log(blacklist)
					if (blacklist) {
						blacklist.push(this.msgList.splice(index, 1)[0]['ID'])
					} else {
						blacklist = []
						blacklist.push(this.msgList.splice(index, 1)[0]['ID'])

					}
					uni.setStorage({
						key: "blacklists",
						data: blacklist
					})


				}
			},
			detail(event) {
				console.log(event)
				let id = event.currentTarget.dataset['url']
				uni.navigateTo({
					url: "/pages/chat/chat?uid=" + id
				})
			}
		},
		onLoad() {

		}
	}
</script>

<style>
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


	.tui-chat-item {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-msg-box {
		display: flex;
		align-items: center;
	}

	.tui-msg-pic {
		width: 100rpx;
		height: 100rpx;
		margin-right: 24rpx;
	}

	.tui-msg-item {
		max-width: 500rpx;
		min-height: 80rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.tui-msg-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 34rpx;
		line-height: 1;
		color: #262b3a;
	}

	.tui-msg-content {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 28rpx;
		line-height: 1;
		color: #9397a4;
	}

	.tui-msg-right {
		max-width: 120rpx;
		height: 88rpx;
		margin-left: auto;
		text-align: right;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.tui-msg-right.tui-right-dot {
		height: 76rpx;
		padding-bottom: 10rpx;

	}

	.tui-msg-time {
		width: 100%;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #9397a4;
	}
</style>
