<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button type="info" icon="search" class="search-btn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id"
        ><ArticleList :id="item.id"></ArticleList
      ></van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      :style="{ height: '95%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from './components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    // 三种情况
    // 1. 没有登陆  第一次安装好app 第一次打开的时候 只能去ajax拿数据
    // 2. 没有登陆 但是第二次打开 有可能频道被编辑或删除过 这样的话 本地存储中就有之 从本地存储中拿
    // 3. 已登录  直接从ajax拿
    // 先判断 token 如果有 token 去ajax中拿  然后再判断本地存储中有没有channels数据 如果没有 就从ajax中拿 否则从本地存储中拿
    // 只要本地存储有数据 并且没有登陆 就从本地存储中拿 否者就从Ajax中拿
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      // if 匹配的是未登录并且本地存储中没有频道数据的情况
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},
  // 对频道的数据进行侦听  做数据持久化， 因为侦听的数据是引用类型，所以要深度侦听
  watch: {},
  filters: {},
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/ .van-nav-bar__title {
  // unset  把设置好的属性去掉
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  width: 31px;
  background-color: #3296fa;
}
.menu {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
  // background-color: pink;
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
}
/deep/ .van-tabs__wrap {
  // 因为定位导致脱标  没有宽度  由内容撑开  所以要自己设置宽度
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #333;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
