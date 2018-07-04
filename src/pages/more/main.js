import Vue from 'vue';
import App from './more';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '更多介绍',
    enablePullDownRefresh: true,
  },
};
