<template>
  <div>
  <a-card style="margin-top: 24px;text-align: left;margin-left: 24px;margin-right: 24px" :bodyStyle="{paddingBottom:'5px'}" title="签到列表" v-if="!showd">
    <a slot="extra" @click="show=true">新增</a>
    <a-list
        rowKey="id"
        itemLayout="vertical"
        :dataSource="clist"

    >
      <a-list-item :key="item._id" slot="renderItem" slot-scope="item" >
        <div slot="actions" style="display: flex;align-items: center;justify-items:start">
  <span style="display: flex;align-items: center;justify-items:start"><a-avatar
      shape="square"
      size="small"
      :style="{ backgroundColor: color, verticalAlign: 'middle',fontWeight:'bold',marginRight:'6px' }"
  >
    {{ item.owner['name'][0] }}
  </a-avatar ><span style="font-weight: bold;">{{ item.owner['name']}}</span></span>
          <span style="display: flex;align-items: center;justify-items:start;margin-left: 10px"> <a-icon type="clock-circle" style="margin-right: 6px"/> {{new Date(item.datetime*1000).toLocaleString()}}</span>
          <span style="margin-left: 10px;">
                  <a-tag color="orange"  >{{types[item.type-1]}}</a-tag>

              </span>
        </div>
        <a-list-item-meta>
        <a slot="title" @click="detail(item)" style="font-weight: bolder;font-size: 1.2rem;">{{ new Date(item.datetime*1000).toLocaleDateString() }}</a>
<!--        <template slot="description">-->
<!--             -->
<!--        </template>-->

        </a-list-item-meta>
        <a-row type="flex" justify="end">
<!--          <a-col :span="14">-->
<!--            <span style="font-weight: bold;">{{item.content.substring(0,100).replace(/#/g,'').replace(/\s/g,'').replace(/\*/g,'')+'...'}}</span>-->
<!--          </a-col>-->
          <a-col :span="5">
            <a-progress type="circle" :percent="(item['list']?item['list'].length*100:0)/plist.length" style="margin-top: -50px">
              <template #format="">
                已签到:
                <p style="margin-top: 10px">
                  <span style="font-size: 26px;">{{ item['list']?item['list'].length:0 }}</span>
                  <span style="font-size: 16px;">/{{plist.length}} </span></p>
              </template>
            </a-progress>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </a-card>
    <a-card style="margin-top: 24px;text-align: left;margin-left: 24px;margin-right: 24px" :bodyStyle="{paddingBottom:'5px'}" title="签到详情" v-else>
      <a slot="extra" @click="showd=false">返回</a>
      <a-list bordered style="min-width: 400px;margin: 20px" size="small"
              class="demo-loadmore-list"
              item-layout="horizontal"
              :data-source="ncheckedlists" :pagination="{pageSize: 5,}"
      ><div slot="header">
        未签到
      </div>

        <a-list-item slot="renderItem" slot-scope="item" style="align-items: center">
          <a-list-item-meta style="align-items: center">
            <a slot="title" style="line-height: 32px">{{ item.name }}</a>
            <a-avatar
                slot="avatar"

            >{{item.name[0]}}</a-avatar>

          </a-list-item-meta>
          <span>{{item['ID']}}</span>
<!--          <span>{{new Date(item['datetime']).toLocaleTimeString()}}</span>-->
        </a-list-item>
      </a-list>
      <a-list bordered style="min-width: 400px;margin: 20px" size="small"
              class="demo-loadmore-list"
              item-layout="horizontal"
              :data-source="checkedlists" :pagination="{pageSize: 5,}"
      ><div slot="header">
        已签到
      </div>

        <a-list-item slot="renderItem" slot-scope="item" style="align-items: center">
          <a-list-item-meta style="align-items: center">
            <a slot="title" style="line-height: 32px">{{ item.name }}</a>
            <a-avatar
                slot="avatar"

            >{{item.name[0]}}</a-avatar>

          </a-list-item-meta>
          <span>{{item['ID']}}</span>
<!--        <span>{{new Date(item['ckeckin']*1000).toLocaleTimeString()}}</span>-->
        </a-list-item>
      </a-list>

    </a-card>
    <a-modal
        title="新建课程签到"
        :visible="show"
        :confirm-loading="confirmLoading"
        @ok="nexts"
        okText="下一步"
        @cancel="handleCancel"
        :maskClosable="false"
        :width="1200"
    >
      <a-steps :current="step-1">
        <a-step>
          <template slot="title">
            签到类型
          </template>
          <span slot="description">选择签到类型</span>
        </a-step>
        <a-step title="签到"  description="进行签到" />
        <a-step title="完成"  description="签到结束" />
      </a-steps>

      <a-divider></a-divider>
      <div v-if="step===1">
        <a-row type="flex" justify="space-between">
          <a-col :span="7">
            <a-card hoverable title="扫码" style="text-align: center;border-radius: 10px" @click="type=1">
              <div slot="extra" v-if="type==1" >
                <svg t="1597999327656" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3057" width="32" height="32"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#1AAC19" p-id="3058"></path><path d="M809.691429 392.777143L732.16 314.514286 447.634286 599.771429 292.571429 443.977143 214.308571 521.508571l155.794286 155.794286 77.531429 77.531429 362.057143-362.057143z" fill="#FFFFFF" p-id="3059"></path></svg>
              </div>

              <div slot="cover" style="height: 300px;display: flex;justify-content: center;align-items: center">
                <svg t="1597999191117" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2254" width="128" height="128"><path d="M156.444444 327.111111c0 24.177778-18.488889 42.666667-42.666666 42.666667s-42.666667-18.488889-42.666667-42.666667v-85.333333C71.111111 139.377778 153.6 56.888889 256 56.888889h85.333333c24.177778 0 42.666667 18.488889 42.666667 42.666667s-18.488889 42.666667-42.666667 42.666666h-85.333333c-55.466667 0-99.555556 44.088889-99.555556 99.555556v85.333333z m0 369.777778v85.333333c0 55.466667 44.088889 99.555556 99.555556 99.555556h85.333333c24.177778 0 42.666667 18.488889 42.666667 42.666666s-18.488889 42.666667-42.666667 42.666667h-85.333333c-102.4 0-184.888889-82.488889-184.888889-184.888889v-85.333333c0-24.177778 18.488889-42.666667 42.666667-42.666667s42.666667 18.488889 42.666666 42.666667z m711.111112-369.777778v-85.333333c0-55.466667-44.088889-99.555556-99.555556-99.555556h-85.333333c-24.177778 0-42.666667-18.488889-42.666667-42.666666s18.488889-42.666667 42.666667-42.666667h85.333333c102.4 0 184.888889 82.488889 184.888889 184.888889v85.333333c0 24.177778-18.488889 42.666667-42.666667 42.666667s-42.666667-18.488889-42.666666-42.666667z m0 369.777778c0-24.177778 18.488889-42.666667 42.666666-42.666667s42.666667 18.488889 42.666667 42.666667v85.333333c0 102.4-82.488889 184.888889-184.888889 184.888889h-85.333333c-24.177778 0-42.666667-18.488889-42.666667-42.666667s18.488889-42.666667 42.666667-42.666666h85.333333c55.466667 0 99.555556-44.088889 99.555556-99.555556v-85.333333zM0 554.666667v-85.333334h1024v85.333334H0z" fill="#2180E0" p-id="2255"></path></svg>

              </div>
              <a-card-meta title="学生扫码即可完成签到" description="速度快,校验能力差"/>
            </a-card>
          </a-col>
          <a-col :span="7">
            <a-card hoverable title="签到码" style="text-align: center;border-radius: 10px" @click="type=2">
              <div slot="extra" v-if="type==2">
                <svg t="1597999327656" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3057" width="32" height="32"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#1AAC19" p-id="3058"></path><path d="M809.691429 392.777143L732.16 314.514286 447.634286 599.771429 292.571429 443.977143 214.308571 521.508571l155.794286 155.794286 77.531429 77.531429 362.057143-362.057143z" fill="#FFFFFF" p-id="3059"></path></svg>
              </div>

              <div slot="cover" style="height: 300px;display: flex;justify-content: center;align-items: center">
                <svg t="1598000066622" class="icon" viewBox="0 0 1495 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18697" width="128" height="128"><path d="M1495.765794 78.890601H1313.844068V0H1495.765794v78.890601z m-491.961788 0H0V0h1003.804006v78.890601zM1495.765794 1024H491.961787v-78.890601H1495.765794v78.890601z m-1313.844068 0H0v-78.890601h181.921726v78.890601zM243.771957 831.980277V338.914022c-47.334361 45.283205-112.024653 85.201849-194.070878 120.229275v-83.150693c106.817874-49.227735 178.766102-109.815716 215.686903-181.763945h70.843759v637.9094h-92.459784zM582.84376 757.980894h326.607087v70.843759H468.767951v-52.383359c43.074268-80.152851 108.869029-154.152234 197.226502-221.84037 104.766718-73.999384 153.047766-133.482897 144.843143-178.766101-2.051156-69.897072-41.180894-105.713405-117.073651-107.922342-67.845917 0-110.920185 40.076425-129.380586 120.229276L478.077042 360.372265C508.844376 247.400924 585.841602 190.915254 709.226502 190.915254c125.278274 4.102311 192.019723 62.639137 200.382127 175.610478 10.255778 73.999384-40.076425 146.894299-150.996611 218.842527-78.259476 53.487827-136.796302 110.920185-175.768258 172.612635zM986.448074 677.828043l95.457627-21.616025c14.358089 78.101695 58.536826 117.073652 132.53621 117.073652 82.204006-2.051156 124.331587-42.127581 126.382742-120.229276 0-71.948228-50.332203-107.922342-150.99661-107.922342H1131.291217v-73.999383h46.229892c94.51094 0 142.791988-35.974114 144.843144-107.922342-2.051156-65.794761-38.02527-99.559938-107.922342-101.768876-69.897072 0-110.920185 38.02527-123.227119 114.075809L998.755008 353.903236C1025.577812 245.349769 1099.419414 190.915254 1220.753159 190.915254c125.278274 4.102311 192.019723 58.536826 200.382126 163.303544-2.051156 76.050539-44.178737 125.278274-126.382743 147.840986 90.408629 18.460401 138.689676 70.84376 144.843144 157.150077-6.153467 117.073652-81.257319 177.661633-224.995994 181.763945-125.436055 2.208937-201.328814-52.225578-228.151618-163.145763z" p-id="18698" fill="#3480DB"></path></svg>
              </div>
              <a-card-meta title="学生扫码并输入签到码" description="签到码每5分钟刷新,有一定的保密性"/>
            </a-card>
          </a-col> <a-col :span="7">
          <a-card hoverable title="人脸识别" style="text-align: center;border-radius: 10px" @click="type=3">
            <div slot="extra" v-if="type==3">
              <svg t="1597999327656" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3057" width="32" height="32"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#1AAC19" p-id="3058"></path><path d="M809.691429 392.777143L732.16 314.514286 447.634286 599.771429 292.571429 443.977143 214.308571 521.508571l155.794286 155.794286 77.531429 77.531429 362.057143-362.057143z" fill="#FFFFFF" p-id="3059"></path></svg>
            </div>

            <div slot="cover" style="height: 300px;display: flex;justify-content: center;align-items: center">
              <svg t="1598000295120" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24464" width="128" height="128"><path d="M1021.483886 857.088v-114.717257a25.936457 25.936457 0 0 0-51.872915 0v114.717257a113.839543 113.839543 0 0 1-113.722514 113.722514h-114.717257a25.936457 25.936457 0 0 0 0 51.872915h114.717257c91.413943-0.117029 165.4784-74.181486 165.595429-165.595429m-715.234743 139.658971a25.936457 25.936457 0 0 0-25.936457-25.936457H165.595429a113.839543 113.839543 0 0 1-113.722515-113.722514v-114.717257a25.936457 25.936457 0 1 0-51.872914 0v114.717257c0.1024 91.413943 74.181486 165.4784 165.595429 165.595429h114.717257c14.336 0 25.936457-11.629714 25.936457-25.936458M51.858286 281.512229v-114.717258a113.854171 113.854171 0 0 1 113.737143-113.722514h114.717257a25.936457 25.936457 0 1 0 0-51.872914H165.595429C74.166857 1.316571 0.1024 75.395657 0 166.794971v114.717258a25.936457 25.936457 0 1 0 51.872914 0m969.610972 0v-114.717258C1021.366857 75.395657 947.3024 1.316571 855.888457 1.199543h-114.717257a25.936457 25.936457 0 1 0 0 51.872914h114.717257a113.839543 113.839543 0 0 1 113.722514 113.722514v114.717258a25.936457 25.936457 0 0 0 51.872915 0M689.722514 756.194743a26.960457 26.960457 0 0 0-36.542171-39.584914 209.3056 209.3056 0 0 1-142.4384 55.690971 209.334857 209.334857 0 0 1-142.4384-55.690971 26.945829 26.945829 0 0 0-36.5568 39.584914 263.021714 263.021714 0 0 0 178.9952 69.968457 263.036343 263.036343 0 0 0 178.980571-69.968457m-125.1328-178.424686V386.238171a26.960457 26.960457 0 1 0-53.847771 0v191.531886c0 8.265143-6.729143 14.979657-14.9504 14.979657H473.819429a26.975086 26.975086 0 1 0 0 53.8624h21.972114a68.929829 68.929829 0 0 0 68.798171-68.842057m185.578057-116.194743v-76.8a25.439086 25.439086 0 0 0-50.878171 0v76.8a25.439086 25.439086 0 0 0 50.878171 0m-447.414857 25.424457a25.424457 25.424457 0 0 1-25.453714-25.424457v-76.8a25.439086 25.439086 0 0 1 50.878171 0v76.8a25.409829 25.409829 0 0 1-25.424457 25.424457" fill="#3480DB" p-id="24465"></path></svg>
            </div>
            <a-card-meta title="扫码后进行人脸校验" description="保密性较强,但有失败几率"/>
          </a-card>
        </a-col>
        </a-row>
      </div>
      <div v-if="step===2">
        <a-row type="flex" justify="space-between" style="align-items: center">
          <a-col :span="15">
            <div style="display: flex;flex-direction: column;align-items: center">
              <span v-if="type==2" style="font-weight: bolder;font-size:6rem;">{{number}}</span>
              <qrcode-vue :value="qcode" :size="300" level="H"></qrcode-vue>
            </div>
          </a-col>
          <a-col :span="9" style="align-items: center;flex-direction: column;display: flex">
            <a-progress type="circle" :percent="(members.length!=0?members.length*100:0)/plist.length" :width="240">
              <template #format="">

                  <span style="font-size: 3rem;">{{ members.length!=0?members.length:0 }}</span>
                  <span style="font-size: 2rem;">/{{plist.length}} </span>
              </template>
            </a-progress>
            <a-list bordered style="min-width: 400px;margin: 20px" size="small"
                    class="demo-loadmore-list"
                item-layout="horizontal"
                :data-source="members" :pagination="{pageSize: 5,}"
            ><div slot="header">
              最近签到
            </div>

              <a-list-item slot="renderItem" slot-scope="item" style="align-items: center">
                <a-list-item-meta style="align-items: center">
                <a slot="title" style="line-height: 32px">{{ item.name }}</a>
                <a-avatar
                    slot="avatar"

                >{{item.name[0]}}</a-avatar>

                </a-list-item-meta>
              <span>{{item['ID']}}</span> </a-list-item>
            </a-list>          </a-col>
        </a-row>
      </div>
      <div v-if="this.step==3">
        <a-table :columns="columns" :data-source="datas">
          <span slot="action" slot-scope="record">
            <a-button type="primary" @click="checkadd(record)">补签</a-button>
          </span>
        </a-table>
      </div>
    </a-modal>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
name: "checkin",data(){
  return{
    showd:false,show:false,step:1,type:1,confirmLoading:false,rcode:'',qcode:'',number:'',plist:[],members:[],timer:null,datas:[],checkedid:[],clist:[],currentcheck:{},
    types:["扫码验证","签到码","人脸验证"],
    columns:[{
      title: '学号',
      dataIndex: 'ID',
      key: 'ID',
    },{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    },]
  }
  },sockets: {
    connect: function () {
      console.log('socket connected')
      this.$socket.emit("checkin",{"cid":this.$route.params['id']})
    },codechange:function (data){
      console.log(data)
      if(this.step==1){
        this.step=2
      }

        this.number=data['num']
        this.qcode=JSON.stringify({type:this.type,code:data['code']})

    },codeerror:function (){
      this.$message.error('签到错误')
    },number:function (data){
      this.checkedid.push(data['ID'])
      this.members.push(data)
    }
  }

,methods:{handleCancel(){
      clearInterval(this.timer)
      this.type=1
      this.step=1
      this.members=[]
      this.show=false
    },checkadd(add){
  this.$api.post("checkadd",{"code":this.rcode,"uid":add['ID']}).then(res=>{
    if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
      this.checkedid.push(add['ID'])
      this.datas=this.plist.filter(v=>{
        return this.checkedid.includes(v.ID) ===false
      })
    }else {
      this.$message.error('补签失败!');
    }
  })
    },detail(item){
this.showd=true
this.currentcheck=item
    },
  nexts(){
    if (this.step==1){
      this.$api.post("course/"+this.$route.params['id']+"/checkin",{"type":this.type}).then(
          res=>{
            if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
this.rcode=res.data['data']
this.$socket.emit("facecode",{checkid:this.rcode,type:this.type,cid:this.$route.params['id']})
              if (this.timer==null){
                this.timer= setTimeout(()=>{
                  this.$socket.emit("facecode",{checkid:this.rcode,type:this.type,cid:this.$route.params['id']})

                },300000)
              }

            }else {
              this.$message.error('提交失败!');
            }
          }

      )
    }else if (this.step==2){
      clearInterval(this.timer)

      this.step=3
      this.datas=this.plist.filter(v=>{
       return this.checkedid.includes(v.ID) ===false
      })
    }else {
      this.$api.get("course/"+this.$route.params['id']+"/sign").then(res=>{
        if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
          let payl=res.data.data
          this.clist=payl.reverse()

        }else {
          this.$message.error('签到列表获取失败!');
        }

      })
      this.handleCancel()
    }

  }
  },computed:{
  checkedlists(){
    return this.plist.filter(v=>{
      return this.currentcheck.list.includes(v['ID'])
    })
  },ncheckedlists(){
      return this.plist.filter(v=>{
        return !this.currentcheck.list.includes(v['ID'])
      })
    },
  },mounted() {
    this.$socket.emit("checkin",{"cid":this.$route.params['id']})
    this.$api.get("course/"+this.$route.params['id']+"/plist").then(res=>{
      if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
        let payl=res.data.data
        this.plist=payl

      }else {
        this.$message.error('课堂成员获取失败!');
      }
    })
    this.$api.get("course/"+this.$route.params['id']+"/sign").then(res=>{
      if (res&&(res.response==undefined||res.response.status===200)&&res.data['code']==0){
        let payl=res.data.data
        this.clist=payl.reverse()

      }else {
        this.$message.error('签到列表获取失败!');
      }

    })

  },
  components: {
    QrcodeVue,
  }
}
</script>

<style scoped>

</style>