<template>
  <div style="margin-top: 20px">
    <a-row type="flex" justify="center">
      <a-spin v-if="loading"/>
      <a-col :span="16" v-else>
        <a-table :columns="columns" :data-source="data">
          <a slot="name" slot-scope="text,record">
            <a-avatar shape="square" :icon="geti(record.name.split('.').slice(-1)[0])"
                      style="margin-right: 5px"/>
            <b>{{ text }}</b></a>

          <span slot="action" slot-scope="record">

      <span v-if="previewlist.indexOf(record.name.split('.').slice(-1)[0])!=-1"><a
          :href="'https://view.officeapps.live.com/op/view.aspx?src='+record.url" target="_blank">预览</a>
      <a-divider type="vertical"/></span>
      <a :href="record.url" target="_blank">下载</a>
      <a-divider type="vertical"/>

    </span>
          <template slot="title">
            <span style="font-weight: bold">项目附属文档</span>
            <a-button type="primary" style="float:right;" @click="visible=true">
              <a-icon type="file-add"/>
              上传
            </a-button>
          </template>
        </a-table>

      </a-col>
    </a-row>
    <a-modal v-model="visible" title="文件上传" @ok="handleOk">
      <a-upload-dragger
          name="file"
          :file-list="fileList"
          :beforeUpload="uploadfiles"

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
const columns = [
  {
    dataIndex: 'name',
    key: 'name', title: '文件名',
    scopedSlots: {customRender: 'name'},
  },
  {
    title: '大小',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: '上传人',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: '创建日期',
    key: 'createon',
    dataIndex: 'createon',

  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
];
export default {
  name: "files", data() {
    return {
      columns,
      data: [],
      id: '',
      files: [],
      obj: null,
      loading: true,
      visible: false,
      fileList: [],
      previewlist: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']
    }
  }, created() {
    console.log(this.$route.params.id)
    let pid = this.$route.params.id
    let AV = this.$AV
    const query = new AV.Query('files');
    query.equalTo('cid', pid)
    this.id = this.$route.params.id
    query.first().then((wiki) => {

      console.log(wiki)
      this.obj = wiki
      this.data = wiki ? wiki.get('list') : []
      if (!(wiki)) {
        this.obj = new AV.Object('files')
        this.obj.set('list', [])
        this.obj.set('cid', this.id)
        this.obj.save()
      }

      this.loading = false
    })

  }, methods: {
    handleOk() {
      let up = this.fileList[0]
      let file = new this.$AV.File(up.name, up)
      // if(up.name.split(".").slice(-1))
      file.save().then((file) => {
        let url = file.get('url')
        let datas = {
          name: up.name,
          owner: this.$store.state.info.name,
          url: url,
          createon: new Date().toLocaleString(),
          size: up.size
        }
        this.fileList = []
        this.obj.add('list', datas)
        this.obj.save().then((obj) => {
          this.obj = obj
          this.data = obj.get('list')
          this.visible = false

        })

      })

    }, uploadfiles(file) {
      console.log(file)
      this.fileList.push(file)
      return false
    }, geti(name) {
      console.log(name, this.previewlist, this.previewlist.includes(name))
      if (name == 'doc' || name == 'docx') return 'file-word'
      if (name == 'xls' || name == 'xlsx') return 'file-excel'
      if (name == 'ppt' || name == 'pptx') return 'file-ppt'
      return 'file'


    }
  }
}
</script>

<style scoped>

</style>