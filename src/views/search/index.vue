<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="$router.back()"
      @focus="isResultShow = false"
    />
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <SearchResult
      v-if="isResultShow"
      :search-value = searchValue
    />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchValue"
      :search-value = searchValue
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <SearchHistory v-else />
    <!-- /历史记录 -->

  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'

export default {
  components: { SearchSuggestion, SearchHistory, SearchResult },
  name: 'SearchIndex',
  data () {
    return {
      searchValue: '',
      isResultShow: false
    }
  },
  watch: {
  },
  created () {
  },
  methods: {
    onSearch (str) {
      this.searchValue = str
      //   console.log('onSearch')
      this.isResultShow = true
    }
  }
}
</script>

<style lang="less">
</style>
