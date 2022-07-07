<template>
  <van-loading v-if="isLoading" size=".53333rem" />
  <van-icon
    v-else
    color="#777"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onClick"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      // 加载显示
      this.isLoading = true
      // 可以直接用$route.params 获取
      const target = this.$route.params.article_id
      // 如果is_collected值为true 说明是已收藏
      if (this.is_collected) {
        // 取消收藏
        try {
          await delCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      } else {
        // 添加收藏
        try {
          await addCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      }
      // 加载隐藏
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
