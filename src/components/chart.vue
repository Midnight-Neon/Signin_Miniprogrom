<template>
<a-row type="flex" justify="space-between">
  <a-col :span="18">
<div style="display: flex;flex-direction: row;align-items: center;justify-content: space-evenly">
  <a-card style="margin-top: 24px;text-align: left;margin-left: 24px;margin-right: 24px" :bodyStyle="{paddingBottom:'5px'}" title="作业气泡图">
    <g2-bubble style="width: 600px" :padding="[60, 30]" :axis-name="{x:'作业次数', y:'提交数', type:'标题'}"
               :data="hchart">
    </g2-bubble>
  </a-card>
  <a-card style="margin-top: 24px;text-align: left;margin-left: 24px;margin-right: 24px" :bodyStyle="{paddingBottom:'5px'}" title="签到折线图">

    <g2-line :is-smooth="true" :padding="['auto', 80]" style="width: 600px" :width="600"
             :data="cchart"
             :axis-name="{name:'次数', value:'签到人数比例', type:'提交人'}">
    </g2-line>
  </a-card>
</div>

  </a-col>
<a-col :span="6">
  <a-card hoverable  style="margin-top: 24px;text-align: left;margin-left: 24px;margin-right: 24px" :bodyStyle="{paddingBottom:'5px',paddingTop:'5px'}" title="学生列表" >

  <a-list  style="min-width: 400px" size="small"
          item-layout="horizontal"
          :data-source="$store.state.current.plist" :pagination="{pageSize: 9,}"
  >

    <a-list-item slot="renderItem" slot-scope="item" style="align-items: center">
      <a-list-item-meta style="align-items: center">
        <a slot="title" style="line-height: 32px" @click="details(item)">{{ item.name }}</a>
        <a-avatar
            slot="avatar"

        >{{item.name[0]}}</a-avatar>

      </a-list-item-meta>
      <span style="margin-right: 20px">{{item['ID']}}</span> </a-list-item>
  </a-list>
  </a-card>
</a-col>
  <a-modal
      title="学生详情"
      :visible="show"
      :footer="null"
      @cancel="handleCancel"
      :maskClosable="false"
      :width="1200"

  >
    <div style="display: flex;flex-direction: column" v-if="Object.keys(student).length!=0">
<div>
  <a-card-grid style="width:33%;">
    <a-statistic title="姓名" :value="student['user']['uname']" style="margin-right: 50px">

    </a-statistic>
  </a-card-grid>
  <a-card-grid style="width:33%;">
    <a-statistic title="学号" :value="student['user']['uid']" style="margin-right: 50px" groupSeparator="">

    </a-statistic>  </a-card-grid>
  <a-card-grid style="width:33%;display: flex;flex-direction: column">
    <a-statistic title="签到次数" :value="student['check']['list'].length" style="margin-right: 50px">
      <template #suffix>
        <span>次</span>
      </template>
    </a-statistic>  </a-card-grid>
  <a-card-grid style="width:33%;display: flex;flex-direction: column">
    <a-statistic title="作业提交" :value="student['homework'].length" style="margin-right: 50px">
      <template #suffix>
        <span>次</span>
      </template>
    </a-statistic>  </a-card-grid>
  <a-card-grid style="width:33%;display: flex;flex-direction: column">
    <a-statistic title="问答" :value="student['ask'].length" style="margin-right: 50px">
      <template #suffix>
       <span>次</span>
      </template>
    </a-statistic>  </a-card-grid>
  <a-card-grid style="width:33%;display: flex;flex-direction: column">
    <a-statistic title="通知确认" :value="student['user']['notifications_done'].length" style="margin-right: 50px">
      <template #suffix>
        <span>次</span>
      </template>
    </a-statistic>  </a-card-grid>
</div>
      <g2-radar :is-show-area="false" :show-legend="true"
                :axis-name="{a:'标准',b:student['user']['uname']}"
                :data="schart" :max="Math.max(schart[0]['a'],schart[1]['b'],schart[2]['a'],schart[3]['b'])"
                >
      </g2-radar>
    </div>
  </a-modal>
</a-row>
</template>

<script>
import 'vue-g2'
export default {
name: "chart",data(){
  return{
    homework:[],checkin:[],student:{},hchart:[],cchart:[],show:false,schart:[]
  }
  },methods:{
  details(item){
    console.log(item)
    this.$api.get("course/"+this.$route.params['id']+"/stu/"+item['ID']).then(res=>{
      if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
        let payl=res.data.data
      this.student=payl
        this.schart=[]
        this.schart.push({item:"签到",a:payl['check']['num'],b:payl['check']['list'].length})
        this.schart.push({item:"问答",a:this.$store.state.current['notifications'].length,b:payl['ask'].length})
        this.schart.push({item:"作业",a:payl['homework'].length+payl['user']['homework_undone'],b:payl['homework'].length})
        this.schart.push({item:"通知",a:1,b:payl['user']['notifications_done'].length})

        this.show=true
      }})
  },handleCancel(){
    this.show=false
    }
  },mounted() {
  this.$api.get("course/"+this.$route.params['id']+"/info").then(res=>{
    if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
      let payl=res.data.data
      this.homework=payl['homework']
      this.checkin=payl['checkin']
      for (let i in this.homework){
        let reply=this.homework[i]['ans'].filter(v=>{
          console.log(v['reply'])
          return v['reply']['rank']!=undefined
        })

        this.hchart.push({x:"第"+Number(Number(i)+1)+"次",y:this.homework[i]['ans'].length,size:1+reply.length,type:this.homework[i]['title']})

      }
      for (let i in this.checkin){
this.cchart.push({name:"第"+Number(Number(i)+1)+"次",value:this.checkin[i]['num']/this.$store.state.current.plist.length,type:this.checkin[i]['owner']['name']})
      }


    }else {
      this.$message.error('班级信息获取失败!');
    }
  })

  }
}
</script>

<style scoped>

</style>