<template>
	<view>
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
						    <view slot="backText">返回</view>
						    <view slot="content">数据结构</view>
						  </cu-custom>
		
		<view class="cu-card article">
			<view class="cu-item shadow">
				<view class="title" style="line-height: unset;padding: 40rpx 40rpx 0rpx 40rpx;"><text >无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</text></view>
				<view class="content" style="flex-direction: column;">
					
					<view class="desc">
						 <towxml :nodes="text"/></view>
						<view>
							<view class="cu-tag bg-red light sm round">作业</view>
							<view class="cu-tag bg-green light sm round">代码</view>
						</view>
					</view>
				</view>
			</view> 
			
	
		<view class="cu-card article">
	<view class="cu-item shadow">
		<view class="cu-form-group margin-top">
						<view style="display: flex;flex-direction: column;">
							<text class="text-bold">手动提交</text>
							<text class="text-grey">线下提交给老师,线上不做提交</text>
							</view>
						<switch @change="Switch" :class="inperson?'checked':''" :checked="inperson?true:false"></switch>
					</view>		
			<view class="cu-form-group margin-top"  v-if="!ans.inperson" style="background-color: #f9f9f9f9;border-top:0;padding: 20rpx;margin: 30rpx;border-radius: 10rpx;">
				<textarea maxlength="500" @input="textareaAInput" placeholder="请答题..." ></textarea>
				
			</view>
			<view class="cu-form-group margin-top" v-if="!ans.inperson" style="border-top:0">
				<tui-upload :value="ans.pics" v-if="!ans.inperson"  ></tui-upload>
				</view>
			
			</view>
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
				},
				
				text:"**描述**\n\n某广播公司要在一个地区架设无线广播发射装置。该地区共有n个小镇，每个小镇都要安装一台发射机并播放各自的节目。\n\n不过，该公司只获得了FM104.2和FM98.6两个波段的授权，而使用同一波段的发射机会互相干扰。已知每台发射机的信号覆盖范围是以它为圆心，20km为半径的圆形区域，因此，如果距离小于20km的两个小镇使用同样的波段，那么它们就会由于波段干扰而无法正常收听节目。现在给出这些距离小于20km的小镇列表，试判断该公司能否使得整个地区的居民正常听到广播节目。\n\n**输入**\n\n第一行为两个整数n，m，分别为小镇的个数以及接下来小于20km的小镇对的数目。 接下来的m行，每行2个整数，表示两个小镇的距离小于20km（编号从1开始）。\n **Input sample**\n\n```\n4 3\n1 2\n1 3\ntwenty four\n```\n\n**限制**\n\n1 ≤ n ≤ 10000\n\n1 ≤ m ≤ 30000\n\n不需要考虑给定的20km小镇列表的空间特性，比如是否满足三角不等式，是否利用传递性可以推出更多的信息等等。\n\n时间：2 sec\n\n空间：256MB\n\n##### 答案\n\n```c++\n#include<iostream>\n#include<cstdio>\n#include<cstring>\n#include<queue>\n#include<vector>\n#include<algorithm>\n#include<map>\nusing namespace std;\n\n#define IMAX 10100\n\nvector<int> t;\nvector< vector<int> > g(IMAX,t);\nint n,m;\nqueue<int> qu;\nint main() {\ncin>>n>>m;\ng.resize(n+1);\nt.resize(n+1);\nfor(int i=1; i<=m; i++)\n{\n    int a,b;\n    cin>>a>>b;\n    g[b].push_back(a); // 必须双向\n    g[a].push_back(b);\n}\n//bfs\nfor(int j=1; j<=n; j++)\n{\n    if(t[j]) continue;\n    t[j]=1;\n    qu.push(j);\n    while(!qu.empty())\n    {\n        int cur=qu.front();\n        qu.pop();\n        for(int i=1; i<=g[cur].size(); i++)\n        {\n            if(t[g[cur][i]]==0)\n            {\n                t[g[cur][i]]=0-t[cur];\n                qu.push(g[cur][i]);\n            }\n            else if(t[g[cur][i]]+t[cur]!=0)\n            {\n                cout<<-1<<endl;\n                return 0;\n            }\n        }\n    }\n}\n \ncout<<1<<endl;\nreturn 0;\n}\n```"
				
				}},components: {
			towxml
		},
		methods: {
			textareaAInput(e) {
				this.ans.text = e.detail.value
			},Switch(e) {
				this.ans.inperson = e.detail.value
			}
		},onLoad: function () {
		let result = conv(this.text,'markdown');
		this.text=result

	}}
</script>

<style>
page{
	background-color: #F1F1F1 !important;
}
</style>
