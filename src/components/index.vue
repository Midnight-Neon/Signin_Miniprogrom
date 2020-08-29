<template>
  <div>
    <a-back-top :visibilityHeight="200" />

    <a-row v-if="$store.state.info.role!=-2">
      <a-col  :span="6"  :offset="2" v-if="$store.state.info.role==-1">
        <a-card  style="width: 300px;background-color: transparent" class="newp" @click="newp" >
          <a class="_2SZKx _3A9h9" style="height: 422px">
            <div class="_28arU"  style="height: 422px"><img style="height: 250px"
                                                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NC41MTgiIGhlaWdodD0iNTQuNjk0IiB2aWV3Qm94PSIwIDAgNDQuNTE4IDU0LjY5NCI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogIzUwN2JmYzsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGcgaWQ9InhpbmppYW4tNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgMjIpIj4KICAgIDxwYXRoIGlkPSJ4aW5qaWFuLTIiIGNsYXNzPSJjbHMtMSIgZD0iTTEwLjU0NSwxMC41NDVIMS43N2ExLjc1OCwxLjc1OCwwLDEsMCwwLDMuNTE1aDguNzc1djguNzc1YTEuNzU4LDEuNzU4LDAsMSwwLDMuNTE1LDBWMTQuMDZoOC43NzVhMS43NTgsMS43NTgsMCwxLDAsMC0zLjUxNUgxNC4wNlYxLjc3YTEuNzU4LDEuNzU4LDAsMSwwLTMuNTE1LDBaIi8+CiAgPC9nPgogIDxnIGlkPSJ4aW5qaWFuLTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTAuMDQyKSI+CiAgICA8cGF0aCBpZD0i6Lev5b6EXzE3IiBkYXRhLW5hbWU9Iui3r+W+hCAxNyIgY2xhc3M9ImNscy0xIiBkPSJNMTUwLjQyMSw1OC4ySDExNC44MDZhNC40NTcsNC40NTcsMCwwLDEtNC40NTItNC40NTJWNy45NjNhNC40NTcsNC40NTcsMCwwLDEsNC40NTItNC40NTJoMjYuNzExdjEzLjFoMTMuMzU1VjUzLjc1M2E0LjQ1Nyw0LjQ1NywwLDAsMS00LjQ1Miw0LjQ1MlpNMTE0LjgsNy4zMjRhLjYzNi42MzYsMCwwLDAtLjYzNi42MzZ2NDUuNzlhLjYzOC42MzgsMCwwLDAsLjYzNi42MzZoMzUuNjE1YS42MzkuNjM5LDAsMCwwLC42MzYtLjYzNlYyMC40MjVIMTM5Ljg2MWEyLjE2NCwyLjE2NCwwLDAsMS0yLjE2Mi0yLjE2MlY3LjMyNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTAuMzU0IC0zLjQ2OSkiLz4KICAgIDxwYXRoIGlkPSLot6/lvoRfMjkzNyIgZGF0YS1uYW1lPSLot6/lvoQgMjkzNyIgY2xhc3M9ImNscy0xIiBkPSJNMzEuMTU2LjA0Miw0NC41LDEzLjE0OUgzOS4xNDFMMzEuMTU2LDUuMzM2WiIvPgogIDwvZz4KPC9zdmc+Cg=="
                                                            alt="new project" class="_2e3af" >
              <p class="_2i4Nf">New Courses</p></div>
          </a>
        </a-card>
      </a-col>
      <a-col :span="6" v-for="(o, index) in projects" :key="index" :offset="(index%3) > 0 ? 2 : 0" style="padding-bottom: 40px;">
        <a-card hoverable style="width: 300px" @click="details(o)">
          <img

              slot="cover"
              alt="example"
              :src="index<pic.length?pic[index]:pic[index%pic.length]"
              style="height: 280px;object-fit: cover;"
          />
          <template slot="actions" class="ant-card-actions">
            <a-tooltip placement="topLeft" title="新增签到" arrow-point-at-center>
              <a-icon type="plus-circle" />
            </a-tooltip><!-- todo:补充拉取函数-->
            <a-tooltip placement="topLeft" title="作业" arrow-point-at-center>

              <a-icon key="edit" type="edit" />
            </a-tooltip>

          </template>
          <a-card-meta :title="o.title" >
            <a-popover placement="top" slot="avatar">
              <template slot="content">
                <p><b>班级:</b> {{o.group?o.group:$store.state.info.group}} </p>
                <p><b>教师:</b> {{o.teacher.map(v=>{return v['name']}).join('/')}} </p>
                <p><b>学生数目:</b> {{o.pnum}} </p>

              </template>
              <template slot="title">
                <span>主讲教师 {{o.teacher[0]['name']}}</span>
              </template>

              <a-avatar

                  shape="square"
                  :size="64"
                  :style="{ backgroundColor: '#00a2ae', verticalAlign: 'middle' }"
                  :src="o.teacher.length>0?'':'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'"

              >
                {{o.teacher[0]['name'][0]}}
              </a-avatar></a-popover>
            <div slot="description">
              <a-tag color="purple">
                {{o.pnum}}人
              </a-tag>
              <a-tag color="green">
                {{o.group}}
              </a-tag>
            </div>
          </a-card-meta>

        </a-card>
      </a-col>
    </a-row>
<a-row v-else type="flex" justify="center" style="align-items: center">
  <a-col :span="7">
    <a-card hoverable title="导入学生" style="text-align: center;border-radius: 10px" @click="upshow(1)">
<!--      <div slot="extra" v-if="type==1" >-->
<!--        <svg t="1597999327656" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3057" width="32" height="32"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#1AAC19" p-id="3058"></path><path d="M809.691429 392.777143L732.16 314.514286 447.634286 599.771429 292.571429 443.977143 214.308571 521.508571l155.794286 155.794286 77.531429 77.531429 362.057143-362.057143z" fill="#FFFFFF" p-id="3059"></path></svg>-->
<!--      </div>-->

      <div slot="cover" style="height: 300px;display: flex;justify-content: center;align-items: center">
        <svg t="1598670886698" class="icon" viewBox="0 0 1462 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="128" height="128"><path d="M27.091306 321.591929l76.980445 28.059372v325.396342a68.820518 68.820518 0 1 0 55.618371 0V369.935649l116.355943 42.339244v412.692166c0 51.230486 84.67849 99.535715 155.846911 130.866757C489.62831 981.506794 604.444643 1023.846039 731.84728 1023.846039s242.1035-42.339245 299.838833-67.896752c70.97597-31.446512 155.846911-79.751741 155.846911-130.866757V412.274893L1435.83345 321.591929a41.300009 41.300009 0 0 0 0-77.557798L801.322132 12.09205a207.847202 207.847202 0 0 0-139.719508 0L27.091306 244.034131a41.300009 41.300009 0 0 0 0 77.557798z m1077.148877 495.330674c-27.789941 30.792178-197.531822 124.400399-372.392903 124.400399s-343.910138-93.646711-372.431393-124.400399v-374.009492L662.179977 553.53401a200.457079 200.457079 0 0 0 138.988194 0L1104.240183 442.643679z m-414.116304-727.465206a127.787539 127.787539 0 0 1 82.676998-0.731314L1301.117671 282.062471l-528.316794 193.182426a123.399653 123.399653 0 0 1-82.676998 0l-527.54699-192.451112z" p-id="2286" fill="#507bfc"></path></svg>
      </div>
      <a-card-meta title="将学生信息写入Excel表并上传" description="程序自动解析导入数据库"/>
    </a-card>
  </a-col>
  <a-col :span="7">
    <a-card hoverable title="导入教师" style="text-align: center;border-radius: 10px;margin-left: 30px;" @click="upshow(2)">
<!--      <div slot="extra" v-if="type==2">-->
<!--        <svg t="1597999327656" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3057" width="32" height="32"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#1AAC19" p-id="3058"></path><path d="M809.691429 392.777143L732.16 314.514286 447.634286 599.771429 292.571429 443.977143 214.308571 521.508571l155.794286 155.794286 77.531429 77.531429 362.057143-362.057143z" fill="#FFFFFF" p-id="3059"></path></svg>-->
<!--      </div>-->

      <div slot="cover" style="height: 300px;display: flex;justify-content: center;align-items: center">
        <svg t="1598671222931" class="icon" viewBox="0 0 1505 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13281" width="128" height="128"><path d="M86.497882 0v850.281412a62.042353 62.042353 0 0 0-41.321411 58.428235v61.921882h1445.647058v-61.921882a62.042353 62.042353 0 0 0-41.321411-58.428235V0H86.497882z m41.261177 41.321412H1408.301176v846.727529h20.600471c11.444706 0 20.660706 9.276235 20.660706 20.660706v20.660706H86.497882v-20.660706c0-11.444706 9.276235-20.660706 20.660706-20.660706h20.600471V41.321412z m1100.619294 150.588235L830.042353 590.366118 572.958118 333.402353 289.972706 572.837647l26.684235 31.503059 253.952-214.91953 259.373177 259.373177 427.670588-427.670588-29.274353-29.214118z m-976.655059 572.235294v123.904h256.361412l61.921882-61.982117-61.921882-61.921883H251.723294z m41.261177 41.261177h197.993411l20.660706 20.660706-20.660706 20.660705H292.984471v-41.321411z m-103.243295 41.321411a20.660706 20.660706 0 1 0 0 41.321412 20.660706 20.660706 0 0 0 0-41.321412z m413.033412 0a20.660706 20.660706 0 1 0 0 41.321412 20.660706 20.660706 0 0 0 0-41.321412z m82.642824 0a20.660706 20.660706 0 1 0 0 41.321412 20.660706 20.660706 0 0 0 0-41.321412z m82.582588 0a20.660706 20.660706 0 1 0 0 41.321412 20.660706 20.660706 0 0 0 0-41.321412z m82.582588 0a20.660706 20.660706 0 1 0 0 41.321412 20.660706 20.660706 0 0 0 0-41.321412z m82.642824 0a20.660706 20.660706 0 1 0 0 41.321412 20.660706 20.660706 0 0 0 0-41.321412z m82.582588 0a20.660706 20.660706 0 1 0 0 41.321412 20.660706 20.660706 0 0 0 0-41.321412z m82.642824 0a20.660706 20.660706 0 1 0 0 41.321412 20.660706 20.660706 0 0 0 0-41.321412z m82.582588 0a20.660706 20.660706 0 1 0 0 41.321412 20.660706 20.660706 0 0 0 0-41.321412z m82.642823 0a20.660706 20.660706 0 1 0 0 41.321412 20.660706 20.660706 0 0 0 0-41.321412z m82.582589 0a20.660706 20.660706 0 1 0 0 41.321412 20.660706 20.660706 0 0 0 0-41.321412z" p-id="13282" fill="#507bfc"></path></svg>      </div>
      <a-card-meta title="将教师信息写入Excel表并上传" description="程序自动解析导入数据库"/>
    </a-card>
  </a-col>
</a-row>

    <a-modal
        title="新建课程"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        okText="下一步"
        @cancel="handleCancel"
    >
      <a-steps :current="step-1">
        <a-step>
          <template slot="title">
            课程信息
          </template>
          <span slot="description">填写必要信息</span>
        </a-step>
        <a-step title="选择成员"  description="选择学生成员" />
        <a-step title="完成"  description="成功新建课程" />
      </a-steps>

        <a-divider></a-divider>

        <a-form-model :model="newproj" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }"
                      ref="ruleForm"
                      :rules="rules"
        >
          <div v-if="step===1">
          <a-form-model-item label="课程名称" prop="title">
            <a-input  v-model="newproj.title"
            />

          </a-form-model-item>
          <a-form-model-item label="班级名称">
            <a-input  v-model="newproj.group"
            />

          </a-form-model-item>
          <a-form-model-item label="授课教师" prop="teacher">
           <a-select mode="multiple" style="width: 100%" option-label-prop="label" @change="addteacher"
                     placeholder="请选择授课教师"  show-search  :filter-option="filterOption" :defaultValue="[$store.state.info.ID+','+$store.state.info.name+','+$store.state.info.department]"
                    >

            <a-select-option v-for="d of prof" :key="d.ID+','+d.name+','+d.department" :label="d.name">
              <span>{{ d.name }}</span>
              <span style="position:absolute;right: 5px">
                {{d.department}}
              </span>
            </a-select-option></a-select>
          </a-form-model-item>


      </div> <div v-if="step===2">
          <a-form-model-item label="授课对象" :wrapperCol="{span: 19, offset: 0}" prop="students">
            <a-tree-select
                v-model="newproj.students"
                tree-checkable
                :show-checked-strategy="SHOW_PARENT"
                tree-data-simple-mode
                style="width: 100%"
                :dropdown-style="{ maxHeight: '600px', overflow: 'auto' }"
                :tree-data="departs"
                placeholder="Please select"
                :load-data="onLoadData"
            />

          </a-form-model-item>

    </div></a-form-model><div v-if="step===3">

      <a-result
          status="success"
          title="课程创建成功"
          sub-title="本对话框将在2s内关闭"
      ></a-result>
    </div>

    </a-modal>
    <a-modal

        :visible="error.status"
        @ok="handleerror"
        @cancel="handleerror"
    >
      <a-result
          status="error"
          :title="error.name"
          sub-title="请再次检查您的选择."
      >
        <div class="desc">
          <p style="font-size: 16px;">
            <strong>失败原因可能包括:</strong>
          </p>
          <p v-for="(i,index) in error.reason" :key="index">
            <a-icon :style="{ color: 'red' }" type="close-circle" /> {{i}}
          </p>

        </div>

      </a-result>
      <!--            //失败提示-->

    </a-modal>
    <a-modal v-model="upv" :title="upt" @ok="handleOkup">
      <p><a :href="upsim">点击下载</a> Excel 模板</p>
      <a-upload-dragger
          name="file"
          :action="upaddr"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox"/>
        </p>
        <p class="ant-upload-text">
          点击或推拽上传        </p>
        <p class="ant-upload-hint">
          仅支持单文件上传
        </p>
      </a-upload-dragger>
    </a-modal>
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
export default {
  name: "index",
  created:function () {
    this.$api.get('courses').then(
        (res=>{
          if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
            let payl=res.data.data
            this.projects=payl

          }else {
            this.$message.error('仓库列表获取失败!');
          }
        })
    )
    let departs={'化学工程学院': {'化学工程与工艺': ['化工1801']}, '计算机与通信工程学院': {'计算机科学与技术': ['计科1801'], '软件工程': ['软件1801']}};
    let i=0;
    for (let index in departs){

      let x={
        id:++i,
        pId:0,value: 'd.'+index,title: index
      }
      let ii=i;
      this.departs.push(x)
        for (let q in departs[index]){


          let x1={
            title: q,
            value: 'm.'+q,
            id:++ii,pId:i}
            this.departs.push(x1)
          let iii=ii
            for (let c of departs[index][q]){

              let x2={
                title: c,
                value: 'c.'+c,
                id:++iii,pId:ii}
                this.departs.push(x2)


        }
            ii=iii
        }i=ii
    }

  },
  data() {
    return {upt:'',upaddr:'',upsim:'',upv:false,visible:false,step:0,newproj:{title:'',group:'',teacher:[],students:[]},prof:[{'ID': '2017001', '_id': '2017001', 'name': '柯茂才', 'department': '化学工程学院', 'PassWd': '123456', 'major': '化学工程与工艺', 'role': -1}, {'ID': '2017002', '_id': '2017002', 'name': '庚成礼', 'department': '化学工程学院', 'PassWd': '123456', 'major': '化学工程与工艺', 'role': -1}, {'ID': '2017003', '_id': '2017003', 'name': '刘瑞', 'department': '计算机与通信工程学院', 'PassWd': '123456', 'major': '计算机科学与技术', 'role': -1}, {'ID': '2017004', '_id': '2017004', 'name': '李芳', 'department': '计算机与通信工程学院', 'PassWd': '123456', 'major': '计算机科学与技术', 'role': -1}, {'ID': '2017005', '_id': '2017005', 'name': '石景峰', 'department': '计算机与通信工程学院', 'PassWd': '123456', 'major': '软件工程', 'role': -1}]
      ,departs:[],SHOW_PARENT,
      error:{
        name: '',status:false,
        reason: ['']
      },pic:['https://tva1.sinaimg.cn/large/007S8ZIlly1gfgeikgjduj30vm0u0h3e.jpg','https://tva1.sinaimg.cn/large/007S8ZIlly1gfl1850olzj30qx0lob29.jpg','https://tva1.sinaimg.cn/large/007S8ZIlly1gfl1b7hm9nj31400u0hdt.jpg','https://tva1.sinaimg.cn/large/007S8ZIlly1gfl1bh8gsvj313z0u01f4.jpg','https://tva1.sinaimg.cn/large/007S8ZIlly1gfl1bngln1j31400u0glp.jpg','https://tva1.sinaimg.cn/large/007S8ZIlly1gfl1byicuoj31400u07a0.jpg','https://tva1.sinaimg.cn/large/007S8ZIlly1gfl1cajzhmj30ku0uy75b.jpg'],
      rules: {
        title: [{ required: true, message: '请输入课程名称!' }],
      students: [{ required: true, message: '请选择学生' }]},
      confirmLoading:false, projects: [

        // {
        //     repo_name: "Title",
        //     description: "This is Desc",
        //     creator: "", //目前不需要
        //     owner: "Lihua", id: 1
        // }
      ]
    };
  }, methods: {
    upshow(i){
      if (i==1){
        this.upt='上传学生信息'
        this.upaddr='manage/student/import'
        this.upv=true
      }else {
        this.upt='上传教师信息'
        this.upaddr='manage/prof/import'
        this.upv=true
      }
    },


    gettime:(timeint)=>{
      var time=new Date(Math.floor(timeint*1000))
      var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
      var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
      var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
      var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
      var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
      var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
      return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    details(item) {
      this.$router.push({
        path:'/course/'+item['_id'],

      });
    },newp(){
      this.visible=true
      this.step=1;

    },handleerror(){
      this.error={
        name: '',status: false,
        reason: []
      }
    },
    // eslint-disable-next-line no-unused-vars
    handleOk(e) {
      if (this.step===2){
        this.confirmLoading = true;

        this.$api.post('courses',this.newproj).then((res)=>{
          if (res&&res.data['code']===0){
            this.step=3;
            setTimeout(() => {
              this.visible = false;
              this.confirmLoading = false;
            }, 2000);
          }else {
            this.error={
              name: '创建课程失败',status:true,
              reason: ['后端系统内部错误']
            }
          }
        })
        //TODO:POST /Done

      }else {
        this.step++;
      }

    },filterOption(input, option) {
    console.log(option.componentOptions.children)
      return (

          option.componentOptions.children[0].children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||option.componentOptions.children[1].children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },addteacher(value){
    console.log(value)
      let arr=[] //todo:add myself

      for (let v of value){
        arr.push({ID:v.split(',')[0],name:v.split(',')[1],group:v.split(',')[2]})
      }

      this.newproj.teacher=arr


    },onLoadData(treeNode) {
      return new Promise(resolve => {
        // const { id } = treeNode.dataRef;
        // setTimeout(() => {
        //   this.treeData = this.treeData.concat([
        //     this.genTreeNode(id, false),
        //     this.genTreeNode(id, true),
        //   ]);
        //   resolve();
        // }, 300);
        const { id,value,title } = treeNode.dataRef;
        // console.log(treeNode.dataRef)
        if (value.startsWith('c.')){
          console.log(id,title)
          resolve()
        }else {resolve();}

      });}
    // eslint-disable-next-line no-unused-vars
    ,handleCancel(e) {
      this.$refs.ruleForm.resetFields();
      this.visible = false;

    },checknew(name,owner,sha1){
      this.$api.get('/api/v2/repo/checkout?c='+sha1+'&n='+name+'&g='+owner).then((res)=>{
            if (res&&res.data['success']===true){

              this.$notification.open({
                message: '拉取成功',
                description:
                    '下载即将开始',
                icon: <a-icon type="check-circle" theme="twoTone"/>,
            })



              // window.open(res.data.payload.url) //新标签方式
              var aLink = document.createElement('a');

              aLink.download = name+'-'+owner+'-newest.zip';
              aLink.href = 'http://api.endangeredf1sh.cn:5000'+res.data.payload.url
              aLink.click(); //download属性方式
            }else {
              this.$notification.open({
                message: '拉取失败',
                description:
                    '出现错误',
                icon: <a-icon type="exclamation-circle" theme="twoTone" two-tone-color="#f5222d"/>,
            });
            }
          }

      )

    }
  }

}
</script>

<style>
._2SZKx {
  box-sizing: border-box;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 49px 0 0;
  text-decoration: none;
  background-color: #f5f6fa;
  border: 4px dashed rgba(80, 122, 247, .3);
  border-radius: 5px
}

._2SZKx ._28arU ._2e3af {
  width: 65px;
  height: 65px;
  opacity: .4;
  transition: opacity .3s ease-in-out
}

._2SZKx ._28arU ._2i4Nf {
  margin: 4px 0 0;
  font-size: 26px;
  font-weight: 400;
  color: rgba(80, 122, 247, .3);
  transition: color .3s ease-in-out
}

._2SZKx ._28arU:hover ._2i4Nf {
  color: #507af7
}

._2SZKx ._28arU:hover ._2e3af {
  opacity: 1
}

._2SZKx ._23fWA {
  width: 100%;
  padding: 12px 0;
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  color: rgba(80, 122, 247, .3);
  text-align: center;
  text-decoration: underline;
  letter-spacing: 1.3px;
  cursor: pointer;
  border-top: 4px dashed rgba(80, 122, 247, .3);
  transition: color .3s ease-in-out
}

._2SZKx, ._2SZKx ._28arU {
  display: flex;
  flex-direction: column;
  align-items: center
}
.newp .ant-card-body{
  padding:0px;
}

</style>