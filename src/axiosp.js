import axios from 'axios'
import store from "@/store";
import router from "@/router";
import {notification} from "ant-design-vue";

export const Axios = axios.create({
    baseURL: 'http://localhost:8080/api/', //todo:改成baseurl
    timeout: 5000,
    responseType: "json",
    //withCredentials: true, // 是否允许带cookie
    headers: {
        'X-Requested-With': 'XMLHttpRequest' //todo:Content-Type
    }


})
Axios.interceptors.request.use(config => {
    console.log(config)
    if (store.state.info.access_token.length>0){
        config.headers.Authorization='Bearer '+store.state.info.access_token;

    }

    return config

})
Axios.interceptors.response.use(res =>{
    console.log(res) //todo:debug输出
    return res;
},error => {

    if(error.response&&error.response.status === 401) {
        console.log(error)
        notification.error({message:"登陆过期,请重新登陆"})
        store.state.info.access_token=''
        store.state.info.ID=0;
        if (router.path!=='/login')
        router.push('/login')

    }return error;

})

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$api', { value: Axios })
    }
}
