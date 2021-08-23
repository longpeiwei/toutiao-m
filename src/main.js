import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './style/index.less'

import Vant from 'vant'

import 'vant/lib/index.css'

// 自动设置 rem 基准值 （html标签字体大小
import 'amfe-flexible'

import 'postcss-pxtorem'

import './utils/day'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
