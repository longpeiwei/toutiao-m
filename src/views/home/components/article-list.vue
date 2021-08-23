<template>
  <div class="article-list" ref="article-list">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
    <ArticleItem
    v-for="(item, index) in articleList"
    :key="index"
    :article="item"
    />
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
    </van-list>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getArticle } from '../../../utils/request'
import ArticleItem from '../../../components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: false
    },
    'un-channel': {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      articleList: [],
      scrollTop: 0
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  },
  created () {
    if (this.$store.state.cookie !== '') {
      getArticle(this.channel.id).then((res) => {
        const { data } = res
        this.articleList = data.data
        console.log(data.data)
      })
      return true
    }
    const unLoginList = [
      {
        arr: [],
        article_id: 3,
        aut_id: 1,
        aut_name: '小龙',
        collect_count: 0,
        comm_count: 0,
        content: null,
        is_collect: 'false',
        is_top: '0',
        like_count: 0,
        pub_date: '1622704516086',
        status: 2,
        title: '看见你了卡速度发了没视频；竞拍秒杀款那个鲁班呢个',
        type_id: 1
      },
      {
        arr: [],
        article_id: 3,
        aut_id: 1,
        aut_name: '小龙',
        collect_count: 0,
        comm_count: 0,
        content: null,
        is_collect: 'false',
        is_top: '0',
        like_count: 0,
        pub_date: '1628704516086',
        status: 2,
        title: '收到了，跟你说都快放假破我放屁我能破桑拿沙发根据您的理解',
        type_id: 1
      },
      {
        arr: [],
        article_id: 3,
        aut_id: 1,
        aut_name: '小龙',
        collect_count: 0,
        comm_count: 0,
        content: null,
        is_collect: 'false',
        is_top: '0',
        like_count: 0,
        pub_date: '1628704516086',
        status: 2,
        title: '的风格呵呵发方式发生的发生的个风格',
        type_id: 1
      },
      {
        arr: [],
        article_id: 3,
        aut_id: 1,
        aut_name: '小龙',
        collect_count: 0,
        comm_count: 0,
        content: null,
        is_collect: 'false',
        is_top: '0',
        like_count: 0,
        pub_date: '1628704516086',
        status: 2,
        title: '芜湖起飞！',
        type_id: 1
      }
    ]
    this.articleList = unLoginList.filter(item => {
      return item.type_id === Number(this.unChannel.id)
    })
    console.log(this.articleList)
    // this.articleList =
  },
  mounted () {
    const articleList = this.$refs['article-list']
    articleList.onscroll = debounce(() => {
      // console.log(articleList.scrollTop)
      this.scrollTop = articleList.scrollTop
    }, 100)
  },
  activated () {
    this.$refs['article-list'].scrollTop = this.scrollTop
  }
}
</script>

<style lang="less">
.article-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
    }
</style>
