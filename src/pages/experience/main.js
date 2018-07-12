import Vue from 'vue';
import App from './experience';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '编辑经历',
    enablePullDownRefresh: false,
  },
};
