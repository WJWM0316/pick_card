import Vue from 'vue';
import App from './poster';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '保存名片到相册',
    enablePullDownRefresh: false,
  },
};
