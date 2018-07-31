import Vue from 'vue';
import App from './brokenNet';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '网络失去连接',
    enablePullDownRefresh: false,
  },
};
