import Vue from 'vue'
import App from './sharePick'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '趣名片PickMe',
    enablePullDownRefresh: false,
  },
};