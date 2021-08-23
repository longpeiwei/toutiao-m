<template>
  <div class="search-history">
      <van-cell
        title="搜索历史"
      >
        <div v-if="isDelete">
          <span>全部删除</span>
          <span class="finish_span" @click="onFinish">完成</span>
        </div>
        <van-icon name="delete" v-else @click="onDelete"></van-icon>
      </van-cell>
      <van-cell
        v-for="(item,index) in historyList"
        :key="index"
        :title="item"
      >
        <van-icon name="close" v-show="isDelete" @click="delClick(item)"/>
      </van-cell>
  </div>
</template>

<script>
import { articleHistory } from '../../../utils/request'

export default {
  components: {},
  name: 'SearchHistory',
  data () {
    return {
      historyList: [],
      isDelete: false
    }
  },
  watch: {
  },
  created () {
    this.initHistory()
  },
  methods: {
    initHistory () {
      articleHistory().then(item => {
        const { data } = item.data
        console.log(data)
        this.historyList = data
      })
    },
    onDelete () {
      this.isDelete = !this.isDelete
    },
    onFinish () {
      this.isDelete = !this.isDelete
    },
    delClick (str) {
      console.log(str)
    }
  }
}
</script>

<style lang="less">
.search-history{
    .finish_span {
        margin-left: 10px;
    }
}
.van-icon-delete{
  font-size: 16px;
}
</style>
