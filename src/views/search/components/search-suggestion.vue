<template>
  <div class="search-suggestion">
      <van-cell
        v-for="(item, index) in suggestions"
        :key="index"
        icon="search"
        @click="$emit('search', item.suggest)"
      >
        <div slot="title" class="list_item" v-html="highlight(item.suggest)"></div>
      </van-cell>
  </div>
</template>

<script>
import { articleSuggest } from '../../../utils/request'
import { debounce } from 'lodash'

// 防抖
// const fn = _.debounce(function () {
//   console.log('ff')
// }, 1000)

// fn()

export default {
  components: {},
  name: 'SearchSuggestion',
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  watch: {
    searchValue: {
      handler: debounce(async function () {
        const { data } = await articleSuggest(this.searchValue)
        console.log(data.data)
        this.suggestions = data.data
      }, 600),
      // async handler () {
      //   const { data } = await articleSuggest(this.searchValue)
      //   console.log(data.data)
      //   this.suggestions = data.data
      // },
      immediate: true
    }
  },
  created () {
  },
  methods: {
    highlight (strings) {
      // return 123
      return strings.replace(
        new RegExp(this.searchValue, 'gi'),
        `<span style="color: red">${this.searchValue}</span>`
      )
    }
  }
}
</script>

<style lang="less">
.list_item {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 80%;
}
</style>
