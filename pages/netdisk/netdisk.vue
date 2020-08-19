<template>
	<view >
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
										    <view slot="backText">返回</view>
										    <view slot="content">资源</view>
										  </cu-custom>
							
	 <tui-fab  :bottom="100"  :btnList="list" @click="onClick" v-if="showActionSheet==false"></tui-fab>
										  <view class="cu-list menu sm-border margin-top">
											  <view class="cu-item" v-for="item in filelist">
											  	<view class="content" style="display: flex;align-items: center;justify-content: flex-start;">
													<!-- <text class="iconfont icon-video " style="font-size: 70rpx;color: #8095ff;" v-if="item.filename.includes('.mp4')||item.filename.includes('.rm')||item.filename.includes('.wmv')"></text>
													<text class="iconfont icon-jpg " style="font-size: 70rpx;" v-else-if="item.filename.includes('.jpg')||item.filename.includes('.png')||item.filename.includes('.jpeg')||item.filename.includes('.gif')||item.filename.includes('.bmp')"></text>
													<text class="iconfont icon-pdf " style="font-size: 70rpx;color: #ff5562;" v-else-if="item.filename.includes('.pdf')"></text>
													<text class="iconfont icon-excel " style="font-size: 70rpx;color: #5acc9b;" v-else-if="item.filename.includes('.xls')||item.filename.includes('.xlsx')"></text>
													<text class="iconfont icon-ppt " style="font-size: 70rpx;color: #ff8976;" v-else-if="item.filename.includes('.ppt')||item.filename.includes('.pptxx')"></text>
													
													<text class="iconfont icon-word " style="font-size: 70rpx;color: #00BFFF;" v-else-if="item.filename.includes('.doc')||item.filename.includes('.docx')"></text>
													<text class="iconfont icon-download " style="font-size: 70rpx;color: #5acc9b;" v-else></text> -->
													<image :src="'../../static/images/files/'+gettypeicon(item)+'.png'" style="height: 64rpx;width: 64rpx;"></image>
													<view style="display: flex;flex-direction: column;">
											  		<text class="text-black text-bold " style="margin-left: 30rpx;line-height: 1em;font-size: 36rpx;">{{item.filename}}</text>
													<text class="text-gray text-sm" style="margin-left: 30rpx;line-height: 1em;margin-top: 3rpx;">2020-09-1 11:30 段永祥</text>
													</view>
													<view @click="showActionSheet=true"><text class="cuIcon-more text-grey"  style="font-size: 40rpx;position: absolute;;right: 20rpx;" @click="showActionSheet=true"></text></view>
													
											  	</view>
											  </view>
<!-- 											  <view class="cu-item">
											  	<view class="content">
											  		<text class="cuIcon-circlefill text-grey"></text>
											  		<text class="text-grey text-bold">测试.doc</text>
													
											  	</view>
											  </view>
											  <view class="cu-item">
											  	<view class="content">
											  		<text class="cuIcon-circlefill text-grey"></text>
											  		<text class="text-grey">图标 + 标题</text>
											  	</view>
											  </view> -->
										  </view> 
										  <tui-actionsheet :show="showActionSheet" :tips="item.filename" :item-list="[{text:'预览'},{text:'复制链接'},{text:'删除',color:'red'}]" :mask-closable="true" :color="'black'"
										    @click="itemClick($event,item)" @cancel='showActionSheet=false'></tui-actionsheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showActionSheet:false,cid:'',obj:null,
				filelist:[
					{
						filename:'test.doc',
					},{
						filename:'test.mp4',
					},{
						filename:'test.zip',
					},{
						filename:'test.jpg',
					},{
						filename:'test.xls',
					},{
						filename:'test.pdf',
					}
				],list: [{
					bgColor: "#16C2C2",
					//图标/图片地址
					imgUrl: "/static/images/files/picture.png",
					//图片高度 rpx
					imgHeight: 64,
					//图片宽度 rpx
					imgWidth: 64,
					//名称
					text: "上传图片",
					//字体大小
					fontSize: 34,
					//字体颜色
					color: "#fff"
				}, {
					bgColor: "#64B532",
					//图标/图片地址
					imgUrl: "/static/images/files/wechat.png",
					//图片高度 rpx
					imgHeight: 64,
					//图片宽度 rpx
					imgWidth: 64,
					//名称
					text: "聊天文件",
					//字体大小
					fontSize: 34,
					//字体颜色
					color: "#fff"
				}],
			}
		},onShow() {
			this.cid=this.$store.getters.getcid
		let AV=this.$AV
			const query=new AV.Query('files')
			query.equalTo('cid', this.cid)
			query.first().then((wiki) => {
			
			                console.log(wiki)
			                this.obj = wiki
			                this.filelist = wiki ? wiki.get('list') : []
			                if (!(wiki)) {
			                    this.obj = new AV.Object('files')
			                    this.obj.set('list', [])
			                    this.obj.set('cid', this.cid)
			                    this.obj.save()
			                }
		})},
		methods: {
			gettypeicon(item){
				if(item.filename.includes('.zip')||item.filename.includes('.rar')||item.filename.includes('.7z')||item.filename.includes('.jar')) return 'zip'
				if(item.filename.includes('.mp4')||item.filename.includes('.rm')||item.filename.includes('.wmv')) return 'video'
				if(item.filename.includes('.jpg')||item.filename.includes('.png')||item.filename.includes('.jpeg')||item.filename.includes('.gif')||item.filename.includes('.bmp')) return 'jpg'
				if(item.filename.includes('.pdf')) return 'pdf'
				if(item.filename.includes('.doc')||item.filename.includes('.docx')) return 'word'
				if(item.filename.includes('.xls')||item.filename.includes('.xlsx')) return 'excel'
				if(item.filename.includes('.ppt')||item.filename.includes('.pptx')) return 'ppt'
				return 'download'
				
				
			},itemClick(e,item){
				let index = e.index;
				
				this.showActionSheet=false
			},onClick(e){
				let index = e.index
				
				switch (index) {
					case 1:wx.chooseMessageFile({
					  count: 1,success (res) {
    // tempFilePath可以作为img标签的src属性显示图片
    const file = res.tempFiles[0]
	uni.showLoading({
	    title: '上传中...'
	});
	let newfile= new this.$AV.File(file.name,{blob:{uri:file.path}}).save().then((file)=>{
		let url = file.get('url')
		 let datas = {
		                        name: file.name,
		                        owner: this.$store.getters.getUserData['name'],
		                        url: url,
		                        createon: new Date().toLocaleString(),
		                        size: file.size
		                    }
							this.obj.add('list', datas)
							  this.obj.save().then((obj) => {
							  this.obj = obj
							                        this.filelist = obj.get('list')
													uni.hideLoading()
							
							                    })
	})
	
	console.log(res)
  }})
				
			}
		}
	}}
</script>

<style>
.icons {
  vertical-align: baseline;
  transform: translateY(calc(50% - .35em))
}
page{
	/* background: #F1F1F1; */
	height: 100vh;
}
</style>
