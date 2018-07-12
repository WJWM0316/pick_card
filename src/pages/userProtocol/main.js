import Vue from 'vue';
import App from './userProtocol';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '用户协议',
    enablePullDownRefresh: false,
  },
};
