import Vue from 'vue';
import App from './flock';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: 'TodoList',
    enablePullDownRefresh: true,
  },
};
