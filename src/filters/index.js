// dayjs 文档  （国际化  ）
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 默认配置成中文
dayjs.extend(relativeTime)

export const dateformat = (time) => {
  return dayjs(time).fromNow()
}
