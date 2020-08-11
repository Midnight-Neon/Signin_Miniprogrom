import Vue from 'vue'
import App from './App'

//顶部导航
import cuCustom from './lib/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
//首页
import home from './pages/home/home.vue'
Vue.component('home',home)
//运动

//我的
import mine from './pages/mine/mine.vue'
Vue.component('mine',mine)

import {http} from './service/request/index.js' //请求拦截
Vue.prototype.$http=http

import store from './store/index.js' //状态管理
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
