<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="(item, index) in commentList" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | dateformat
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell> -->
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show',$event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentList } from '@/api/comment'
export default {
  props: {
    type: {
      type: String,
      required: true,
      // props 自定义校验函数
      validator (value) {
        // return ['a', 'c'].indexOf(value) !== -1
        return ['a', 'c'].includes(value) // 数据只能是a或者c才验证通过
      }
    },
    source: {
      type: [Number, String],
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        type: this.type,
        source: this.source,
        limit: 5,
        offset: null
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        console.log('getCommentList', res)
        // 数据全部加载完毕 将finished设 设置成true （没有更多了）
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        // 将评论总数量 传给父组件
        this.$emit('set-count', res.data.data.total_count)
        // this.commentList = res.data.data.results
        this.commentList.push(...res.data.data.results) // 保留原有数据 添加新数据
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false // 当前页 数据获取完毕  就把loading转圈效果关闭
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getCommentList() // 滚动到底部后  获取下一页数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
