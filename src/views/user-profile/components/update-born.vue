<template>
  <div class="update-born">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { infoOnEdit } from '../../../utils/request'
import dayjs from 'dayjs'

export default {
  name: 'UpdateBorn',
  components: {},
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
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
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })

      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      // 提交修改数据
      const { data } = await infoOnEdit({
        aut_id: localStorage.getItem('currentUserid'),
        type_id: 3,
        value: date
      })
      console.log(data)
      this.$toast.success('保存成功')
      // 关闭弹出层
      this.$emit('update-born', date)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">

</style>
