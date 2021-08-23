<template>
  <van-cell class="comment-item">
    <van-image
      class="avatar"
      slot="icon"
      fit="cover"
      round
      :src="comment.photo"
    />
    <div slot="title">
      <div class="title_wrap">
        <div class="name">{{comment.name}}</div>
        <div class="like_wrap">
          <van-icon name="good-job-o" class="like_icon"></van-icon>
          <span class="like_count">{{comment.like_count}}</span>
        </div>
      </div>
      <div class="content">{{comment.content}}</div>
      <div class="date_wrap">
        <span class="pubdate">{{Number(`${comment.pubdate}`) | datetime('MM-DD HH:mm')}}</span>
        <van-button
          class="reply_btn"
          round
          size="mini"
        >{{comment.reply_count}} 回复</van-button>
      </div>
    </div>

  </van-cell>
</template>

<script>

export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  watch: {
  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="less">
.comment-item {
  .avatar {
    height: 36px;
    width: 36px;
    margin-right: 13px;
  }
  .name {
    font-size: 14px;
    color: #406599;
  }
  .content {
    font-size: 15px;
    color: #222222;
  }
  .pubdate {
    font-size: 12px;
    margin-right: 8px;
  }
  .title_wrap {
    display: flex;
    justify-content: space-between;
  }
  .date_wrap {
    display: flex;
  }
  .like_wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
