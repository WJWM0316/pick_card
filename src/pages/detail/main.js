import Vue from 'vue';
import App from './detail';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '名片详情',
    enablePullDownRefresh: false,
  },
};
