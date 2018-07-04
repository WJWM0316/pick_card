import Vue from 'vue';
import App from './characters';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '我的人设',
    enablePullDownRefresh: true,
  },
};
