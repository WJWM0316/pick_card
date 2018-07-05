import Vue from 'vue'
import App from './swop'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '交换申请',
    enablePullDownRefresh: false,
  },
};