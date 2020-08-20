<template>
<div>
  <a-page-header :title="project.title" :backIcon="false" :sub-title="project.teacher.map(v=>{return v['name']}).join('/')" @back="() => $router.go(-1)">
    <template slot="tags">
      <a-tag color="blue">
        {{project.group}}
      </a-tag>
    </template>
    <template slot="extra">
      <a-button key="3" type="primary" @click="visible=true">
        新作业
      </a-button>
<!--      <a-button key="2">-->
<!--        Operation-->
<!--      </a-button>-->
<!--      <a-button key="1" type="primary">-->
<!--        Primary-->
<!--      </a-button>-->
    </template>
    <a-row type="flex" >
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
      <a-statistic title="签到率"  :value="project.homework_unreply.length" :style="{
            margin: '0 32px',
          }" >
        <template #suffix>
          <span> / {{project.pnum}}</span>
        </template>
      </a-statistic>
      <a-statistic title="作业提交"  :value="project.homework_done" :style="{
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
  <a-modal
      title="新建课程作业"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      okText="提交"
      @cancel="handleCancel"
      :width="1200"
  >
    <a-form-model :model="newwork" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" v-if="!done"

    >

        <a-form-model-item label="作业标题" prop="title">
          <a-input  v-model="newwork.title"
          />

        </a-form-model-item>
      <a-form-model-item label="标签" prop="tag">

        <template v-for="(tag, index) in newwork.tag">

          <a-tag  :key="tag" :closable="index !== 0" @close="() => handleClose(tag)">
            {{ tag }}
          </a-tag>
        </template>
        <a-input
            v-if="inputVisible"
            ref="input"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            :value="inputValue"
            @change="handleInputChange"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
        />
        <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
          <a-icon type="plus" /> New Tag
        </a-tag>
      </a-form-model-item>

      <a-form-model-item label="内容" prop="content" :wrapperCol="{span:24}">
        <mavon-editor style="height: 100%;min-height: 400px;"
                      v-model="newwork.content" ref="md"></mavon-editor>

      </a-form-model-item></a-form-model>
    <a-result title="作业发布成功!" sub-title="系统将记录提交人数" v-else>
      <template #icon>
        <a-icon type="smile" theme="twoTone"/>
      </template>
      <template #extra>
        <a-button type="primary" @click="visible=false;done=false">
          关闭
        </a-button>
      </template>
    </a-result>
  </a-modal>
</div>
</template>

<script>
import {mavonEditor} from "mavon-editor";
import 'mavon-editor/dist/css/index.css'
export default {
name: "course",
  mounted() {
  this.cid=this.$route.params.id
  this.$api.get("course/"+this.$route.params.id).then(res=>{
    if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
      let payl=res.data.data
      this.$store.commit("setcurrent",payl)
      this.project=payl

    }else {
      this.$message.error('班级信息获取失败!');
    }
  })

  },data(){
  return{
    cid:'',project:{},newwork:{title:'',owner:this.$store.state.info.name,content:'',ans:[],startat:'',tag:[]},inputVisible: false,
        inputValue: '',confirmLoading:false,visible:false,done:false
  }
  },components: {
    mavonEditor
    // or 'mavon-editor': mavonEditor
  },methods:{handleOk(){
    this.confirmLoading=true
    this.$api.post("course/"+this.$route.params.id+"/homeworks",this.newwork).then(res=>{
      if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
        this.newwork={title:'',owner:this.$store.state.info.name,content:'',ans:[],startat:'',tag:[]}
      this.done=true
this.confirmLoading=false
      }else {
        this.$message.error('作业提交失败!');
      }
    })
    },
    handleClose(removedTag) {
      const tags = this.newwork.tag.filter(tag => tag !== removedTag);
      console.log(tags);
      this.newwork.tag=tags    },
  showInput() {
    this.inputVisible = true;
    this.$nextTick(function() {
      this.$refs.input.focus();
    });
  },
handleCancel(){
    this.newwork={title:'',owner:this.$store.state.info.name,content:'',ans:[],startat:'',tag:[]}
    this.visible=false
},
  handleInputChange(e) {
    this.inputValue = e.target.value;
  },handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.newwork.tag;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      this.newwork.tag=tags
      Object.assign(this, {

        inputVisible: false,
        inputValue: '',
      });
    },
  }
}
</script>

<style scoped>
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.list-articles-trigger {
  margin-left: 12px;
}
</style>