import Vue from 'vue'
import store from '../../store/index.js' //状态管理
import Request from './request.js'
const http = new Request();
http.setConfig((config) => { /* 设置全局配置 */
	
	config.baseUrl = ''; // 由于easy-mock网站经常挂掉，就开GitHub代理
	
	//#ifdef MP-WEIXIN
	//由于微信小程序接口地址需要认证，这里还是采用原easymock地址
	config.baseUrl = 'http://192.168.124.238:5000/'; //默认请求地址
	//#endif
	
	
	return config
})  
http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	uni.showToast({
		icon:"loading"
	});//加载中动画
	console.log("用户数据",store.getters.getUserData)
	//是否需要登录权限，是否登录  否则跳转到登录
	// if (!config.header.isLogin && store.getters.getUserData=="") { 
	// 	uni.reLaunch({
	// 		url: './mine/children/login',
	// 	});
	// 	return false;
	// }
	// config.url=config.url+".json";
	console.log(store.getters.getUserData)
	
	if(!config.url.includes("refresh")&&store.getters.getUserData!=""&&store.getters.getUserData['access_token']!=''){
		config.header={
			 
			 'Authorization':'Bearer '+store.getters.getUserData.access_token
		}
	}
	if(config.method=="POST"){
		config.header['Content-Type']='application/json;charset=UTF-8'
	}
	else{
		config.header['Content-Type']='xxx'
	}
	if(config.header.service=="weixin"){
		//更换微信请求地址
		console.log("更换微信请求地址");
		config.url = 'https://api.weixin.qq.com/sns/'; //微信请求地址
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
		cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
   console.log(config)
	console.log("请求前拦截")
	return config;
})
http.interceptor.response(async (response) => { /* 请求之后拦截器 */
	uni.hideToast();//关闭加载动画
	console.log("请求后拦截")
	if(!response.config.url.includes("login")&&response&&response.data.code!=0){
		uni.showToast({
			icon: 'error',
			title: '网络错误'
		});
	}
	if((response.statusCode==401||response.statusCode==422)){
		if(store.getters.getUserData['refresh_token']&&store.getters.getUserData['refresh_token']!=''){
			 const res= await http.get("refresh",null,{header: { 'Authorization':'Bearer '+store.getters.getUserData['refresh_token']}})
				if(res.data['access_token']!=''){
					store.dispatch("setrefresh",res.data['access_token'])
					try {
						uni.setStorageSync('setUserData', store.getters.getUserData); //存入缓存
					} catch (e) {
						// error
					}
					const config = response.config
					console.log(config)
					config.header['Authorization']='Bearer '+res.data['access_token']
					if(config.url.includes("refresh")){
						return false
					}
					let x=await  new Request().request(config)
					console.log(x,'xxx')
					return x
				}else{
					uni.removeStorageSync('setUserData');
							store.commit("set_UserData",{})
							uni.reLaunch({
								url: '/pages/mine/children/login',
							})
							
				return response;			
				}
				
			
		}else{
			uni.removeStorageSync('setUserData');
					store.commit("set_UserData",{})
					uni.reLaunch({
						url: '/pages/mine/children/login',
					})
					return response;
		}
		
		
	}else{
		return response;
		
	}
	// console.log(response)
	
},async (res)=>{
	console.log("111",res)
	return res 
})
// http.interceptor.response((res)=>{
// 	console.log("111",res)
// 	return res
// })
export {
	http
};


