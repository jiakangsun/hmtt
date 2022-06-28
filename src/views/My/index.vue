<template>
  <div>
    <!-- 登录后 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            round
            :src="userInfo.photo"
          />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{userInfo.art_count}}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{userInfo.follow_count}}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{userInfo.fans_count}}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{userInfo.like_count}}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 未登录 -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>

    <van-grid :column-num="2">
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-button
      class="logout-btn"
      type="default"
      block
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
// vuex辅助函数
import { mapState } from 'vuex'
export default {
  name: 'My',
  async created () {
    // 页面一打开就得有数据 所以在这发送ajax请求  并且判断是否登录 登录就发  未登录就不发
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        // 原型对象上可以直接用this.$dialog.confirm  (dialog.confirm)vant弹出框上的功能
        await this.$dialog.confirm({ message: '确定退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  opacity: 0.8;
  background: rgba(50, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    font-weight: normal;
    color: #ffffff;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 37px;
    padding: 0 33px 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      width: 116px;
      height: 33px;
      line-height: 32px;
      text-align: center;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: normal;
      color: #666666;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        font-weight: normal;
        color: #ffffff;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #ffffff;
        font-weight: 400;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
// .toutiao-shoucang {
//   color: #eb5253;
// }
// .toutiao-lishi {
//   color: #ff9d1d;
// }
/deep/ .van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin: 9px 0;
}
.logout-btn {
  color: #d86262;
}
</style>
