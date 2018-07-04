import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import mptoastRegistry from 'mptoast/registry'
mptoastRegistry(Vue)



Vue.config.productionTip = false
App.mpType = 'app'
// 挂载全局的store
Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main'
    ],
    window: {
      backgroundTextStyle: 'dark',              // 下拉时的背景颜色(只能选dark跟light其中一个)
      navigationBarTitleText: '趣名片',// 顶部栏中间标题
      navigationBarBackgroundColor: '#FF747468',  // 顶部栏背景色
      navigationBarTextStyle:"black"
    }
  }
}