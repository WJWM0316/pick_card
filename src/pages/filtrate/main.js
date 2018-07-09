import Vue from 'vue'
import App from './filtrate'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '筛选',
    enablePullDownRefresh: false,
  },
};