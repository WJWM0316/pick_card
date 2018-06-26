import wepy from 'wepy'
import moment from 'moment'
moment.locale('zh-cn')

export default class countdownMixin extends wepy.mixin {
  data = {}

  methods = {}

  /**
   * 获取倒计时对象
   * 先调用函数获取一个
   * @param {Number} endTimestamp 时间戳(精确到毫秒)
   * @param {Function} callback 回调
   */
  getCountdown () {
    let t = null

    // 停止倒计时
    const stop = (t) => {
      if (t) {
        clearInterval(t)
      }
    }

    // 启动倒计时
    const start = (endTimestamp, callback) => {
      callback = callback && typeof callback === 'function' ? callback : function (timestamp) {}
      stop(t) // 先停止存在的倒计时
      const now = new Date().getTime()
      const timestamp = endTimestamp - now >= 0 ? endTimestamp - now : 0
      callback(timestamp)
      if (timestamp > 0) {
        t = setInterval(() => {
          const cNow = new Date().getTime()
          const cTimestamp = endTimestamp - cNow >= 0 ? endTimestamp - cNow : 0
          callback(cTimestamp)
          if (cTimestamp <= 0) {
            stop(t)
          }
        }, 1000)
      }

      return t
    }

    return {
      start,
      stop
    }
  }

  /**
   * 时间段过滤器
   * @param {*} timestamp
   */
  durationFilter (timestamp) {
    const duration = moment.duration(timestamp)
    const days = duration.days()
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = duration.seconds()
    const asDays = Math.floor(duration.asDays())
    const asHours = Math.floor(duration.asHours())
    const asMinutes = Math.floor(duration.asMinutes())
    const format = (val, length = 2) => {
      var prefix = new Array(length + 1).join(0)
      return (prefix + val).substr(val.toString().length)
    }

    let result = 'D天 hh:mm:ss'
    let option = {
      'D+': asDays,
      'h+': hours,
      'm+': minutes,
      's+': seconds
    }

    for (let key of Object.keys(option)) {
      const value = option[key]
      if (new RegExp('(' + key + ')').test(result)) {
        result = result.replace(RegExp.$1, RegExp.$1.length === 1 ? value : format(value, RegExp.$1.length))
      }
    }

    return result
  }

  /**
   * 格式化时间
   * @param {*} date
   * @param {*} format
   */
  format (date, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(date).format(format)
  }
}
