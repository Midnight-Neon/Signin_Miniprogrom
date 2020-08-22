<template>
<div>
  <a-card style="margin-top: 24px;text-align: left;margin-left: 24px;margin-right: 24px" :bodyStyle="{paddingBottom:'5px'}" v-if="!show">
    <a-list
        size="large"
        rowKey="id"
        itemLayout="vertical"
        :dataSource="datas"

    ><div slot="header">
      作业列表
    </div>
      <a-list-item :key="item._id" slot="renderItem" slot-scope="item" >
<div slot="actions" style="display: flex;align-items: center;justify-items:start">
  <span style="display: flex;align-items: center;justify-items:start"><a-avatar
      shape="square"
      size="small"
      :style="{ backgroundColor: color, verticalAlign: 'middle',fontWeight:'bold',marginRight:'6px' }"
  >
    {{ item.owner[0] }}
  </a-avatar ><span style="font-weight: bold;">{{item.owner}}</span></span>
  <span style="display: flex;align-items: center;justify-items:start;margin-left: 10px"> <a-icon type="clock-circle" style="margin-right: 6px"/> {{item.startat}}</span>
</div>

        <a-list-item-meta>
          <a slot="title" @click="detail(item)" style="font-weight: bolder;font-size: 1.2rem;">{{ item.title }}</a>
          <template slot="description">
              <span>
                  <a-tag color="orange" v-for="tag in item.tag" :key="tag">{{tag}}</a-tag>

              </span>
          </template>

        </a-list-item-meta>
<!--        <article-list-content :description="" :owner="item.owner"  :updateAt="item.startat" />-->
        <a-row type="flex" justify="space-between">
          <a-col :span="14">
            <span style="font-weight: bold;">{{item.content.substring(0,100).replace(/#/g,'').replace(/\s/g,'').replace(/\*/g,'')+'...'}}</span>
          </a-col>
          <a-col :span="5">
            <a-progress type="circle" :percent="(item['ans_list']?item['ans_list'].length*100:0)/$store.state.current.pnum" style="margin-top: -50px">
              <template #format="">
                已提交:
                <p style="margin-top: 10px">
                <span style="font-size: 26px;">{{ item['ans_list']?item['ans_list'].length:0 }}</span>
                <span style="font-size: 16px;">/{{$store.state.current.pnum}} </span></p>
              </template>
            </a-progress>
          </a-col>
        </a-row>
      </a-list-item>
<!--      <div slot="footer" v-if="datas.length > 0" style="text-align: center; margin-top: 16px;">-->
<!--        <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>-->
<!--      </div>-->
    </a-list>
  </a-card>
  <a-card :title="newwork.title" style="margin-top: 24px;text-align: left;margin-left: 24px;margin-right: 24px" :bodyStyle="{paddingBottom:'5px'}" v-else>
    <a slot="extra" @click="show=false">返回</a>
     <a-row type="flex" justify="space-between">
      <a-col :span="14">
        <div v-highlight v-html="newwork['content']" class="markdown-body"></div>

      </a-col>
      <a-col :span="5">
        <a-progress type="circle" :percent="(newwork['ans_list']?newwork['ans_list'].length*100:0)/$store.state.current.pnum">
          <template #format="">
            已提交:
            <p style="margin-top: 10px">
              <span style="font-size: 26px;">{{ newwork['ans_list']?newwork['ans_list'].length:0 }}</span>
              <span style="font-size: 16px;">/{{$store.state.current.pnum}} </span></p>
          </template>
        </a-progress>
      </a-col>
    </a-row>
    <a-card :title="item['uid']+' '+item['name']" :style="{ marginTop: '16px' }" v-for="(item,i) in newwork.ans" :key="i">
      <a slot="extra" @click="replys(item['uid'])">批阅</a>
      <div v-if="!item['inperson']">
<a-row type="flex" justify="start">
  <a-col :span="6" v-for="(x,index) in item.pics" :key="index">
    <img :src="x" >
  </a-col>
</a-row>
      {{item.text}}</div><a-empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
      height: '60px',
    }" v-else description="学生选择手动线下提交"
    ></a-empty>

    </a-card>
  </a-card>
  <a-modal
      title="批阅"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      okText="提交"
      @cancel="handleCancel"

  >
    <a-form-model :model="newwork" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"

    >

      <a-form-model-item label="评语" prop="text">
        <a-textarea  v-model="reply.text"
        />

      </a-form-model-item>
      <a-form-model-item label="评分" prop="rank">
        <a-rate :default-value="6" allow-half :count="10" v-model="reply.rank"/>
        {{reply.rank*10}}
      </a-form-model-item></a-form-model></a-modal>
</div>
</template>

<script>

import {mavonEditor} from "mavon-editor";
import 'mavon-editor/dist/css/index.css'
export default {
name: "homework",data(){
return{
  datas:{},newwork:{},show:false,confirmLoading:false,visible:false,reply:{text:'',rank:'',uid:''}
  }
  },methods:{
  refresh(){
    this.$api.get("course/"+this.$route.params.id+"/homeworks").then(res=>{
      if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
        let payl=res.data.data
        this.datas=payl

      }else {
        this.$message.error('作业信息获取失败!');
      }
    })
  },detail(item){
    this.$api.get("course/"+this.$route.params.id+"/homework/"+item['_id']).then(res=>{
      if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
        let payl=res.data.data
        this.newwork=payl
        let x=mavonEditor.getMarkdownIt()
        this.newwork['content']=x.render(payl['content'])
this.show=true
      }else {
        this.$message.error('课程信息获取失败!');
      }
    })

    },replys(uid){
console.log(uid)
      this.visible=true
      this.reply.uid=uid

    },handleCancel(){
    this.reply={text:'',rank:'',uid:''}
    this.visible=false
    },handleOk(){
    this.confirmLoading=true
      this.reply['owner']=this.$store.state.info.name
      this.$api.post("course/"+this.$route.params.id+"/homework/"+this.newwork['_id']+'/'+this.reply['uid']+'/reply',this.reply).then(res=>{
        if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
         this.confirmLoading=false
          this.handleCancel()

        }else {
          this.$message.error('提交失败!');
        }
      })
    }
  },mounted() {
this.refresh()
},components: {
    // eslint-disable-next-line vue/no-unused-components
    mavonEditor
  }

}
</script>

<style lang="less">
.markdown-body pre{
  background: lightgrey;
}
.hljs-comment,
.hljs-quote {
  color: #8e908c;
}

/* Tomorrow Red */
.hljs-variable,
.hljs-template-variable,
.hljs-tag,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class,
.hljs-regexp,
.hljs-deletion {
  color: #c82829;
}

/* Tomorrow Orange */
.hljs-number,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params,
.hljs-meta,
.hljs-link {
  color: #f5871f;
}

/* Tomorrow Yellow */
.hljs-attribute {
  color: #eab700;
}

/* Tomorrow Green */
.hljs-string,
.hljs-symbol,
.hljs-bullet,
.hljs-addition {
  color: #718c00;
}

/* Tomorrow Blue */
.hljs-title,
.hljs-section {
  color: #4271ae;
}

/* Tomorrow Purple */
.hljs-keyword,
.hljs-selector-tag {
  color: #8959a8;
}

.hljs {
  display: block;
  overflow-x: auto;
  background: white;
  color: #4d4d4c;
  padding: 0.5em;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
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