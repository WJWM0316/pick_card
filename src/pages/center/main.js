import Vue from 'vue';
import App from './center';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '我的名片',
    enablePullDownRefresh: false,
  },
};
