import Vue from 'vue';
import App from './edit';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '基本资料',
    enablePullDownRefresh: true,
  },
};
