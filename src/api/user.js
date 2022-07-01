import request from '@/utils/request'
// 只有在vue组件中才能用this.$store  在js中没有这个this 所以只能导入
// import store from '@/store'
/**
 * 获取短信验证码
 * @param {number} mobile
 * @returns promise
 */
export const getSmsCode = (mobile) => { // mobile是用户穿过来的
  return request({
    url: `/sms/codes/${mobile}`
  })
}

/**
 *登录
 * @param {mobile,code} param0
 * @return promise
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 获取用户自己信息
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: '/user'
    // 写在请求拦截器中
    // headers: {
    //   // 这里必须加 'Bearer ' 固定前缀
    //   Authorization: 'Bearer ' + store.state.user.token
    // }
  })
}
