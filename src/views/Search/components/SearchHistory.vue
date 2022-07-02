<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDelete">
        <span @click="$store.commit('delAllHistory')" >全部删除</span>&nbsp;
        <span @click="isDelete = false">完成</span>
      </template>
      <van-icon @click="isDelete = true" v-else name="delete" />
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistoryList"
      :key="index"
      :title="item"
      @click="$emit('search',item)"
    >
      <van-icon @click.stop="$store.commit('delHistory')" v-if="isDelete" name="close" />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isDelete: false
    }
  },
  computed: {
    ...mapState(['searchHistoryList'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
