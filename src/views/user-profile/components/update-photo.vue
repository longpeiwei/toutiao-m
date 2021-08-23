<template>
  <div class="update-photo">
    <img :src="image" alt="">
    <van-nav-bar
      class="bottom_bar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    >
    </van-nav-bar>
  </div>
</template>

<script>
// import { photoEdit } from '../../../utils/request'

export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    file: {
      require: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file)
    }
  },
  watch: {
  },
  created () {

  },
  methods: {
    // onGenderChange (_, value) {
    // console.log(picker, value, index)   _占位
    // console.log(value)
    // this.localGender = value
    // },
    async onConfirm () {
      // this.$toast.loading({
      //   message: '保存中',
      //   forbidClick: true
      // })
      const fd = new FormData()
      fd.append('photo', this.file)
      // const data = await photoEdit(fd)
      // console.log('success', data)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.bottom_bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
