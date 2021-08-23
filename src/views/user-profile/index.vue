<template>
  <div class="user-profile">
    <!-- 导航栏start -->
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input
      type="file"
      hidden
      accept="image/*"
      ref="file"
      @change="onFileChange"
    >
    <!-- 导航栏end -->
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image
        width="30"
        height="30"
        round
        fit="cover"
        :src="currentInfo.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="currentInfo.name"
      @click="isEditNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="currentInfo.gender"
      @click="isEditGenderShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="currentInfo.born"
      @click="isEditBornShow = true"
    ></van-cell>

    <!-- 修改昵称 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateName
        v-if="isEditNameShow"
        @close="isEditNameShow = false"
        :name="currentInfo.name"
        @update-name="currentInfo.name = $event"
      />
    </van-popup>

    <!-- 修改性别 -->
    <van-popup
      v-model="isEditGenderShow"
      position="bottom"
    >
      <UpdateGender
        v-if="isEditGenderShow"
        @close="isEditGenderShow = false"
        v-model="currentInfo.gender"
        @update-gender="currentInfo.gender = $event"
      />
    </van-popup>

    <!-- 修改生日 -->
    <van-popup
      v-model="isEditBornShow"
      position="bottom"
    >
      <UpdateBorn
        v-if="isEditBornShow"
        @close="isEditBornShow = false"
        v-model="currentInfo.born"
        @update-born="currentInfo.born = $event"
      />
    </van-popup>

    <!-- 修改头像 -->
    <van-popup
      v-if="isEditPhotoShow"
      v-model="isEditPhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <UpdatePhoto
        :file="previewImage"
        @close="isEditPhotoShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getInfoWhenEdit } from '../../utils/request'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBorn from './components/update-born.vue'
import UpdatePhoto from './components/update-photo.vue'

export default {
  name: 'UserProfileIndex',
  components: { UpdateName, UpdateGender, UpdateBorn, UpdatePhoto },
  props: {
    // articleId: {
    //   type: [String, Number],
    //   require: true
    // }
  },
  data () {
    return {
      currentInfo: {},
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBornShow: false,
      isEditPhotoShow: false,
      previewImage: null // 预览图片
    }
  },
  watch: {
  },
  created () {
    this.infoWhenEdit()
  },
  methods: {
    async infoWhenEdit () {
      const { data } = await getInfoWhenEdit(localStorage.getItem('currentUserid'))
      console.log(data)
      this.currentInfo = data.data[0]
    },
    onFileChange () {
      // 展示弹出层
      this.isEditPhotoShow = true
      // 在弹出层里面预览图片
      // const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      const file = this.$refs.file.files[0]
      // console.log(file)
      this.previewImage = file

      // 为了解决相同文件不触发 change 事
      // 件，所以这里手动清空 file 的 value
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.van-popup {
  background-color: #f5f7f9;
}
</style>
