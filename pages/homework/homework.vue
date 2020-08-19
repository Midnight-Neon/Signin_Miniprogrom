<template>
	<view>
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
						    <view slot="backText">返回</view>
						    <view slot="content">作业</view>
						  </cu-custom>
		
		<view class="cu-card article">
			<view class="cu-item shadow">
				<view class="title" style="line-height: unset;padding: 40rpx 40rpx 0rpx 40rpx;text-align:center"><text >{{datas.title}}</text></view>
				<view class="content" style="flex-direction: column;">
					
					<view class="desc">
						 <towxml :nodes="text"/></view>
						<view>
							<view class="cu-tag bg-red light sm round">作业</view>
							<view class="cu-tag bg-green light sm round" v-for="tag in datas.tag">{{tag}}</view>
						</view>
					</view>
				</view>
			</view> 
			<view class="cu-card article" v-if="ans['reply']!=undefined">
			<view class="cu-item shadow">
				<view class="cu-form-group margin-top" style="display: flex;flex-direction: column;">
					<tui-rate :current="Math.floor(ans['reply']['rank'])" active="#ff7900" :hollow="true" :disabled="true" :quantity="10" :score="ans['reply']['rank']-Math.floor(ans['reply']['rank'])==0?1:ans['reply']['rank']-Math.floor(ans['reply']['rank'])"></tui-rate>
					<text>
						{{ans['reply']['text']}}
					</text>
					<view style="align-self: flex-start;">
						<view class="cu-tag bg-red light sm round">{{ans['reply']['owner']}}</view></view>
				</view>
				</view>
				</view>
	
		<view class="cu-card article">
	<view class="cu-item shadow">
		<view class="cu-form-group margin-top" >
						<view style="display: flex;flex-direction: column;">
							<text class="text-bold">手动提交</text>
							<text class="text-grey">线下提交给老师,线上不做提交</text>
							</view>
						<switch @change="Switch" :class="inperson?'checked':''" :checked="inperson?true:false" :disabled="datas['done']==1"></switch>
					</view>		
			<view class="cu-form-group margin-top"  v-if="!ans.inperson" style="background-color: #f9f9f9f9;border-top:0;padding: 20rpx;margin: 30rpx;border-radius: 10rpx;">
				<textarea maxlength="500" v-model="ans.text" placeholder="请答题..."  :disabled="datas['done']==1">
					
				</textarea>
				
			</view>
			<view class="cu-form-group margin-top" v-if="!ans.inperson" style="border-top:0">
				<tui-upload :value="ans.pics" v-if="!ans.inperson" @complete="com" :AV="$AV"  ></tui-upload>
				</view>
			
			</view>
			<view class="padding flex flex-direction"><button class="cu-btn bg-red margin-tb-sm lg" @click="submit" :disabled="datas['done']==1">{{datas['done']==1?'不可重复提交':'提交'}}</button></view>
		</view>
		
	</view>
</template>

<script>
	import towxml from '../../static/towxml/towxml'
	import conv from '../../static/towxml/index.js'
	export default {
		data() {
			return {
				ans:{
					text:'',
					pics:[],
					inperson:false
				},id:'',datas:{},text:''
				
				
				}},components: {
			towxml
		},
		methods: {com(e){console.log(e)
		this.ans.pics=e.imgArr
		},
			textareaAInput(e) {
				this.ans.text = e.detail.value
			},Switch(e) {
				this.ans.inperson = e.detail.value
			},submit(){
				this.$http.post("course/"+this.$store.getters.getcid+"/homework/"+this.id,this.ans).then((res=>{
					this.datas=res.data.data
				}))
			}
		},onLoad: function (op) {
			console.log(op['wid'])
			this.id=op['wid'] 
			this.$http.get("course/"+this.$store.getters.getcid+"/homework/"+op['wid']).then(res=>{
				this.datas=res.data.data
				let result = conv(this.datas.content,'markdown');
				this.text=result
				this.ans=this.datas['ans'].length>0?this.datas['ans'][0]:{
					text:'',
					pics:[],
					inperson:false
				},
				console.log(Math.floor(this.ans['reply']['rank']))
				
			})
		// 
		// this.text=result

	}}
</script>

<style>
	.cu-form-group textarea[disabled]{
		color: grey;
	}
page{
	background-color: #F1F1F1 !important;
}
</style>
