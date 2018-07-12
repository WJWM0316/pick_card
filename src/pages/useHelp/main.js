import Vue from 'vue';
import App from './useHelp';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '使用帮助',
    enablePullDownRefresh: false,
  },
};
