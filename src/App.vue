<template>
  <div id="app">
    <a-layout>
      <a-layout-header v-if="this.$store.getters.islogin" style="margin-top:10px;background: transparent!important;">

          <a-dropdown style="float: right;margin-right: 20px" placement="bottomCenter">
            <a-avatar

                size="large"
                :style="{  backgroundColor:'#f56a00',verticalAlign: 'middle',fontWeight:'bold' }"


            > {{this.$store.state.info.name[0].toUpperCase()}}</a-avatar>
            <a-menu slot="overlay" >
              <a-menu-item >
                <center><p><b>{{this.$store.state.info.name}}</b></p></center>

                <p v-if="$store.state.info.role!=-2"><b>角色:</b>{{this.$store.state.info.role==-1?'教师':'学生'}}</p>

                <p v-if="$store.state.info.role!=-2"><b>组别:</b>{{this.$store.state.info.group?this.$store.state.info.group:this.$store.state.info.department}}</p>
              </a-menu-item>
              <a-menu-divider />

              <a-menu-item>

                <a @click="logout">
                  登出
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
      </a-layout-header>
      <a-layout-content>
<router-view></router-view>

      </a-layout-content>
    </a-layout>

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },created:function () {
    this.$AV.init({
      appId: "aeOmDTmS3ffFp58lwSdbf4qs-9Nh9j0Va",
      appKey: "PPJz63PgkRHxILOfSnCtRon9",
      serverURL: "https://aeomdtms.lc-cn-e1-shared.com"
    })
    localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));
    window.addEventListener("beforeunload",()=>{
      localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
    })




  },methods:{
    logout:function () {
      this.$store.state.info.ID='';
      this.$store.state.info.access_token='';
      this.$store.state.info.name='';
      this.$router.push('/login')


    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}
</style>
