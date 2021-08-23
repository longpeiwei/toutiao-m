<template>
  <div class="update-name">
    <!-- 导航栏start -->
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- 导航栏end -->

    <div class="name-field-wrap">
      <van-field
        v-model="editName"
        rows="2"
        autosize
        type="textarea"
        maxlength="8"
        show-word-limit
    />
    </div>
  </div>
</template>

<script>
import { infoOnEdit } from '../../../utils/request'

export default {
  name: 'UpdateName',
  components: {},
  props: {
    name: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      message: '',
      editName: this.name
    }
  },
  watch: {
  },
  created () {

  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      // 提交修改数据
      const { data } = await infoOnEdit({
        aut_id: localStorage.getItem('currentUserid'),
        type_id: 1,
        value: this.editName
      })
      console.log(data)
      this.$toast.success('保存成功')
      // 关闭弹出层
      this.$emit('update-name', this.editName)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.name-field-wrap {
  padding: 10px;
}
</style>
