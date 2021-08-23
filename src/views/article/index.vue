<template>
  <div class="article-container">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 导航栏end -->

    <div class="article_wrap">
      <h1 class="title_art">{{detailObj.title}}</h1>
        <van-cell center class="user_info">
        <div slot="title" class="name">{{detailObj.name}}</div>
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="detailObj.photo"
        />
        <div slot="label" class="time">{{Number(`${detailObj.pub_date}`) | relativeTime}}</div>
        <van-button
          class="follow_btn"
          type="info"
          icon="plus"
          round
          size="small"
        >关注</van-button>
      </van-cell>
      <div
        class="markdown-body"
        v-html="detailObj.content"
        ref="article-content"
      ></div>
      <div class="end_title">——正文结束——</div>
      <van-cell>全部评论</van-cell>
      <!-- 评论列表 -->
      <CommentList :id="articleId"/>
      <!-- /评论列表 -->
    </div>

    <!-- 底部start -->
    <div class="article_bottom">
      <van-button
        class="comment_btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        color="#777"
        :badge="detailObj.comm_count"
      ></van-icon>
      <van-icon
        name="star-o"
        color="#777"
      ></van-icon>
      <van-icon
        name="good-job-o"
        color="#777"
      ></van-icon>
      <van-icon
        name="share-o"
        color="#777"
      ></van-icon>
    </div>
    <!-- 底部end -->

    <!-- 发布评论 start-->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <PostComment :articleId="sendId" @close="isPostShow = false" />
    </van-popup>
    <!-- 发布评论 end-->
  </div>
</template>

<script>
import './markdown.css'
import { ImagePreview } from 'vant'
import { getDetail } from '../../utils/request'
import CommentList from './components/comment-list.vue'
import PostComment from './components/post-comment.vue'

// ImagePreview([
//   'https://img2.baidu.com/it/u=4100629124,1773611185&fm=26&fmt=auto&gp=0.jpg'
// ])

export default {
  components: { CommentList, PostComment },
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      detailObj: {},
      isPostShow: false,
      sendId: this.articleId
    }
  },
  watch: {
  },
  created () {
    console.log(this.articleId)
    this.loadDetail()
  },
  methods: {
    loadDetail () {
      getDetail(this.articleId).then(detail => {
        const { data } = detail.data
        this.detailObj = data[0]
        console.log(this.detailObj)

        // 数据改变影响视图更新不是立即的
        // 所以如果需要在修改数据之后马上操作被改数据影响的视图的dom
        // 需要把代码放到￥nexttick中
        // 得到所有的img 标签
        this.$nextTick(() => {
          this.handlePreviewImg()
        })

        // 循环img列表，注册点击事件
        // 在事件处理函数中调用 imagepreview（） 预览
      })
    },
    handlePreviewImg () {
      // 获取文章内容的dom容器
      const articleContent = this.$refs['article-content']
      const images = articleContent.querySelectorAll('img')
      console.log(images)
      const imgPath = []
      images.forEach((img, index) => {
        imgPath.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPath,
            startPosition: index
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.article_wrap{
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.title_art {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
}

.user_info {
    .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
    }
    .name {
        font-size: 12px;
        color: #333333;
    }
    .time {
        font-size: 11px;
        color: #b4b4b4;
    }
    .follow_btn {
        width: 85px;
        height: 29px;
    }
}
.article_bottom {
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    border-top: 1px solid #ebedf0;
    .comment_btn {
        width: 160px;
        margin-right: 15px;
    }
    .van-icon {
        margin: 0 10px;
        font-size: 22px;

    }
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
}
.end_title{
  font-size: 15px;
line-height: 20px;
text-align: center;
background-color: #fff;
color: rgba(0, 0, 0, .5);
}
</style>
