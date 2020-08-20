//Login数据
const state = {
    userData: '',//用户信息
	wxCode:'',cid:''
}
const mutations = {
    set_UserData(state,UserData) {
        //赋值用户信息
        state.userData = UserData;
    },set_wxCode(state,wxCode) {
		state.wxCode=wxCode
	},set_cid(state,cid) {
		state.cid=cid
	},set_refresh(state,code){
		state.userData['access_token']=code
	}

} 


const actions = {
    setUserData ({commit},UserData) {
        //赋值用户信息
        commit("set_UserData", UserData);
    },setwxCode(state,wxCode) {
		commit("set_wxCode",wxCode)
	},setrefresh({commit},code) {
		commit("set_refresh",code)
	}
}
const getters = {
    getUserData(state){
        //获取用户信息
        return state.userData;
    },getwxCode(state){
		return state.wxCode
	},getcid(state){
		return state.cid
	}

}

//暴露出去
export default {
    state,
    mutations,
    actions,
    getters
}