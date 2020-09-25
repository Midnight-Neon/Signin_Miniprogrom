<template>
	<view>
				<cu-custom bgColor="bg-gradual-pink" :isBack="true">
						    <view slot="backText">返回</view>
						    <view slot="content">{{type==1?'作业':'通知'}}</view>
						  </cu-custom>
						  
						  <!-- <scroll-view :scroll-y="true" class="page show"  > -->	
						  <block v-if="list.length>0">
						  <tui-card  v-for="item in list" style="padding: 80rpx;padding-bottom: 80rpx;" :title="{text: item.owner}" :tag="{text: item.startat}" :header="{bgcolor: '#f9f9f9',line: true}" @click="toChild"  :data-url="item['_id']">
							  <template v-slot:image>
								  <view class="cu-avatar radius sm">
									  {{item.owner[0]}}
								  </view>
							  </template>
						  	<template v-slot:body  >
								
						  		<view class="tui-default" @click="toChild" :data-url="item['_id']">
								<p style="font-weight: bold;font-size: 36rpx;text-align:center;">{{item.title}}</p>
									 <!-- <towxml :nodes="item.content"/></towxml> -->
									 <text>
										 {{item.content}}
									 </text>
						  		</view>
						  	</template> 
						  	<template v-slot:footer>
						  		
						  			<view class="tui-default tui-flex">
						  				<tui-tag type="light-green" padding="8rpx 12rpx" size="24rpx" v-for="i in item.tag">{{i}}</tui-tag>
						  			</view>
						  		
						  	</template>
						  </tui-card>
						  </block>
						  <view v-else style="display: flex;flex-direction: column;align-items: center;justify-content: center;height: 90vh;">
							  <view style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
								 <image src="../../static/images/empty.png" style="width: 128px;height: 100px;margin-bottom: 20px;margin-top: 10px;"/>
								 <text style="font-weight: bold;color: grey;">暂无{{type==1?'作业':'通知'}}</text>
								 
							  </view>
							  
						  </view>
						<!--  <tui-card  style="padding: 80rpx;padding-top: 80rpx;" :title="{text: '段永祥'}" :tag="{text: '1小时前'}" :header="{bgcolor: '#f9f9f9',line: true}">
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
						  </tui-card> -->
						  
						 <!-- </scroll-view> -->
						  
	</view>
</template>

<script>

	export default {
		data() {
			return {
				list:[],type:0,
			}
		},components: {
			
		},
		methods: {
			toChild(item){
				console.log(item)
				if(this.type==1){
					let urlx='/pages/homework/homework?wid='+item.currentTarget.dataset['url']
					console.log(urlx)
					uni.navigateTo({
						url:urlx
					})
				}else{
					let _this=this
					console.log(item)
					uni.showModal({
					    title: '确认通知',
					    content: '向教师发送已读回执?',
					    success: function (res) {
					        if (res.confirm) {
								_this.$http.get("course/"+_this.$store.getters.getcid+"/notify/"+item.currentTarget.dataset['url']).then(res=>{
									if(res.data.code==0){
										uni.showToast({
																		icon: 'success',
																		
																		title: '发送成功'
																	});
									}
								})
								
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			}
		},onLoad(op){
			console.log(op['type'])
			if(op['type']=='homework'){
				this.type=1
				this.$http.get("course/"+this.$store.getters.getcid+"/homeworks").then(res=>{
					let data=res.data.data;
					for (let x of data){ 
						// let result = conv(x.content.substring(0,100)+"...",'markdown');
						x['content']=x['content'].replace(/#/g,"").replace(/\*/g,"").replace(/ /g,"").replace(/\n\n/g,"\n").substr(0,50)+"..."
						
					}
					this.list=data.reverse()
				})
			}else{
				this.$http.get("course/"+this.$store.getters.getcid).then(res=>{
					let data=res.data.data['notifications'];
					
					this.list=data.reverse()
				})
			}
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
