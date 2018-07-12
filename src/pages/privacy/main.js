import Vue from 'vue';
import App from './privacy';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '隐私',
    enablePullDownRefresh: false,
  },
};
