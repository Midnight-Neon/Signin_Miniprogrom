<template>
<div>
  <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="通知列表">

    <div slot="extra">
      <a-radio-group v-model="status">
        <a-radio-button value="all">全部</a-radio-button>
        <a-radio-button value="processing">进行中</a-radio-button>
        <a-radio-button value="waiting">等待中</a-radio-button>
      </a-radio-group>
      <a-input-search style="margin-left: 16px; width: 272px;" />
    </div>

    <div class="operate">
      <a-button type="dashed" style="width: 100%" icon="plus" @click="add">添加</a-button>
    </div>

    <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
      <a-list-item :key="index" v-for="(item, index) in data.notifications">
        <a-list-item-meta :description="item.description">
<!--          <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>-->
          <a slot="title">{{ item.title }}</a>
        </a-list-item-meta>
        <div slot="actions">
          <a @click="edit(item)">编辑</a>
        </div>
        <div slot="actions">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item><a>编辑</a></a-menu-item>
              <a-menu-item><a>删除</a></a-menu-item>
            </a-menu>
            <a>更多<a-icon type="down"/></a>
          </a-dropdown>
        </div>
        <div class="list-content">
          <div class="list-content-item">
            <span>发布者</span>
            <p>{{ item.owner }}</p>
          </div>
          <div class="list-content-item">
            <span>发布时间</span>
            <p>{{ item.startAt }}</p>
          </div>
          <div class="list-content-item">
            <a-progress :percent="item.readnum/data." :status="" style="width: 180px" />
          </div>
        </div>
      </a-list-item>
    </a-list>
  </a-card>
</div>
</template>

<script>
export default {
name: "homework"
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