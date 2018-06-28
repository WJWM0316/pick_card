import Vue from 'vue';
import App from './privacy';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: 'TodoList',
    enablePullDownRefresh: true,
  },
};
