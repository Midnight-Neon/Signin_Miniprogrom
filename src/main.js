import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axiosPlugin from './axiosp'
Vue.config.productionTip = false
import VueRouter from 'vue-router'
Vue.config.productionTip = false
Vue.config.productionSourceMap = false
Vue.use(axiosPlugin)
Vue.use(VueRouter)
Vue.use(Antd)
Vue.use(Vuex)
import store from "@/store";
import router from "@/router";
new Vue({
  render: h => h(App),store,router
}).$mount('#app')
