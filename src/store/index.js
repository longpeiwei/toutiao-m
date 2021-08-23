import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cookie: localStorage.getItem('cookie') || '',
    myInfo: null,
    userId: 0,
    cachePages: ['LayoutIndex']
  },
  mutations: {
    // changeCookie (state, mobile) {
    //   state.cookie = mobile
    // }
    addCachePage (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    removeCachePage (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    },
    getCookie (state) {
      state.cookie = localStorage.getItem('cookie')
    },
    getInfo (state, info) {
      state.myInfo = info
    },
    getUserId (state, id) {
      state.userId = id
    }
  },
  actions: {
  },
  modules: {
  }
})
