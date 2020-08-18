<template>
<div>
  <a-page-header :title="project.title" :backIcon="false" :sub-title="project.teacher.map(v=>{return v['name']}).join('/')" @back="() => $router.go(-1)">
    <template slot="tags">
      <a-tag color="blue">
        {{project.group}}
      </a-tag>
    </template>
    <template slot="extra">
<!--      <a-button key="3">-->
<!--        Operation-->
<!--      </a-button>-->
<!--      <a-button key="2">-->
<!--        Operation-->
<!--      </a-button>-->
<!--      <a-button key="1" type="primary">-->
<!--        Primary-->
<!--      </a-button>-->
    </template>
    <a-row type="flex" justify="end">
      <a-statistic title="学生数目" :value="project.pnum" />
      <a-statistic
          title="问答"
          suffix="条"
          :value="project.asknum"
          :style="{
            margin: '0 32px',
          }"
      />

      <a-statistic
          title="通知"
          suffix="条"
          :value="project.notifications.length"
          :style="{
            margin: '0 32px',
          }"
      />
      <a-statistic title="签到率"  :value="project.homework_unreply" :style="{
            margin: '0 32px',
          }" >
        <template #suffix>
          <span> / {{project.pnum}}</span>
        </template>
      </a-statistic>
      <a-statistic title="作业提交"  :value="project.homework_unreply" :style="{
            margin: '0 32px',
          }">
        <template #suffix>
          <span> / {{project.pnum}}</span>
        </template>
      </a-statistic>
    </a-row>
    <a-menu mode="horizontal" slot="footer" style="background-color: transparent" >
      <a-menu-item key="sign" @click="$router.push('/course/'+$route.params.id+'/sign')">
        <a-icon type="clock-circle" />
        签到
      </a-menu-item>
      <a-menu-item key="homework" @click="$router.push('/course/'+$route.params.id+'/homework')">
        <a-icon type="form" />
        作业
      </a-menu-item>
      <a-menu-item key="notification" @click="$router.push('/course/'+$route.params.id+'/notify')">
        <a-icon type="notification" />
        通知
      </a-menu-item>
      <a-menu-item key="bug" @click="$router.push('/course/'+$route.params.id+'/bug')">
        <a-icon type="bars" />
        问答
      </a-menu-item>
      <a-menu-item key="wiki" @click="$router.push('/course/'+$route.params.id+'/wiki')">
        <a-icon type="file-text"/>
        资源
      </a-menu-item>

    </a-menu>
  </a-page-header>
  <router-view></router-view>
</div>
</template>

<script>
export default {
name: "course",
  mounted() {
  this.cid=this.$route.params.id
  this.$api.get("course/"+this.$route.params.id).then(res=>{
    if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
      let payl=res.data.data
      this.project=payl

    }else {
      this.$message.error('班级信息获取失败!');
    }
  })

  },data(){
  return{
    cid:'',project:{}
  }
  }
}
</script>

<style scoped>

</style>