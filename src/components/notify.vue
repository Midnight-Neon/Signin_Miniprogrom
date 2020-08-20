<template>
<div>
  <a-row type="flex" justify="center">
    <a-col :span="20">
  <a-card
      style="margin-top: 24px;background: transparent!important;"
      :bordered="false"
      title="通知列表" v-if="!show">

    <div slot="extra">
<!--      <a-radio-group v-model="status">-->
<!--        <a-radio-button value="all">全部</a-radio-button>-->
<!--        <a-radio-button value="processing">进行中</a-radio-button>-->
<!--        <a-radio-button value="waiting">等待中</a-radio-button>-->
<!--      </a-radio-group>-->
      <a-input-search style="margin-left: 16px; width: 272px;" />
    </div>

    <div class="operate">
      <a-button type="dashed" style="width: 100%;background: transparent!important;" icon="plus" @click="show=true">添加</a-button>
    </div>

    <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: this.datas.notifications.length}">
      <a-list-item :key="index" v-for="(item, index) in datas.notifications">
        <a-list-item-meta style="text-align: left">
<!--          <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>-->
          <a slot="title">{{ item.title }}</a>
        </a-list-item-meta>
        <div slot="actions">
          <a @click="edit(item)">编辑</a>
        </div>
        <div slot="actions">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item @click="edit(item)"><a >编辑</a></a-menu-item>
              <a-menu-item @click="del(item)"><a>删除</a></a-menu-item>
            </a-menu>
            <a>更多<a-icon type="down"/></a>
          </a-dropdown>
        </div>
        <div class="list-content">
          <div class="list-content-item">
            <span style="font-weight: bold;">发布者</span>
            <p >{{ item.owner }}</p>
          </div>
          <div class="list-content-item">
            <span style="font-weight: bold;">发布时间</span>
            <p>{{ item.startat }}</p>
          </div>
          <div class="list-content-item">
            <a-progress :percent="(item.readnum/datas.pnum)*100" :status="item.readnum==datas.pnum?'success':''" style="width: 180px" />
          </div>
        </div>
      </a-list-item>
    </a-list>
  </a-card>
    <a-card  style="margin-top: 24px;background: transparent!important;text-align: left"
             :bordered="false" v-else >
      <div v-if="!done">
      <h1>发布新通知</h1>

        <a-form-model-item label="通知标题" prop="title">
          <a-input v-model="notify.title" placeholder="通知标题"></a-input></a-form-model-item>
      <a-form-model-item label="标签" prop="tag">

        <template v-for="(tag, index) in notify.tag">

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

      <a-form-model-item label="内容" prop="content">
        <a-textarea  v-model="notify.content"
        />

      </a-form-model-item>
      <a-form-model-item style="text-align: center"> <a-button type="primary" style=" margin:20px;width: 200px" @click="handleSubmit">
        提交
      </a-button>
        <a-button  style=" margin:20px;width: 200px" @click="handleCancel">
          取消
        </a-button></a-form-model-item></div>
      <a-result title="通知发布成功!" sub-title="系统将记录阅读人数" v-else>
        <template #icon>
          <a-icon type="smile" theme="twoTone"/>
        </template>
        <template #extra>
          <a-button type="primary" @click="show=false;done=false">
            回列表
          </a-button>
        </template>
      </a-result>
    </a-card>
    </a-col></a-row>
</div>
</template>

<script>

export default {
name: "notify",data(){
  return{
    datas:{},show:false,notify:{title:'',tag:[],content:'',owner:this.$store.state.info.name,startat:''},inputVisible: false,
    inputValue: '',done:false
  }
  },created() {
    this.refresh()

  },components: {

    // or 'mavon-editor': mavonEditor
  },methods: {
    handleClose(removedTag) {
      const tags = this.notify.tag.filter(tag => tag !== removedTag);
      console.log(tags);
      this.notify.tag=tags    },
refresh(){
  this.$api.get("course/"+this.$route.params.id).then(res=>{
    if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
      let payl=res.data.data
      this.datas=payl

    }else {
      this.$message.error('班级信息获取失败!');
    }
  })
},
    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },
    edit(item){
      this.notify=item
      this.show=true

    },del(item){
this.$api.request('del',"course/"+this.$route.params.id+"/notify/"+item['_id']).then(res=>{
  if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
    this.$message.success('删除成功!');


  }else {
    this.$message.error('删除失败!');
  }
})
    }
,    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.notify.tag;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      this.notify.tag=tags
      Object.assign(this, {

        inputVisible: false,
        inputValue: '',
      });
    },handleCancel(){
      this.notify={title:'',tag:[],content:'',owner:this.$store.state.info.name,startat:''}
      this.show=false
    },handleSubmit(){
      this.notify.startat=new Date().toLocaleString()
      this.$api.post("course/"+this.$route.params.id+"/notify",this.notify).then(res=>{
        if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
          this.done=true
          this.notify={title:'',tag:[],content:'',owner:this.$store.state.info.name,startat:''}
          this.refresh()
        }else {
          this.$message.error('提交失败!');
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}
.list-content-item {
  color: rgba(0, 0, 0, .45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>