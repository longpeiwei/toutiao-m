<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="title">我的频道</div>
      <van-button
        class="edit_btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >
        {{ isEdit ? '保存' : '编辑' }}
      </van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
      :icon="(isEdit && index !== 0) ? 'clear' : ''"
      :class="{'grid_item': true, 'active':index === active }"
      v-for="(channel, index) in myChannels"
      :key="index"
      :text="channel.name"
      @click="channelClick(index)" >
      </van-grid-item>
    </van-grid>

    <van-cell center :border="false">
      <div slot="title" class="title">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
      class="grid_item"
      v-for="(channel, index) in recommendChannels"
      :key="index"
      :text="channel.name"
      @click="onAdd(channel)"/>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addChannel, delChannel } from '../../../utils/request'

export default {
  name: 'ChannelEdit',
  components: {
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data
      // console.log(this.allChannels)
    },
    onAdd (channel) {
      // console.log(channel.id)
      addChannel(channel.id)
      this.loadAllChannels()
      this.$emit('update-list')
    },
    channelClick (index) {
      if (this.isEdit) {
        // 删除频道
        this.delChannel(index)
        this.$emit('update-list')
      } else {
        // 切换频道
        this.switchChannel(index)
      }
    },
    delChannel (index) {
      if (index <= this.active) {
        this.$emit('change', this.active - 1)
      }
      delChannel(this.myChannels[index].id)
      this.loadAllChannels()
    },
    switchChannel (index) {
      console.log('switch')
      this.$emit('close', index)
    }
  },
  created () {
    this.loadAllChannels()
    this.isEdit = false
  },
  computed: {
    recommendChannels: function () {
      return this.allChannels.filter(channel => {
        return channel.is_select === 0
      })
    },
    myChannels: function () {
      return this.allChannels.filter(channel => {
        return channel.is_select === 1
      })
    }
  }
}
</script>

<style lang="less">
.channel-edit {
    padding-top: 53px;
    .title {
        font-size: 16px;
    }
    .edit_btn {
        padding: 0 10px;
    }
    .grid_item {
        width: 75px;
        height: 43px;
        .van-grid-item__content {
            background-color: #f4f5f6;
            .van-grid-item__text {
                font-size: 14px;
                color: #222;
                margin-top: 0;
            }
        }
        .van-grid-item__icon {
            position: absolute;
            right: -10px;
            top: -5px;
            font-size: 20px;
            color: #ccc;
        }
    }
    .active {
      .van-grid-item__text {
        color: red !important;
      }
    }
}
</style>
