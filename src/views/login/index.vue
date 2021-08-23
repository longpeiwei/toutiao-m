<template>
  <div class="login-container">
    <van-nav-bar
    class="app-nav-bar"
    title="登录"
    left-arrow
    @click-left="$router.back()" />

    <!-- 登录表单 -->
    <van-form
    :show-error="false"
    :show-error-message="false"
    validate-first
    @submit="loginReq"
    @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        left-icon="user-circle-o"
        placeholder="请输入账号"
        :rules="formrules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="eye-o"
        placeholder="请输入密码"
        :rules="formrules.code"
      >
      </van-field>
      <div class="login-btn-warp">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import { apiLogin } from '../../utils/request'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formrules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|9|8|7]\d{9}$/, message: '手机号格式错误..' }
        ],
        code: [
          { required: true, message: '请输入密码' },
          { pattern: /^\d/, message: '密码格式错误..' }
        ]
      }
    }
  },
  methods: {
    onFailed (error) {
      console.log('验证失败', error)
      if (error.errors[0]) {
        Toast(error.errors[0].message)
      }
    },
    loginReq () {
      if (this.user.mobile !== '' | this.user.code !== '') {
        Toast.loading({
          message: 'loading...',
          forbidClick: true,
          duration: 1000
        })
        apiLogin(
          this.user
          // mobile: this.user.mobile,
          // code: this.user.code
        ).then(res => {
          console.log('res', res.data.errno)
          if (res.data.errno === 0) {
            // console.log(document.cookie.split('=')[1])
            const mobileCookie = document.cookie.split('=')[1]
            localStorage.setItem('cookie', mobileCookie)
            this.$store.commit('getCookie')
            // this.$store.commit('changeCookie', mobileCookie)
            // console.log(this.$store.state.cookie)
            Toast.success('登陆成功！')
            this.$store.commit('removeCachePage', 'LayoutIndex')
            this.$router.back()
            // Toast.fail('登陆失败...')
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
.login-container {
  .login-btn-warp {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
