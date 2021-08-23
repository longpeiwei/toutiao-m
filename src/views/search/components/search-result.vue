<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in resultArr"
        :key="index"
        :title="item.suggest"
        :to="{
          name: 'article',
          params: {
            articleId: resultArr[index].id
          }
        }"
      />
    </van-list>
  </div>
</template>

<script>
import { articleResult, newHistory } from '../../../utils/request'

export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      resultArr: []
    }
  },
  watch: {
  },
  created () {
  },
  methods: {
    async onLoad () {
      const { data } = await articleResult(this.searchValue)
      this.resultArr = data.data
      console.log(this.resultArr)
      // this.loading = false
      this.finished = true
      await newHistory({ str: this.searchValue })
      // this.$emit('initHistory')
    }
  }
}
</script>

<style lang="less">
.search-result {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
    }
</style>
