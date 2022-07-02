import request from '@/utils/request'
/**
 *搜索联想列表
 * @param {搜索关键字} q
 * @returns
 */
export const getSuggestList = (q) => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}

/**
 *
 * @param page 当前是第几页 per_page 每页数量 q搜索关键字
 * @returns
 */
// { page = 1, per_page, q } 解构赋值
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: {
      page,
      per_page,
      q
    }
  })
}
