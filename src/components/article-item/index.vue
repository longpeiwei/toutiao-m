<template>
  <van-cell
    ref="article-list"
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId: article.article_id
      }
    }"
  >
    <div slot="title" class="title van-multi-ellipsis--l3">{{ article.title }}</div>
    <div slot="label" class="label_wrap">
      <div class="cover_warp" v-if="article.arr.length == 3 || article.arr.length == 0">
        <div
        v-show="article.arr.length !== 0"
        class="cover_warp_item"
        v-for="(item, index) in article.arr"
        :key="index">
          <van-image
            class="cover_item"
            fit="cover"
            :src="item"
            >
          </van-image>
        </div>
      </div>
      <div class="label_warp">
        <span>{{ article.name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ Number(`${article.pub_date}`) | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.arr.length == 1"
      class="right_cover"
      fit="cover"
      :src="article.arr[0]"
      >
     </van-image>
  </van-cell>
</template>

<script>

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      scrollTop: 0
    }
  },
  methods: {

  },
  created () {

  }
}
</script>

<style lang="less">
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 70px;
    margin-left: 12px;
  }
  .right_cover {
    width: 116px;height: 70px;
  }
  .label_wrap {
    font-size: 12px;
    color: #b4b4b4;
    margin-top: 6px;
  }
  .label_wrap span {
    margin-right: 12px;
  }

  .cover_warp {
    padding-bottom: 12px;
    display: flex;
    .cover_warp_item {
      flex: 1;
      height: 70px;
      // &:not(:last-child) ==  .cover_warp_item:not(:last-child)
      &:not(:last-child) {
        padding-right: 5px;
      }
      .cover_item {
        width: 100%;
        height: 70px;
      }
    }
  }
}
</style>
