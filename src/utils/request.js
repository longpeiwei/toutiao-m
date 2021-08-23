import axios from 'axios'

// 登录post
export function apiLogin (data = {}) {
  return axios
    .post('/re/api/blog/login', {
      mobile: data.mobile,
      code: data.code
    })
    // .then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
}

// 获取我的信息数据get
export function getInfo () {
  return axios
    .get('/re/api/blog/info')
}

// 获取首页标签频道get
export function getChannels () {
  return axios
    .get('/re/api/blog/channels')
}

// 获取全部标签频道get
export function getAllChannels () {
  return axios
    .get('/re/api/blog/all_channels')
}

// 将标签添加到我的频道   id：tag的id
export function addChannel (id) {
  return axios
    .post(`/re/api/blog/add_channel?id=${id}`)
}

// 将标签从我的频道移除   id：tag的id
export function delChannel (id) {
  return axios
    .post(`/re/api/blog/del_channel?id=${id}`)
}

// 获取首页文章列表get    id:文章id
export function getArticle (id) {
  return axios
    .get(`/re/api/blog/article?id=${id}`)
}

// 获取文章详情   id:文章id
export function getDetail (id) {
  return axios
    .get(`/re/api/blog/article/detail?id=${id}`)
}

// 获取文章评论  id:文章id
export function getComment (id) {
  return axios
    .get(`/re/api/blog/article/comment?id=${id}`)
}

// 发布文章评论
export function postComment (obj) {
  return axios
    .post('/re/api/blog/comm_post', obj)
}

// 搜索时的联想建议
export function articleSuggest (str) {
  return axios
    .get(`/re/api/blog/suggest?str=${str}`)
}

// 搜索结果
export function articleResult (str) {
  return axios
    .get(`/re/api/blog/result?str=${str}`)
}

// 搜索历史
export function articleHistory () {
  return axios
    .get('/re/api/blog/history')
}

// 更新搜索历史
export function newHistory (obj = {}) {
  return axios
    .post('/re/api/blog/newhis', { str: obj.str })
}

// 搜索历史
export function getInfoWhenEdit (id) {
  return axios
    .get(`/re/api/blog/info_edit?id=${id}`)
}

// 编辑资料修改     type_id ： 1名字 2性别 3生日
export function infoOnEdit (obj = {}) {
  return axios
    .post('/re/api/blog/update_info', {
      aut_id: obj.aut_id,
      type_id: obj.type_id,
      value: obj.value
    })
}

// 编辑photo
export function photoEdit (obj = {}) {
  return axios
    .post('/re/api/blog/update_photo', {
      photo: obj.photo
    })
}

// export function requset ({
//   mobile,
//   code
// }) {
//   axios
//     .post('/res/api/blog/login', {
//       mobile,
//       code
//     })
//     .then(res => {
//       console.log(res)
//     })
// }

// const request = axios.create({
//   baseURL: 'http://localhost:5005'
// })

// export default request
