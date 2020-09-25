<template>
	<view >
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
										    <view slot="backText">返回</view>
										    <view slot="content">资源</view>
										  </cu-custom>
							
	 <tui-fab  :bottom="100"  :btnList="list" @click="onClick" v-if="showActionSheet==false"></tui-fab>
										  <view class="cu-list menu sm-border margin-top" v-if="filelist.length>0">
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
											  		<text class="text-black text-bold " style="margin-left: 30rpx;line-height: 1em;font-size: 36rpx;">{{item.name.length>20?item.name.substr(0,20)+'...':item.name}}</text>
													<text class="text-gray text-sm" style="margin-left: 30rpx;line-height: 1em;margin-top: 3rpx;">{{new Date(item.createon).toLocaleDateString()}} {{item.owner}}</text>
													</view>
													<view @click="showde(item)"><text class="cuIcon-more text-grey"  style="font-size: 40rpx;position: absolute;;right: 20rpx;" @click="showde(item)"></text></view>
													
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
										  <view v-else style="display: flex;flex-direction: column;align-items: center;justify-content: center;height: 90vh;">
										  							  <view style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
										  								 <image src="../../static/images/empty.png" style="width: 128px;height: 100px;margin-bottom: 20px;margin-top: 10px;"/>
										  								 <text style="font-weight: bold;color: grey;">暂无文件,点击 + 号上传</text>
										  								 
										  							  </view>
										  							  
										  </view>
										  <tui-actionsheet :show="showActionSheet" :tips="currentfile.name" :item-list="actions" :mask-closable="true" :color="'black'"
										    @click="itemClick($event)" @cancel='showActionSheet=false'></tui-actionsheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showActionSheet:false,cid:'',obj:null,currentfile:{},actions:[{text:'预览'},{text:'复制链接'}],
				filelist:[
					
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
				}]	}
		},onShow() {
			uni.showToast({
				icon:"loading"
			});//加载中动画
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
							uni.hideLoading();
		})},
		methods: {
			gettypeicon(item){
				if(item.name.includes('.zip')||item.name.includes('.rar')||item.name.includes('.7z')||item.name.includes('.jar')) return 'zip'
				if(item.name.includes('.mp4')||item.name.includes('.rm')||item.name.includes('.wmv')) return 'video'
				if(item.name.includes('.jpg')||item.name.includes('.png')||item.name.includes('.jpeg')||item.name.includes('.gif')||item.name.includes('.bmp')) return 'jpg'
				if(item.name.includes('.pdf')) return 'pdf'
				if(item.name.includes('.doc')||item.name.includes('.docx')) return 'word'
				if(item.name.includes('.xls')||item.name.includes('.xlsx')) return 'excel'
				if(item.name.includes('.ppt')||item.name.includes('.pptx')) return 'ppt'
				return 'download'
				
				
			},itemClick(e){
				let index = e.index;
				if(index==0){
					if(this.currentfile.pic==true){
						let url= this.currentfile.url
						wx.previewImage({
							urls:[url]
						})
					}else{
						let filetype='unknown'
						if(this.currentfile.name.endsWith('.pdf')) filetype='pdf'
						if(this.currentfile.name.endsWith('.doc')) filetype='doc'
						if(this.currentfile.name.endsWith('.docx')) filetype='docx'
						if(this.currentfile.name.endsWith('.xls')) filetype='xls'
						if(this.currentfile.name.endsWith('.xlsx')) filetype='xlsx'
						if(this.currentfile.name.endsWith('.ppt')) filetype='ppt'
						if(this.currentfile.name.endsWith('.pptx')) filetype='pptx'
						if(filetype!='unknown'){
							uni.showLoading({
							    title: '加载中...'
							});
							let url= this.currentfile.url
							wx.downloadFile({url:url,success (res){
								const filePath = res.tempFilePath
								wx.openDocument({
									filePath:filePath,
									fileType:filetype,success: function (res) {
        uni.hideLoading()
      },fail:function (res) {
        uni.hideLoading()
		uni.showToast({
			icon: 'error',
			title: '预览失败'
		})
      },
								})}
							})
						}else{
							uni.showModal({
							    title: '提示',
							    content: '此文件类型无法预览,请复制链接在浏览器打开',
							    success: function (res) {
							        if (res.confirm) {
							            console.log('用户点击确定');
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
							});
						}
					}
				}else{
					let url= this.currentfile.url
					uni.showModal({
					    title: '复制链接',
					    content: '文件直链:\n'+url,
					    success: function (res) {
					        if (res.confirm) {
								wx.setClipboardData({
								  data: url,
								  success (res) {
								    wx.getClipboardData({
								      success (res) {
								        console.log(res.data) // data
								      }
								    })
								  }
								})
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
				
				this.showActionSheet=false
			},showde(item){
				this.currentfile=item
				this.showActionSheet=true
			},onClick(e){
				let index = e.index
				let _this=this
				switch (index) {
					case 0:wx.chooseImage({
  count: 1,
  sizeType: ['original', 'compressed'],
  sourceType: ['album', 'camera'],
  success (res) {
    // tempFilePath可以作为img标签的src属性显示图片
    const tempFilePaths = res.tempFilePaths[0]
	console.log(tempFilePaths)
	uni.showLoading({
	    title: '上传中...'
	});
	let filename=tempFilePaths.substr(tempFilePaths.lastIndexOf("/")+1)
	let newfile= new _this.$AV.File(filename,{blob:{uri:tempFilePaths}}).save().then((fileinfo)=>{
		let url = fileinfo.get('url')
		 let datas = {
		                        name: filename,
		                        owner: _this.$store.getters.getUserData['name'],
		                        url: url,
		                        createon: Date().now(),
		                        size: '',pic:true
		                    }
							_this.obj.add('list', datas)
							  _this.obj.save().then((obj) => {
							  _this.obj = obj
							                        _this.filelist = obj.get('list')
													uni.hideLoading()
							
							                    })
	})
	
	
  }
}) 
break;
					case 1:wx.chooseMessageFile({
					  count: 1,success (res) {
    // tempFilePath可以作为img标签的src属性显示图片
    const file = res.tempFiles[0]
	uni.showLoading({
	    title: '上传中...'
	});
	let newfile= new _this.$AV.File(file.name,{blob:{uri:file.path}}).save().then((fileinfo)=>{
		let url = fileinfo.get('url')
		 let datas = {
		                        name: file.name,
		                        owner: _this.$store.getters.getUserData['name'],
		                        url: url,
		                        createon: new Date().toLocaleString(),
		                        size: file.size
		                    }
							_this.obj.add('list', datas)
							  _this.obj.save().then((obj) => {
							  _this.obj = obj
							                        _this.filelist = obj.get('list')
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
