<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-show="cookie !== '' && cookie !== undefined">
      <van-cell
        class="base-info"
        title="单元格"
        value="内容"
        center
        :border="false"
      >
        <van-image
          slot="icon"
          class="avatar"
          round
          fit="cover"
          :src="info.photo"
        />
        <div slot="title" class="name">{{info.name}}</div>
        <van-button
          size="small"
          round
          class="update-btn"
          to="/user/profile"
        >
        编辑资料
        </van-button>
      </van-cell>
      <van-grid :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-warp">
            <div class="span">{{info.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-warp">
            <div class="span">{{info.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-warp">
            <div class="span">{{info.fan_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-warp">
            <div class="span">{{info.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div class="not-login" v-show="cookie == '' || cookie == undefined">
      <div class="pic-div" @click="doLogin">
        <img class="mobile" src="./phone.png" alt="">
      </div>
      <div class="text" @click="doLogin">登录 / 注册</div>
    </div>

    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item icon="star-o" text="收藏" class="nav-grid-item" />
      <van-grid-item icon="browsing-history-o" text="历史" class="nav-grid-item" />
    </van-grid>
    <van-cell title="URL 跳转" is-link url="/vant/mobile.html" />
    <van-cell title="路由跳转" class="mb-4" is-link to="index" />
    <van-cell v-show="cookie !== '' && cookie !== undefined" class="login-cell" title="退出登录" @click="loginOut" />
  </div>
</template>

<script>
import { getInfo } from '../../utils/request'
import { Dialog } from 'vant'

export default {
  name: 'MyIndex',
  data () {
    return {
      info: {},
      cookie: document.cookie.split('=')[1]
    }
  },
  computed: {
    getCookie: function () {
      return document.cookie.split('=')[1]
    }
  },
  methods: {
    doLogin () {
      this.$router.push('login')
    },
    loginOut () {
      Dialog.confirm({
        title: '确定要退出吗？',
        message: ''
      })
        .then(() => {
        // on confirm
          // this.$router.push('login')
          localStorage.setItem('cookie', '')
          this.$store.commit('getCookie')
          document.cookie = 'mobile' + '=' + '' + '; path=/'
          this.cookie = ''
        })
        .catch(() => {
        // on cancel
          console.log('cancel')
        })
    }
  },
  created () {
    getInfo().then((mydata) => {
      const { data } = mydata
      if (mydata.data.errno === -1) {
        return
      }
      // console.log('mydata', mydata.data.errno)
      // console.log(data.data[0])
      this.$store.commit('getInfo', data.data[0])
      // console.log('created', this.$store.state.myInfo)
      this.info = this.$store.state.myInfo
      // this.$store.commit('getUserId', this.info.id)
      localStorage.setItem('currentUserid', this.info.id)
      // console.log(this.info.photo)
    })
    // console.log('created', this.$store.state.myInfo)
    // this.$store.commit('getInfo')
    // console.log(this.info.photo || '')
  }
}
</script>

<style lang="less">
.my-container {
  .my-info {
    background: url('./bgccc.png') no-repeat;
    background-size: cover;
    .base-info {
      background-color: unset;
      box-sizing: border-box;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        height: 65px;
        width: 65px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 24px;
      }
    }
    .data-info-item {
      height: 65px;
      color: #fff;
      .text-warp{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .span {
          font-size: 18px;
        }
        .text {
          font-size: 13px;
        }
      }

    }
    .van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login {
    height: 180px;
    background: url('bgccc.png') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .pic-div {
      .mobile {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        border: 1px solid #fff;
    }
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
  .nav-grid {
    height: 70px;
    .nav-grid-item {
      height: 70px;
      .van-grid-item__content {
        padding-top: 2px;
        padding-bottom: 0px;
        .van-grid-item__icon {
          font-size: 22px;
        }
        .van-icon-star-o {
          color:#eb5253;
        }
        .van-icon-browsing-history-o {
          color: #ff9d1d;
        }
        .van-grid-item__text {
          font-size: 14px;
          color: #333333;
        }
      }
    }
  }
  .login-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
