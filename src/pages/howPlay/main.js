import Vue from 'vue';
import App from './howPlay';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '如何玩转趣名片',
    enablePullDownRefresh: false,
  },
};
