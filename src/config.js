/**
 * 小程序配置的文件
 */

// 测试服接口
var baseHost = 'https://applet-test.card.ziwork.com'

// 正式服接口 -- 当前使用
//var baseHost = 'https://wxapp.card.zike.com'




// 内嵌h5基本路径测试服
var staticHost = 'https://stg.ziwork.com'

// 内嵌h5基本路径生产服
// var staticHost = 'https://light.house.zike.com'

var config = {
  baseHost,
  staticHost
}

module.exports = config
