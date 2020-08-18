<template>
<div>
  <a-card style="margin-top: 24px;" :bordered="false">
    <a-list
        size="large"
        rowKey="id"
        itemLayout="vertical"
        :dataSource="datas"
    >
      <a-list-item :key="item._id" slot="renderItem" slot-scope="item">

        <a-list-item-meta>
          <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
          <template slot="description">
              <span>
                <a-tag>Ant Design</a-tag>
                <a-tag>设计语言</a-tag>
                <a-tag>蚂蚁金服</a-tag>
              </span>
          </template>
        </a-list-item-meta>
        <article-list-content :description="item.description" :owner="item.owner" :avatar="item.avatar" :href="item.href" :updateAt="item.updatedAt" />
      </a-list-item>
<!--      <div slot="footer" v-if="datas.length > 0" style="text-align: center; margin-top: 16px;">-->
<!--        <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>-->
<!--      </div>-->
    </a-list>
  </a-card>
</div>
</template>

<script>
export default {
name: "homework",data(){
return{
  datas:{},newwork:{}
  }
  }
}
</script>

<style scoped>

</style>