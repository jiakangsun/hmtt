import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  // 指定的存储方式 是本地存储
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setSearchHistoryList (state, payload) { // payload是传过来的str
      let arr = state.searchHistoryList
      arr.unshift(payload) // 搜索历史 每次在前面添加
      arr = [...new Set(arr)] // 数组去重  并解构成集合
      state.searchHistoryList = arr
    },
    // 根据索引删除一个历史记录
    delHistory (state, index) {
      state.searchHistoryList.splice(index, 1)
    },
    // 删除所有历史记录
    delAllHistory (state) {
      state.searchHistoryList = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
