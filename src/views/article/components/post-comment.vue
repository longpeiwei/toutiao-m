<template>
  <div class="post-comment">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="45"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button size="mini" class="btn_post" @click="postComm">发布</van-button>
  </div>
</template>

<script>
import { postComment } from '../../../utils/request'

export default {
  name: 'PostComment',
  components: {},
  props: {
    articleId: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  watch: {
  },
  created () {
    // console.log(this.$store.state.userId)
  },
  methods: {
    postComm () {
      // console.log(localStorage.getItem('currentUserid'))
      // console.log('articleId', this.articleId)
      if (this.message !== '') {
        postComment(
          {
            author_id: localStorage.getItem('currentUserid'),
            article_id: this.articleId,
            content: this.message
          }
        ).then(data => {
          console.log(data)
          this.$bus.$emit('update-comment')
          this.$emit('close')
        })
      }
    }
  }
}
</script>

<style lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding-right: 12px;
  .btn_post{
    width: 50px;
  }
}
</style>
