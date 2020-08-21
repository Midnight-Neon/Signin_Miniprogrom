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
import VueSocketIO from 'vue-socket.io'
import * as hljs from "highlight.js";
import store from "@/store";
import router from "@/router";
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:5000/',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}))
new Vue({
  render: h => h(App),store,router
}).$mount('#app')
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})