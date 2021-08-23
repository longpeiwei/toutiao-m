<template>
  <div id="app">
    <!-- 路由的出口 -->
    <keep-alive :include="$store.state.cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
</style>
