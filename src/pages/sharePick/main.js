import Vue from 'vue'
import App from './sharePick'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: 'Pick！趣名片',
    enablePullDownRefresh: false,
  },
};