import Vue from 'vue';
import App from './pickProtocol';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '用户服务协议',
    enablePullDownRefresh: false
  },
};
