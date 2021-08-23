<template>
  <div class="home-container">
      <!-- 导航栏 -->
      <van-nav-bar class="app-nav-bar">
        <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type=info
        round
        to="/search"
        >搜索</van-button>
      </van-nav-bar>
      <!-- /导航栏 -->

      <!-- 标签频道列表 -->
      <!-- 标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面的内容 -->
      <van-tabs class="channel-tabs" v-model="active" >
        <van-tab
        class="tab-item"
        :title="item.name"
        v-for="item in channelsList"
        :key="item.id"
        >
        <article-list :channel="item" v-if="$store.state.cookie !== ''"/>
        <article-list :un-channel="item" v-else />
        </van-tab>

        <!-- 占位div -->
        <div slot="nav-right" class="place_holder"></div>

        <div slot="nav-right">
          <van-icon
          name="wap-nav"
          @click="onShowEdit"
          class="wap-nav-warp"></van-icon>
        </div>
      </van-tabs>
       <!-- /标签频道列表 -->

       <van-popup
       v-model="isChannelEidtShow"
       position="bottom"
       close-icon-position="top-left"
       closeable
       get-container="body"
       style="height: 100%"
       >
       <ChannelEdit
       :active="active"
       :user-channels="channelsList"
       @update-list="updateList"
       @close="tabActive"
       @change="active = $event"
       ref="edit"
       />
       </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { getChannels } from '../../utils/request'

export default {
  components: { ArticleList, ChannelEdit },
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channelsList: [],
      isChannelEidtShow: false
    }
  },
  // watch: {
  //   isChannelEidtShow: {
  //     handler () {
  //       console.log(this.$refs.edit)
  //       if (this.$refs.edit.isEdit || this.$refs.edit.isEdit === undefined) {
  //         this.$refs.edit.isEdit = false
  //       }
  //     }
  //   }
  // },
  created () {
    if (this.$store.state.cookie === '') {
      this.channelsList = [
        { id: 1, name: '推荐' },
        { id: 2, name: '前端' },
        { id: 3, name: '后端' },
        { id: 4, name: 'html' },
        { id: 5, name: '数据结构' },
        { id: 6, name: '算法' }
      ]
      return
    }
    // 获取频道标签
    getChannels().then((channelsData) => {
      const { data } = channelsData
      // console.log(data.data)
      this.channelsList = data.data
    })
  },
  methods: {
    updateList () {
      getChannels().then((channelsData) => {
        const { data } = channelsData
        // console.log(data.data)
        this.channelsList = data.data
      })
    },
    tabActive (index) {
      this.isChannelEidtShow = false
      this.active = index
    },
    onShowEdit () {
      if (this.$store.state.cookie === '') {
        this.$toast('请登录')
        return
      }
      this.isChannelEidtShow = true
    }
  }
}
</script>

<style lang="less">
.home-container{
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .channel-tabs {
    .van-tab {
      // border-right: 1px solid #f2f2f2;
      border-bottom: 1px solid #f2f2f2;
      padding: 0 12px;
      // display: unset;
    }
    .van-tabs__nav--complete {
      padding-left: 0px;
      padding-right: 0px;
    }
    .van-tabs__line {
      width: 15px;
      height: 3px;
      background: #3296fa;
      bottom: 20px;
    }
  }
  .place_holder {
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-warp {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: .9;
    border-bottom: 1px solid #f2f2f2;
    .van-icon {
      font-size: 16px !important;
    }
    .van-icon-wap-nav::before {
      font-size: 22px;
    }
  }
}

</style>
