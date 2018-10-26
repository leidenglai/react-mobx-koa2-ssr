import moment from 'moment'

moment.locale('zh-cn') // 使用中文

// 格式化时间
export function formatDate(date, friendly) {
  date = moment(date)

  if (friendly) {
    return date.fromNow()
  } else {
    return date.format('YYYY-MM-DD HH:mm')
  }
}
