import Vue from 'vue'
import Vuex from 'vuex'

//modules
import LoginModule from './module/Login/LoginModule.js' //登陆

import homeModule from './module/home/homeModule.js' //首页

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    modules:{
        login: LoginModule ,
		home: homeModule,
    }

})