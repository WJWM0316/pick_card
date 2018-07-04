import Vue from 'vue'
import App from './create'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '创建名片',
    enablePullDownRefresh: false,
  },
};