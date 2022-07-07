<template>
  <van-field
    v-model="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    class="add-field"
    ref="field"
  >
    <template #extra>
      <van-button
        @click="onClick"
        :disabled="message.length === 0"
        type="default"
        class="btn"
        >发布</van-button
      >
    </template>
  </van-field>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    // 如果是文章评论就不用传 对评论进行评论就要传 所以这里可以不写required: true
    art_id: {
      type: [String, Number]
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          // 因为不是必须传的 所以如果是对文章评论这个就为空
          art_id: this.art_id
        })
        console.log('addComment', res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  // dom准备好  就可以找到textarea
  mounted () {
    // 组件最终会变成dom解构。$el就可以获取这个组件的跟标签
    this.$refs.field.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.add-field {
  align-items: center;
}
.btn {
  border: none;
}
</style>
