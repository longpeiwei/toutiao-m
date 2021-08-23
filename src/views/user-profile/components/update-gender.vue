<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { infoOnEdit } from '../../../utils/request'

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value === '男' ? 0 : 1,
      localGender: ''
    }
  },
  watch: {
  },
  created () {

  },
  methods: {
    onGenderChange (_, value) {
      // console.log(picker, value, index)   _占位
      // console.log(value)
      this.localGender = value
    },
    async onConfirm () {
      console.log('onc')
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      // 提交修改数据
      const { data } = await infoOnEdit({
        aut_id: localStorage.getItem('currentUserid'),
        type_id: 2,
        value: this.localGender
      })
      console.log(data)
      this.$toast.success('保存成功')
      // 关闭弹出层
      this.$emit('update-gender', this.localGender)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">

</style>
