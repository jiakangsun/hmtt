<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log(res)
        // 数据全部加载完了
        if (res.data.data.results.length === 0) {
          this.finished = true // 没有更多了
          return
        }
        // this.list = res.data.data.results
        // 新旧数据合并，保留原有的数据 在后面添加  而不是新数据覆盖旧数据
        this.list.push(...res.data.data.results)
        this.loading = false
        // this.refreshing = false // onRefresh里面
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.page++ // 每次到底部页数加一
      this.getSearchResult() // 获取下一页的数据
    },
    onRefresh () {
      this.list = []
      this.page = 1
      this.getSearchResult()
      this.refreshing = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang='less'>
// 子容器高度比父容器高的时候  就会有滚动条
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
