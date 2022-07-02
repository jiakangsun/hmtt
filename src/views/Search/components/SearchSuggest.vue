<template>
  <div>
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      icon="search"
      @click="$emit('search',item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 引文这块要渲染的不是普通的字符串 而html片段 所有必须要用v-html
    // v-html是属性绑定 所以不能用过滤器（过滤器不能绑定在属性上，只能用于插值表达式）  所以只能在methods中写
    highlight (str) {
      // 正则的完整写法 new RegExp('里面可以写变量'，'g') 表示全局 等价于 -->  /1/g
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`) // replace替换
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        // async 和 await 必须属于同一个函数
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            console.log(res)
            this.list = res.data.data.options
          } catch (err) {
            console.log(err)
          }
        }, 900)
      },
      immediate: true // 立即侦听  组件在创建的时候就会执行一次
    }
  },
  // 组件被销毁了  要清理掉定时器  避免内存泄漏
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
