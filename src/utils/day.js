import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'

// 配置使用处理相对时间
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})

Vue.filter('datetime', (value, format = 'YY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
// 当前日期格式化
// console.log(dayjs().format('YYYY-MM-DD'))

// console.log(dayjs('2021-05-20 12:12:23').from(dayjs()))
