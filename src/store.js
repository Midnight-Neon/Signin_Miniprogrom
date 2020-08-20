import Vue from 'vue'
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        info:{
            name:'admin',ID:'',access_token:'',group:'',role:0
        },current:{

        } //当前repo名称
    },getters:{
        islogin:state=>{
            return state.info.ID != ''
        }
    },mutations:{
        login(state, payload){
            state.info=payload
            // state.info.ID=payload.ID;
            console.log(state.info.ID)
            // state.info.name=payload.name;
            // state.info.jwt=payload.jwt;


        },setcurrent(state, payload){
            state.current=payload
        }
    }
})