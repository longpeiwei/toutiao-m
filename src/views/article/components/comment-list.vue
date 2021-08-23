<template>
  <div class="comment-list">
     <van-list
       v-model="loading"
       :finished="finished"
       finished-text="没有更多了"
       @load="onLoad"
     >
       <CommentItem
         v-for="(item,index) in commList"
         :key="index"
         :comment="item"
       />
       <!-- <van-cell v-for="(item,index) in commList" :key="index" :title="item.content" /> -->
     </van-list>
  </div>
</template>

<script>
import { getComment } from '../../../utils/request'
import CommentItem from './comment-item.vue'

export default {
  name: 'CommentList',
  components: { CommentItem },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      commList: []
    }
  },
  watch: {
  },
  created () {
    this.$bus.$on('update-comment', () => {
      console.log(1)
      this.onGetComm()
    })
  },
  methods: {
    onLoad () {
      this.onGetComm()
    },
    async onGetComm () {
      const comm = await getComment(this.id)
      const { data } = comm.data
      console.log(data)
      this.commList = data
      this.finished = true
    }
  }
}
</script>

<style lang="less">
</style>
